import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import { generateAndUploadQRCode } from "@/utils/qrcode";

/**
 * GET /api/books
 * Get all books (marketplace) with filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const condition = searchParams.get("condition");
    const location = searchParams.get("location");
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      isAvailable: true,
    };

    if (genre) where.genre = genre;
    if (condition) where.condition = condition;
    if (userId) where.userId = userId;
    if (location) {
      where.locationAddress = {
        contains: location,
        mode: "insensitive",
      };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get books with user info
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profileImage: true,
              locationAddress: true,
            },
          },
          _count: {
            select: {
              exchanges: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.book.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get books error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books
 * Create a new book listing
 */
export async function POST(request) {
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
    const title = formData.get("title");
    const author = formData.get("author");
    const isbn = formData.get("isbn");
    const description = formData.get("description");
    const genre = formData.get("genre");
    const condition = formData.get("condition");
    const language = formData.get("language") || "English";
    const pointValue = formData.get("pointValue") || "10";
    const locationAddress = formData.get("locationAddress");
    const locationLat = formData.get("locationLat");
    const locationLng = formData.get("locationLng");
    const coverImage = formData.get("coverImage");

    // Validate required fields
    if (!title || !genre || !condition) {
      return NextResponse.json(
        { error: "Title, genre, and condition are required" },
        { status: 400 }
      );
    }

    // Prepare book data
    const bookData = {
      title,
      author: author || null,
      isbn: isbn || null,
      description: description || null,
      genre,
      condition,
      language,
      pointValue: parseInt(pointValue),
      locationAddress: locationAddress || null,
      locationLat: locationLat ? parseFloat(locationLat) : null,
      locationLng: locationLng ? parseFloat(locationLng) : null,
      userId: decoded.id,
    };

    // Handle cover image upload
    if (coverImage && coverImage instanceof File) {
      try {
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await uploadToCloudinary(
          { buffer },
          {
            folder: "book-covers",
            transformation: [{ width: 600, height: 900, crop: "fill" }],
          }
        );

        bookData.coverImage = uploadResult.url;
      } catch (uploadError) {
        console.error("Cover image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload cover image" },
          { status: 500 }
        );
      }
    }

    // Create book
    const book = await prisma.book.create({
      data: bookData,
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

    // Generate and upload QR code
    try {
      const qrCodeUrl = await generateAndUploadQRCode(book.id, book.title);

      // Update book with QR code URL
      const updatedBook = await prisma.book.update({
        where: { id: book.id },
        data: { qrCodeUrl },
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

      return NextResponse.json(
        {
          success: true,
          message: "Book listed successfully",
          book: updatedBook,
        },
        { status: 201 }
      );
    } catch (qrError) {
      console.error("QR code generation error:", qrError);
      // Book is created but without QR code
      return NextResponse.json(
        {
          success: true,
          message: "Book listed successfully (QR code generation pending)",
          book,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Create book error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
