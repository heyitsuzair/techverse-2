import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import uploadToCloudinaryServer from "@/utils/uploadToCloudinaryServer";
import deleteFromCloudinary from "@/utils/deleteFromCloudinary";
import { extractPublicId, isCloudinaryUrl } from "@/utils/cloudinaryHelpers";

/**
 * PUT /api/users/me
 * Update current user profile
 */
export async function PUT(request) {
  try {
    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return NextResponse.json({ error: tokenError }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const bio = formData.get("bio");
    const locationAddress = formData.get("locationAddress");
    const locationLat = formData.get("locationLat");
    const locationLng = formData.get("locationLng");
    const profileImage = formData.get("profileImage");

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        profileImage: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone || null;
    if (bio !== undefined) updateData.bio = bio || null;
    if (locationAddress !== undefined)
      updateData.locationAddress = locationAddress || null;
    if (locationLat !== undefined)
      updateData.locationLat = locationLat ? parseFloat(locationLat) : null;
    if (locationLng !== undefined)
      updateData.locationLng = locationLng ? parseFloat(locationLng) : null;

    // Handle profile image upload
    if (profileImage && profileImage instanceof File) {
      try {
        // Convert file to buffer
        const bytes = await profileImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinaryServer(
          { buffer },
          {
            folder: "user-profiles",
            transformation: [
              { width: 400, height: 400, crop: "fill", gravity: "face" },
            ],
          }
        );

        updateData.profileImage = uploadResult.url;

        // Delete old image if exists and is from Cloudinary
        if (
          currentUser.profileImage &&
          isCloudinaryUrl(currentUser.profileImage)
        ) {
          const oldPublicId = extractPublicId(currentUser.profileImage);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.error("Error deleting old image:", deleteError);
              // Continue even if deletion fails
            }
          }
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload profile image" },
          { status: 500 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        points: true,
        profileImage: true,
        bio: true,
        locationAddress: true,
        locationLat: true,
        locationLng: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            books: true,
            exchanges: true,
          },
        },
      },
    });

    // Get completed exchanges count
    const completedExchanges = await prisma.exchange.count({
      where: {
        requesterId: decoded.id,
        status: "completed",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...updatedUser,
        booksListed: updatedUser._count.books,
        totalExchanges: completedExchanges,
        currentPoints: updatedUser.points,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
