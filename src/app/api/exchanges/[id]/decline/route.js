import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * PUT /api/exchanges/:id/decline
 * Owner declines the exchange request
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Exchange ID is required" },
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

    // Parse request body for optional decline reason
    const body = await request.json().catch(() => ({}));
    const { reason } = body;

    // Get exchange with book owner info
    const exchange = await prisma.exchange.findUnique({
      where: { id },
      include: {
        book: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!exchange) {
      return NextResponse.json(
        { error: "Exchange not found" },
        { status: 404 }
      );
    }

    // Verify user is the book owner
    if (exchange.book.userId !== decoded.id) {
      return NextResponse.json(
        { error: "Only the book owner can decline this exchange" },
        { status: 403 }
      );
    }

    // Check if exchange is in pending status
    if (exchange.status !== "pending") {
      return NextResponse.json(
        { error: `Exchange is already ${exchange.status}` },
        { status: 400 }
      );
    }

    // Update exchange and return points to requester
    const updatedExchange = await prisma.$transaction(async (tx) => {
      // Return locked points to requester
      if (exchange.pointsLocked) {
        await tx.user.update({
          where: { id: exchange.requesterId },
          data: {
            points: {
              increment: exchange.pointsOffered,
            },
          },
        });
      }

      // Update exchange status
      return await tx.exchange.update({
        where: { id },
        data: {
          status: "declined",
          pointsLocked: false,
          declinedReason: reason || null,
          declinedAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              coverImage: true,
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
    });

    return NextResponse.json({
      success: true,
      message: "Exchange request declined",
      exchange: updatedExchange,
      pointsReturned: exchange.pointsOffered,
    });
  } catch (error) {
    console.error("Decline exchange error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
