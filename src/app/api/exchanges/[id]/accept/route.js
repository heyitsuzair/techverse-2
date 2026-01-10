import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * PUT /api/exchanges/:id/accept
 * Owner accepts the exchange request
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
        { error: "Only the book owner can accept this exchange" },
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

    // Set confirmation deadline (7 days from acceptance)
    const confirmationDeadline = new Date();
    confirmationDeadline.setDate(confirmationDeadline.getDate() + 7);

    // Update exchange status to accepted
    const updatedExchange = await prisma.exchange.update({
      where: { id },
      data: {
        status: "accepted",
        confirmationDeadline,
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

    return NextResponse.json({
      success: true,
      message: "Exchange request accepted successfully",
      exchange: updatedExchange,
      nextStep:
        "Requester must confirm the exchange within 7 days after receiving the book",
    });
  } catch (error) {
    console.error("Accept exchange error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
