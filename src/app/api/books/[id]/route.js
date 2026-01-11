import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import uploadToCloudinaryServer from "@/utils/uploadToCloudinaryServer";
import deleteFromCloudinary from "@/utils/deleteFromCloudinary";
import { extractPublicId, isCloudinaryUrl } from "@/utils/cloudinaryHelpers";
import { deleteQRCode } from "@/utils/qrcode";
import { getBookValueBreakdown } from "@/utils/bookValuation";
import { getCompleteBookAnalytics } from "@/utils/bookAnalytics";

/**
 * GET /api/books/:id
 * Get book details by ID with AI valuation
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            locationAddress: true,
            points: true,
          },
        },
        bookHistory: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        _count: {
          select: {
            exchanges: true,
            bookHistory: true,
          },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Get AI-powered valuation breakdown
    let valuation = null;
    try {
      valuation = await getBookValueBreakdown(id);
    } catch (error) {
      console.error("Failed to get book valuation:", error);
      // Continue without valuation if it fails
    }

    // Get complete analytics (point value trend, reading journey, community discussions)
    let analytics = null;
    try {
      analytics = await getCompleteBookAnalytics(id);
    } catch (error) {
      console.error("Failed to get book analytics:", error);
      // Continue without analytics if it fails
    }

    return NextResponse.json({
      success: true,
      book,
      valuation,
      analytics,
    });
  } catch (error) {
    console.error("Get book error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/books/:id
 * Update book details
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

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

    // Get current book
    const currentBook = await prisma.book.findUnique({
      where: { id },
      select: {
        userId: true,
        coverImage: true,
      },
    });

    if (!currentBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Check ownership
    if (currentBook.userId !== decoded.id) {
      return NextResponse.json(
        { error: "You don't have permission to update this book" },
        { status: 403 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const isbn = formData.get("isbn");
    const description = formData.get("description");
    const genre = formData.get("genre");
    const condition = formData.get("condition");
    const language = formData.get("language");
    const pointValue = formData.get("pointValue");
    const locationAddress = formData.get("locationAddress");
    const locationLat = formData.get("locationLat");
    const locationLng = formData.get("locationLng");
    const isAvailable = formData.get("isAvailable");
    const coverImage = formData.get("coverImage");

    // Prepare update data
    const updateData = {};

    if (title) updateData.title = title;
    if (author !== undefined) updateData.author = author || null;
    if (isbn !== undefined) updateData.isbn = isbn || null;
    if (description !== undefined) updateData.description = description || null;
    if (genre) updateData.genre = genre;
    if (condition) updateData.condition = condition;
    if (language) updateData.language = language;
    if (pointValue) updateData.pointValue = parseInt(pointValue);
    if (locationAddress !== undefined)
      updateData.locationAddress = locationAddress || null;
    if (locationLat !== undefined)
      updateData.locationLat = locationLat ? parseFloat(locationLat) : null;
    if (locationLng !== undefined)
      updateData.locationLng = locationLng ? parseFloat(locationLng) : null;
    if (isAvailable !== undefined)
      updateData.isAvailable = isAvailable === "true";

    // Handle cover image upload
    if (coverImage && coverImage instanceof File) {
      try {
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await uploadToCloudinaryServer(
          { buffer },
          {
            folder: "book-covers",
            transformation: [{ width: 600, height: 900, crop: "fill" }],
          }
        );

        updateData.coverImage = uploadResult.url;

        // Delete old cover image if exists
        if (currentBook.coverImage && isCloudinaryUrl(currentBook.coverImage)) {
          const oldPublicId = extractPublicId(currentBook.coverImage);
          if (oldPublicId) {
            try {
              await deleteFromCloudinary(oldPublicId);
            } catch (deleteError) {
              console.error("Error deleting old cover:", deleteError);
            }
          }
        }
      } catch (uploadError) {
        console.error("Cover image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload cover image" },
          { status: 500 }
        );
      }
    }

    // Update book
    const updatedBook = await prisma.book.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            locationAddress: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/books/:id
 * Delete a book
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

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

    // Get book
    const book = await prisma.book.findUnique({
      where: { id },
      select: {
        userId: true,
        coverImage: true,
        qrCodeUrl: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Check ownership
    if (book.userId !== decoded.id) {
      return NextResponse.json(
        { error: "You don't have permission to delete this book" },
        { status: 403 }
      );
    }

    // Delete book (cascade will delete exchanges and history)
    await prisma.book.delete({
      where: { id },
    });

    // Delete cover image from Cloudinary
    if (book.coverImage && isCloudinaryUrl(book.coverImage)) {
      const publicId = extractPublicId(book.coverImage);
      if (publicId) {
        try {
          await deleteFromCloudinary(publicId);
        } catch (deleteError) {
          console.error("Error deleting cover image:", deleteError);
        }
      }
    }

    // Delete QR code from Cloudinary
    try {
      await deleteQRCode(id);
    } catch (qrError) {
      console.error("Error deleting QR code:", qrError);
    }

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete book error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
