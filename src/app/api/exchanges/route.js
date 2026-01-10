import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import { calculateBookValue } from "@/utils/bookValuation";

/**
 * POST /api/exchanges
 * Request a book exchange (initiate exchange)
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

    // Parse request body
    const body = await request.json();
    const {
      bookId,
      message,
      meetingAddress,
      meetingLat,
      meetingLng,
      scheduledAt,
    } = body;

    // Validation
    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Get book details with owner info
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Prevent self-exchange
    if (book.userId === decoded.id) {
      return NextResponse.json(
        { error: "Cannot request your own book" },
        { status: 400 }
      );
    }

    // Check if book is available
    if (!book.isAvailable) {
      return NextResponse.json(
        { error: "Book is not available for exchange" },
        { status: 400 }
      );
    }

    // Check for existing pending exchange
    const existingExchange = await prisma.exchange.findFirst({
      where: {
        bookId,
        requesterId: decoded.id,
        status: {
          in: ["pending", "accepted"],
        },
      },
    });

    if (existingExchange) {
      return NextResponse.json(
        {
          error: "You already have a pending exchange request for this book",
        },
        { status: 400 }
      );
    }

    // Calculate book value using AI
    const pointsRequired = await calculateBookValue(bookId);

    // Get requester's current points
    const requester = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { points: true, name: true },
    });

    if (!requester) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has enough points
    if (requester.points < pointsRequired) {
      return NextResponse.json(
        {
          error: "Insufficient points",
          required: pointsRequired,
          available: requester.points,
          shortfall: pointsRequired - requester.points,
        },
        { status: 400 }
      );
    }

    // Create exchange request and lock points
    const exchange = await prisma.$transaction(async (tx) => {
      // Lock points by deducting from user
      await tx.user.update({
        where: { id: decoded.id },
        data: {
          points: {
            decrement: pointsRequired,
          },
        },
      });

      // Create exchange record
      const newExchange = await tx.exchange.create({
        data: {
          bookId,
          requesterId: decoded.id,
          pointsOffered: pointsRequired,
          pointsLocked: true,
          status: "pending",
          message: message || null,
          meetingAddress: meetingAddress || null,
          meetingLat: meetingLat ? parseFloat(meetingLat) : null,
          meetingLng: meetingLng ? parseFloat(meetingLng) : null,
          scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              coverImage: true,
              condition: true,
            },
          },
          requester: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            },
          },
        },
      });

      return newExchange;
    });

    return NextResponse.json(
      {
        success: true,
        message: "Exchange request created successfully",
        exchange: {
          ...exchange,
          owner: {
            id: book.user.id,
            name: book.user.name,
            email: book.user.email,
          },
        },
        pointsLocked: pointsRequired,
        remainingPoints: requester.points - pointsRequired,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create exchange error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/exchanges
 * Get user's exchange history
 */
export async function GET(request) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role"); // "requester" | "owner" | "all"
    const status = searchParams.get("status"); // Filter by status
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      OR: [],
    };

    if (role === "requester") {
      where.OR.push({ requesterId: decoded.id });
    } else if (role === "owner") {
      where.OR.push({
        book: {
          userId: decoded.id,
        },
      });
    } else {
      // Both requester and owner
      where.OR.push(
        { requesterId: decoded.id },
        {
          book: {
            userId: decoded.id,
          },
        }
      );
    }

    if (status) {
      where.status = status;
    }

    // Get exchanges
    const [exchanges, total] = await Promise.all([
      prisma.exchange.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          book: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profileImage: true,
                },
              },
            },
          },
          requester: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            },
          },
        },
      }),
      prisma.exchange.count({ where }),
    ]);

    // Format response with role information
    const formattedExchanges = exchanges.map((exchange) => ({
      ...exchange,
      userRole:
        exchange.requesterId === decoded.id
          ? "requester"
          : exchange.book.userId === decoded.id
          ? "owner"
          : "unknown",
      owner: exchange.book.user,
    }));

    return NextResponse.json({
      success: true,
      exchanges: formattedExchanges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + exchanges.length < total,
      },
    });
  } catch (error) {
    console.error("Get exchanges error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
