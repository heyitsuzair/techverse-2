import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * PUT /api/exchanges/:id/confirm
 * Requester confirms physical exchange completion
 * This transfers ownership and releases points to book owner
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

    // Parse request body for optional book condition rating
    const body = await request.json().catch(() => ({}));
    const { bookConditionRating } = body; // 1-5 rating

    // Validate rating if provided
    if (
      bookConditionRating &&
      (bookConditionRating < 1 || bookConditionRating > 5)
    ) {
      return NextResponse.json(
        { error: "Book condition rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Get exchange with full details
    const exchange = await prisma.exchange.findUnique({
      where: { id },
      include: {
        book: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
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

    // Verify user is the requester
    if (exchange.requesterId !== decoded.id) {
      return NextResponse.json(
        { error: "Only the requester can confirm this exchange" },
        { status: 403 }
      );
    }

    // Check if exchange is in accepted status
    if (exchange.status !== "accepted") {
      return NextResponse.json(
        { error: `Exchange must be accepted before confirmation. Current status: ${exchange.status}` },
        { status: 400 }
      );
    }

    // Check if confirmation deadline has passed
    if (exchange.confirmationDeadline && new Date() > exchange.confirmationDeadline) {
      return NextResponse.json(
        { error: "Confirmation deadline has passed. Exchange has been auto-cancelled." },
        { status: 400 }
      );
    }

    // Execute the complete exchange transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Transfer points to book owner (if still locked)
      if (exchange.pointsLocked) {
        await tx.user.update({
          where: { id: exchange.book.userId },
          data: {
            points: {
              increment: exchange.pointsOffered,
            },
          },
        });
      }

      // 2. Transfer book ownership to requester
      await tx.book.update({
        where: { id: exchange.bookId },
        data: {
          userId: exchange.requesterId,
          isAvailable: true, // Make available for future exchanges
        },
      });

      // 3. Update exchange status to completed
      const completedExchange = await tx.exchange.update({
        where: { id },
        data: {
          status: "completed",
          pointsLocked: false,
          bookConditionRating: bookConditionRating || null,
          completedAt: new Date(),
          completedBy: "requester",
          updatedAt: new Date(),
        },
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              coverImage: true,
              userId: true, // Now points to requester
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

      // 4. Cancel any other pending exchanges for this book
      await tx.exchange.updateMany({
        where: {
          bookId: exchange.bookId,
          status: {
            in: ["pending", "accepted"],
          },
          id: {
            not: id,
          },
        },
        data: {
          status: "cancelled",
          updatedAt: new Date(),
        },
      });

      // 5. Return locked points to other requesters
      const otherPendingExchanges = await tx.exchange.findMany({
        where: {
          bookId: exchange.bookId,
          status: "cancelled",
          pointsLocked: true,
          id: {
            not: id,
          },
        },
        select: {
          id: true,
          requesterId: true,
          pointsOffered: true,
        },
      });

      // Return points to cancelled requesters
      for (const cancelledExchange of otherPendingExchanges) {
        await tx.user.update({
          where: { id: cancelledExchange.requesterId },
          data: {
            points: {
              increment: cancelledExchange.pointsOffered,
            },
          },
        });

        await tx.exchange.update({
          where: { id: cancelledExchange.id },
          data: {
            pointsLocked: false,
          },
        });
      }

      return {
        exchange: completedExchange,
        previousOwner: exchange.book.user,
        pointsTransferred: exchange.pointsOffered,
        cancelledExchanges: otherPendingExchanges.length,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Exchange completed successfully!",
      exchange: result.exchange,
      details: {
        bookTitle: exchange.book.title,
        previousOwner: result.previousOwner.name,
        newOwner: exchange.requester.name,
        pointsTransferred: result.pointsTransferred,
        bookConditionRating: bookConditionRating || null,
        otherRequestsCancelled: result.cancelledExchanges,
      },
    });
  } catch (error) {
    console.error("Confirm exchange error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
