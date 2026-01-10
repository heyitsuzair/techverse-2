import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * GET /api/stalls
 * Get nearby stalls based on location
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));
    const radius = parseFloat(searchParams.get("radius") || "10"); // Default 10km
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "Valid latitude and longitude are required" },
        { status: 400 }
      );
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: "Invalid coordinates" },
        { status: 400 }
      );
    }

    // Build where clause
    const where = {
      isActive: true,
    };

    // Calculate bounding box for rough filtering
    // 1 degree latitude ≈ 111km
    // 1 degree longitude ≈ 111km * cos(latitude)
    const latDelta = radius / 111;
    const lngDelta = radius / (111 * Math.cos((lat * Math.PI) / 180));

    where.locationLat = {
      gte: lat - latDelta,
      lte: lat + latDelta,
    };

    where.locationLng = {
      gte: lng - lngDelta,
      lte: lng + lngDelta,
    };

    // Get stalls within bounding box
    const [stallsInBox, totalCount] = await Promise.all([
      prisma.stall.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.stall.count({ where }),
    ]);

    // Calculate exact distances using Haversine formula
    const stallsWithDistance = stallsInBox
      .map((stall) => {
        const distance = calculateDistance(
          lat,
          lng,
          stall.locationLat,
          stall.locationLng
        );

        return {
          ...stall,
          distance: Math.round(distance * 10) / 10, // Round to 1 decimal
        };
      })
      .filter((stall) => stall.distance <= radius) // Filter by exact radius
      .sort((a, b) => a.distance - b.distance); // Sort by distance

    // Apply pagination
    const paginatedStalls = stallsWithDistance.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      stalls: paginatedStalls,
      pagination: {
        page,
        limit,
        total: stallsWithDistance.length,
        totalPages: Math.ceil(stallsWithDistance.length / limit),
      },
      searchParams: {
        lat,
        lng,
        radius,
      },
    });
  } catch (error) {
    console.error("Error fetching stalls:", error);
    return NextResponse.json(
      { error: "Failed to fetch stalls" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stalls
 * Create a new exchange stall
 */
export async function POST(request) {
  try {
    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return NextResponse.json({ error: tokenError }, { status: 401 });
    }

    // Verify token and get user
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      name,
      description,
      address,
      locationLat,
      locationLng,
      contactName,
      contactPhone,
      contactEmail,
      operatingHours,
      photos,
    } = body;

    // Validation
    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { error: "Stall name must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!address || address.trim().length < 5) {
      return NextResponse.json(
        { error: "Address must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (
      typeof locationLat !== "number" ||
      typeof locationLng !== "number" ||
      locationLat < -90 ||
      locationLat > 90 ||
      locationLng < -180 ||
      locationLng > 180
    ) {
      return NextResponse.json(
        { error: "Valid coordinates are required" },
        { status: 400 }
      );
    }

    if (!contactName || contactName.trim().length < 2) {
      return NextResponse.json(
        { error: "Contact name is required" },
        { status: 400 }
      );
    }

    if (!contactPhone || contactPhone.trim().length < 10) {
      return NextResponse.json(
        { error: "Valid contact phone is required" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate operating hours if provided
    if (operatingHours) {
      try {
        const parsed = JSON.parse(operatingHours);
        if (typeof parsed !== "object") {
          throw new Error("Invalid format");
        }
      } catch (error) {
        return NextResponse.json(
          { error: "Operating hours must be valid JSON" },
          { status: 400 }
        );
      }
    }

    // Create stall
    const stall = await prisma.stall.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        address: address.trim(),
        locationLat,
        locationLng,
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail?.trim() || null,
        operatingHours: operatingHours || null,
        photos: photos || [],
        ownerId: decoded.userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Stall created successfully",
        stall,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating stall:", error);
    return NextResponse.json(
      { error: "Failed to create stall" },
      { status: 500 }
    );
  }
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
