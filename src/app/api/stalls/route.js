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
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      name,
      description,
      address,
      locationAddress,
      locationLat,
      locationLng,
      contactName,
      contactPhone,
      contactEmail,
      operatingHours,
      photos,
    } = body;

    // Use locationAddress if provided, otherwise fall back to address
    const finalAddress = locationAddress || address;

    // Validation
    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { error: "Stall name must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!finalAddress || !finalAddress.trim()) {
      return NextResponse.json(
        { error: "Address is required" },
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

    // Use decoded.name as fallback for contactName if not provided
    const finalContactName = contactName || decoded.name || "Stall Owner";
    if (!finalContactName || finalContactName.trim().length < 2) {
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

    // Validate operating hours if provided (accept string or JSON)
    let finalOperatingHours = operatingHours;
    if (operatingHours) {
      // If it's already a string, try to parse it as JSON
      if (typeof operatingHours === "string") {
        try {
          const parsed = JSON.parse(operatingHours);
          if (typeof parsed === "object") {
            finalOperatingHours = JSON.stringify(parsed);
          } else {
            // If it's not valid JSON, store as-is (plain string)
            finalOperatingHours = operatingHours;
          }
        } catch (error) {
          // If parsing fails, store as plain string
          finalOperatingHours = operatingHours;
        }
      } else if (typeof operatingHours === "object") {
        // If it's already an object, stringify it
        finalOperatingHours = JSON.stringify(operatingHours);
      }
    }

    // Create stall
    const stall = await prisma.stall.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        address: finalAddress.trim(),
        locationLat,
        locationLng,
        contactName: finalContactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail?.trim() || null,
        operatingHours: finalOperatingHours || null,
        photos: photos || [],
        ownerId: decoded.id,
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
        stall: {
          ...stall,
          locationAddress: stall.address, // Map address to locationAddress for frontend
        },
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
