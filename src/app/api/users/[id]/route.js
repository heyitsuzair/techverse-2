import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/users/:id
 * Get public user profile by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Get user with public information only
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        profileImage: true,
        bio: true,
        locationAddress: true,
        locationLat: true,
        locationLng: true,
        points: true,
        createdAt: true,
        _count: {
          select: {
            books: true,
            exchanges: true,
          },
        },
        // Exclude sensitive information like email, phone, password, tokens, etc.
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get completed exchanges count for this user
    const completedExchanges = await prisma.exchange.count({
      where: {
        requesterId: id,
        status: "completed",
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        booksListed: user._count.books,
        totalExchanges: completedExchanges,
        currentPoints: user.points,
      },
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
