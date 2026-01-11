import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

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

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Fetch user's stalls
    const stalls = await prisma.stall.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
    });

    // Map address to locationAddress for frontend consistency
    const stallsWithLocationAddress = stalls.map((stall) => ({
      ...stall,
      locationAddress: stall.address,
    }));

    return NextResponse.json({
      success: true,
      stalls: stallsWithLocationAddress,
      count: stalls.length,
    });
  } catch (error) {
    console.error("Get my stalls error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch stalls" },
      { status: 500 }
    );
  }
}
