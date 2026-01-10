import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * GET /api/payments/history
 * Get user's payment transaction history
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

    // Get pagination parameters from query string
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status"); // Filter by status: completed, pending, failed, refunded

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      userId: decoded.id,
    };

    if (status) {
      where.status = status;
    }

    // Get payments with package details
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          package: {
            select: {
              id: true,
              name: true,
              description: true,
              points: true,
              bonusPoints: true,
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    // Format response
    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      packageName: payment.package.name,
      packageDescription: payment.package.description,
      amount: payment.amount,
      currency: payment.currency,
      pointsPurchased: payment.pointsPurchased,
      status: payment.status,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt,
      package: {
        id: payment.package.id,
        name: payment.package.name,
        basePoints: payment.package.points,
        bonusPoints: payment.package.bonusPoints,
      },
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + payments.length < total,
      },
    });
  } catch (error) {
    console.error("Get payment history error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
