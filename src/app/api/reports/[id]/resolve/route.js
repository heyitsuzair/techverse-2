import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";

/**
 * PUT /api/reports/:id/resolve
 * Resolve a report (admin only - for now, any authenticated user can resolve)
 */
export async function PUT(request, { params }) {
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

    const { id } = params;
    const body = await request.json();
    const {
      resolution, // "valid", "invalid", "partial_refund", "full_refund", "exchange_reversed", "user_warned", "user_suspended"
      resolutionNotes,
      pointsAdjusted, // Points to refund/adjust
      exchangeReversed, // Boolean - reverse the exchange?
      userWarned, // Boolean - send warning to user?
      userSuspended, // Boolean - suspend user account?
    } = body;

    // Validate resolution
    if (!resolution) {
      return NextResponse.json(
        { error: "Resolution is required" },
        { status: 400 }
      );
    }

    const validResolutions = [
      "valid",
      "invalid",
      "partial_refund",
      "full_refund",
      "exchange_reversed",
      "user_warned",
      "user_suspended",
      "dismissed",
    ];

    if (!validResolutions.includes(resolution)) {
      return NextResponse.json(
        {
          error: `Invalid resolution. Must be one of: ${validResolutions.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Get report
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        reporter: {
          select: { id: true, name: true, points: true },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Check if already resolved
    if (report.status === "resolved") {
      return NextResponse.json(
        { error: "Report has already been resolved" },
        { status: 400 }
      );
    }

    // Perform resolution actions in a transaction
    const result = await prisma.$transaction(async (tx) => {
      let actionsLog = [];

      // 1. Handle points adjustment
      if (pointsAdjusted && pointsAdjusted > 0) {
        // Refund points to reporter
        await tx.user.update({
          where: { id: report.reporterId },
          data: {
            points: {
              increment: pointsAdjusted,
            },
          },
        });
        actionsLog.push(`Refunded ${pointsAdjusted} points to reporter`);

        // Deduct from reported user if applicable
        if (report.reportedUserId) {
          await tx.user.update({
            where: { id: report.reportedUserId },
            data: {
              points: {
                decrement: pointsAdjusted,
              },
            },
          });
          actionsLog.push(
            `Deducted ${pointsAdjusted} points from reported user`
          );
        }
      }

      // 2. Handle exchange reversal
      if (exchangeReversed && report.exchangeId) {
        const exchange = await tx.exchange.findUnique({
          where: { id: report.exchangeId },
          include: {
            book: true,
          },
        });

        if (exchange) {
          // Find the original owner (before the exchange)
          // The book's current owner is the requester, so we need to transfer back
          const originalOwnerId =
            exchange.book.userId === exchange.requesterId
              ? report.reportedUserId
              : exchange.book.userId;

          // Transfer book back to original owner
          await tx.book.update({
            where: { id: exchange.bookId },
            data: {
              userId: originalOwnerId,
            },
          });

          // Return points to requester, deduct from owner
          await tx.user.update({
            where: { id: exchange.requesterId },
            data: {
              points: {
                increment: exchange.pointsOffered,
              },
            },
          });

          if (originalOwnerId) {
            await tx.user.update({
              where: { id: originalOwnerId },
              data: {
                points: {
                  decrement: exchange.pointsOffered,
                },
              },
            });
          }

          // Mark exchange as cancelled
          await tx.exchange.update({
            where: { id: report.exchangeId },
            data: {
              status: "cancelled",
            },
          });

          actionsLog.push(
            "Exchange reversed: book ownership and points restored"
          );
        }
      }

      // 3. Update the report
      const updatedReport = await tx.report.update({
        where: { id },
        data: {
          status: "resolved",
          resolution,
          resolutionNotes: resolutionNotes || actionsLog.join("; "),
          resolvedBy: decoded.id,
          resolvedAt: new Date(),
          pointsAdjusted: pointsAdjusted || 0,
          exchangeReversed: exchangeReversed || false,
          userWarned: userWarned || false,
          userSuspended: userSuspended || false,
        },
        include: {
          reporter: {
            select: {
              id: true,
              name: true,
              email: true,
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
      });

      return { report: updatedReport, actionsLog };
    });

    // TODO: Send notifications to involved users
    // - Notify reporter of resolution
    // - Notify reported user if warned/suspended

    return NextResponse.json({
      success: true,
      message: "Report resolved successfully",
      report: result.report,
      actions: result.actionsLog,
    });
  } catch (error) {
    console.error("Resolve report error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reports/:id
 * Get a specific report details
 */
export async function GET(request, { params }) {
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

    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
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
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Check authorization
    // User can view if they are the reporter, reported user, or admin
    const isReporter = report.reporterId === decoded.id;
    const isReported = report.reportedUserId === decoded.id;
    // TODO: Add admin check

    if (!isReporter && !isReported) {
      return NextResponse.json(
        { error: "Not authorized to view this report" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Get report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
