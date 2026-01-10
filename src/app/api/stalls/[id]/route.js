import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * GET /api/stalls/:id
 * Get stall details by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Stall ID is required" },
        { status: 400 }
      );
    }

    const stall = await prisma.stall.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            email: true,
            phone: true,
            locationAddress: true,
          },
        },
      },
    });

    if (!stall) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    // Increment view count
    await prisma.stall.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    // Parse operating hours if it's a JSON string
    let operatingHours = null;
    if (stall.operatingHours) {
      try {
        operatingHours =
          typeof stall.operatingHours === "string"
            ? JSON.parse(stall.operatingHours)
            : stall.operatingHours;
      } catch (error) {
        console.error("Error parsing operating hours:", error);
        operatingHours = stall.operatingHours;
      }
    }

    return NextResponse.json({
      success: true,
      stall: {
        ...stall,
        operatingHours,
        viewCount: stall.viewCount + 1, // Return updated count
      },
    });
  } catch (error) {
    console.error("Get stall error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stall" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/stalls/:id
 * Update stall details
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Stall ID is required" },
        { status: 400 }
      );
    }

    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return NextResponse.json({ error: tokenError }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;

    // Check if stall exists and user is the owner
    const existingStall = await prisma.stall.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!existingStall) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    if (existingStall.ownerId !== userId) {
      return NextResponse.json(
        { error: "You can only update your own stalls" },
        { status: 403 }
      );
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
      isActive,
    } = body;

    // Build update data object
    const updateData = {};

    if (name !== undefined) {
      if (name.trim().length < 3) {
        return NextResponse.json(
          { error: "Stall name must be at least 3 characters" },
          { status: 400 }
        );
      }
      if (name.length > 100) {
        return NextResponse.json(
          { error: "Stall name must be less than 100 characters" },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (address !== undefined) {
      if (address.trim().length < 5) {
        return NextResponse.json(
          { error: "Address must be at least 5 characters" },
          { status: 400 }
        );
      }
      updateData.address = address.trim();
    }

    if (locationLat !== undefined && locationLng !== undefined) {
      if (
        isNaN(locationLat) ||
        isNaN(locationLng) ||
        locationLat < -90 ||
        locationLat > 90 ||
        locationLng < -180 ||
        locationLng > 180
      ) {
        return NextResponse.json(
          { error: "Invalid coordinates" },
          { status: 400 }
        );
      }
      updateData.locationLat = parseFloat(locationLat);
      updateData.locationLng = parseFloat(locationLng);
    }

    if (contactName !== undefined) {
      if (contactName.trim().length < 2) {
        return NextResponse.json(
          { error: "Contact name is required" },
          { status: 400 }
        );
      }
      updateData.contactName = contactName.trim();
    }

    if (contactPhone !== undefined) {
      if (contactPhone.trim().length < 10) {
        return NextResponse.json(
          { error: "Valid contact phone is required" },
          { status: 400 }
        );
      }
      updateData.contactPhone = contactPhone.trim();
    }

    if (contactEmail !== undefined) {
      if (contactEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactEmail)) {
          return NextResponse.json(
            { error: "Invalid email format" },
            { status: 400 }
          );
        }
        updateData.contactEmail = contactEmail.trim();
      } else {
        updateData.contactEmail = null;
      }
    }

    if (operatingHours !== undefined) {
      if (operatingHours) {
        try {
          JSON.parse(operatingHours);
          updateData.operatingHours = operatingHours;
        } catch (error) {
          return NextResponse.json(
            { error: "Operating hours must be valid JSON" },
            { status: 400 }
          );
        }
      } else {
        updateData.operatingHours = null;
      }
    }

    if (photos !== undefined) {
      if (!Array.isArray(photos)) {
        return NextResponse.json(
          { error: "Photos must be an array" },
          { status: 400 }
        );
      }
      updateData.photos = photos;
    }

    if (isActive !== undefined) {
      updateData.isActive = Boolean(isActive);
    }

    // Update stall
    const updatedStall = await prisma.stall.update({
      where: { id },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Stall updated successfully",
      stall: updatedStall,
    });
  } catch (error) {
    console.error("Update stall error:", error);
    return NextResponse.json(
      { error: "Failed to update stall" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/stalls/:id
 * Delete a stall
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Stall ID is required" },
        { status: 400 }
      );
    }

    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return NextResponse.json({ error: tokenError }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;

    // Check if stall exists and user is the owner
    const existingStall = await prisma.stall.findUnique({
      where: { id },
      select: { ownerId: true, name: true },
    });

    if (!existingStall) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    if (existingStall.ownerId !== userId) {
      return NextResponse.json(
        { error: "You can only delete your own stalls" },
        { status: 403 }
      );
    }

    // Delete stall
    await prisma.stall.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Stall deleted successfully",
      stallName: existingStall.name,
    });
  } catch (error) {
    console.error("Delete stall error:", error);
    return NextResponse.json(
      { error: "Failed to delete stall" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/stalls/:id/contact
 * Increment contact count when user contacts stall owner
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Stall ID is required" },
        { status: 400 }
      );
    }

    const stall = await prisma.stall.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!stall) {
      return NextResponse.json({ error: "Stall not found" }, { status: 404 });
    }

    // Increment contact count
    await prisma.stall.update({
      where: { id },
      data: {
        contactCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact count updated",
    });
  } catch (error) {
    console.error("Update contact count error:", error);
    return NextResponse.json(
      { error: "Failed to update contact count" },
      { status: 500 }
    );
  }
}
