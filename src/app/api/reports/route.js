import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import {
  detectRepeatedExchanges,
  detectRapidTransfers,
  detectPointFarming,
} from "@/utils/antiAbuse";

/**
 * POST /api/reports
 * Create a new report (book condition, fraud, abuse, etc.)
 */
export async function POST(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    const tokenValidation = validateAuthHeader(authHeader);

    if (!tokenValidation.isValid) {
      return NextResponse.json(
        { error: tokenValidation.error },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(tokenValidation.token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      type, // "book_condition", "fraud", "abuse", "fake_exchange", "repeated_exchange"
      exchangeId,
      bookId,
      reportedUserId,
      reason,
      description,
      evidence,
      expectedCondition,
      actualCondition,
      conditionPhotos,
    } = body;

    // Validate required fields
    if (!type || !reason) {
      return NextResponse.json(
        { error: "Type and reason are required" },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = [
      "book_condition",
      "fraud",
      "abuse",
      "fake_exchange",
      "repeated_exchange",
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // For book_condition reports, exchangeId is required
    if (type === "book_condition" && !exchangeId) {
      return NextResponse.json(
        { error: "Exchange ID is required for book condition reports" },
        { status: 400 }
      );
    }

    // Verify exchange exists and user is involved
    if (exchangeId) {
      const exchange = await prisma.exchange.findUnique({
        where: { id: exchangeId },
        include: {
          book: {
            select: { userId: true },
          },
        },
      });

      if (!exchange) {
        return NextResponse.json(
          { error: "Exchange not found" },
          { status: 404 }
        );
      }

      // User must be the requester (who received the book)
      if (exchange.requesterId !== decoded.id) {
        return NextResponse.json(
          { error: "Only the requester can report book condition" },
          { status: 403 }
        );
      }

      // Exchange must be completed
      if (exchange.status !== "completed") {
        return NextResponse.json(
          { error: "Can only report completed exchanges" },
          { status: 400 }
        );
      }

      // Set reportedUserId to book owner if not provided
      if (!reportedUserId) {
        body.reportedUserId = exchange.book.userId;
      }
    }

    // Check for duplicate reports
    const existingReport = await prisma.report.findFirst({
      where: {
        reporterId: decoded.id,
        exchangeId,
        bookId,
        type,
        status: { in: ["pending", "investigating"] },
      },
    });

    if (existingReport) {
      return NextResponse.json(
        { error: "You already have a pending report for this item" },
        { status: 400 }
      );
    }

    // Run anti-abuse checks for automatic flagging
    let priority = "medium";
    let autoFlags = [];

    if (type === "repeated_exchange" && reportedUserId) {
      const repeatedCheck = await detectRepeatedExchanges(
        decoded.id,
        reportedUserId
      );
      if (repeatedCheck.isSuspicious) {
        priority = repeatedCheck.severity;
        autoFlags.push(repeatedCheck.message);
      }
    }

    if (type === "fake_exchange" && bookId) {
      const rapidCheck = await detectRapidTransfers(bookId);
      if (rapidCheck.isSuspicious) {
        priority = rapidCheck.severity;
        autoFlags.push(rapidCheck.message);
      }
    }

    if (reportedUserId) {
      const farmingCheck = await detectPointFarming(reportedUserId);
      if (farmingCheck.isSuspicious) {
        priority = "high";
        autoFlags.push(...farmingCheck.flags);
      }
    }

    // Create report
    const report = await prisma.report.create({
      data: {
        type,
        status: "pending",
        priority,
        reporterId: decoded.id,
        reportedUserId: body.reportedUserId,
        exchangeId,
        bookId,
        reason,
        description,
        evidence: evidence || {},
        expectedCondition,
        actualCondition,
        conditionPhotos: conditionPhotos || [],
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // If high priority, pause the exchange
    if (priority === "high" || priority === "critical") {
      if (exchangeId) {
        await prisma.exchange.update({
          where: { id: exchangeId },
          data: {
            status: "cancelled", // Temporarily pause
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Report submitted successfully",
        report,
        autoFlags: autoFlags.length > 0 ? autoFlags : undefined,
        priorityReason:
          priority === "high" || priority === "critical"
            ? "Report flagged for immediate review due to suspicious patterns"
            : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reports
 * Get reports (user's own reports or all reports for admins)
 */
export async function GET(request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    const tokenValidation = validateAuthHeader(authHeader);

    if (!tokenValidation.isValid) {
      return NextResponse.json(
        { error: tokenValidation.error },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(tokenValidation.token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") || "reporter"; // "reporter" | "admin"
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const priority = searchParams.get("priority");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Build where clause
    let where = {};

    if (role === "reporter") {
      // User's own reports
      where.reporterId = decoded.id;
    } else if (role === "reported") {
      // Reports against the user
      where.reportedUserId = decoded.id;
    }
    // For admin role, show all reports (no filter on user)

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (priority) {
      where.priority = priority;
    }

    // Get reports
    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          reporter: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            },
          },
          resolvedByUser: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [
          { priority: "desc" }, // Critical/high first
          { createdAt: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.report.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page < Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get reports error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
