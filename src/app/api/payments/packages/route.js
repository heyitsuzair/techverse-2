import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * GET /api/payments/packages
 * Get all available point packages and user's current points
 */
export async function GET(request) {
  try {
    // Validate and extract token (optional - returns packages even without auth)
    const { token } = validateAuthHeader(request);

    let userPoints = null;

    // If authenticated, get user's current points
    if (token) {
      try {
        const decoded = verifyAccessToken(token);
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { points: true },
        });

        if (user) {
          userPoints = user.points;
        }
      } catch (error) {
        // Token invalid or expired - continue without user points
        console.log(
          "Failed to decode token for packages endpoint:",
          error.message
        );
      }
    }

    // Get all active packages sorted by sortOrder
    const packages = await prisma.pointPackage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        points: true,
        bonusPoints: true,
        features: true,
        validityMonths: true,
        badge: true,
      },
    });

    // Calculate total points for each package
    const packagesWithTotal = packages.map((pkg) => ({
      ...pkg,
      totalPoints: pkg.points + pkg.bonusPoints,
    }));

    return NextResponse.json({
      success: true,
      currentPoints: userPoints,
      packages: packagesWithTotal,
    });
  } catch (error) {
    console.error("Get packages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
