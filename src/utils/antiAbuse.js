import { prisma } from "@/lib/prisma";

/**
 * Detect repeated exchanges between same users
 * Flag if users exchange books back and forth too frequently
 */
export async function detectRepeatedExchanges(userId1, userId2) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Count exchanges in both directions in last 30 days
    const exchangeCount = await prisma.exchange.count({
      where: {
        OR: [
          {
            requesterId: userId1,
            book: {
              userId: userId2,
            },
            status: "completed",
            completedAt: {
              gte: thirtyDaysAgo,
            },
          },
          {
            requesterId: userId2,
            book: {
              userId: userId1,
            },
            status: "completed",
            completedAt: {
              gte: thirtyDaysAgo,
            },
          },
        ],
      },
    });

    return {
      count: exchangeCount,
      isSuspicious: exchangeCount >= 5, // 5+ exchanges in 30 days is suspicious
      severity:
        exchangeCount >= 10 ? "critical" : exchangeCount >= 5 ? "high" : "low",
      message:
        exchangeCount >= 5
          ? `${exchangeCount} exchanges detected between these users in the last 30 days`
          : null,
    };
  } catch (error) {
    console.error("Error detecting repeated exchanges:", error);
    return { count: 0, isSuspicious: false, severity: "low" };
  }
}

/**
 * Detect rapid back-and-forth book transfers
 * Flag if same book is exchanged back and forth quickly
 */
export async function detectRapidTransfers(bookId) {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get book ownership history
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { userId: true },
    });

    if (!book) return { isSuspicious: false };

    // Count completed exchanges for this book in last 7 days
    const recentExchanges = await prisma.exchange.count({
      where: {
        bookId,
        status: "completed",
        completedAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return {
      count: recentExchanges,
      isSuspicious: recentExchanges >= 3, // 3+ transfers in 7 days is suspicious
      severity:
        recentExchanges >= 5
          ? "critical"
          : recentExchanges >= 3
          ? "high"
          : "low",
      message:
        recentExchanges >= 3
          ? `This book has been exchanged ${recentExchanges} times in the last 7 days`
          : null,
    };
  } catch (error) {
    console.error("Error detecting rapid transfers:", error);
    return { count: 0, isSuspicious: false, severity: "low" };
  }
}

/**
 * Detect suspicious point farming behavior
 * Flag users who show patterns of point manipulation
 */
export async function detectPointFarming(userId) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get user's recent exchange activity
    const userExchanges = await prisma.exchange.findMany({
      where: {
        OR: [{ requesterId: userId }, { book: { userId } }],
        status: "completed",
        completedAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        book: {
          select: { userId: true },
        },
        requester: {
          select: { id: true },
        },
      },
    });

    // Check for patterns:
    // 1. High volume of exchanges
    const totalExchanges = userExchanges.length;

    // 2. Exchanges with same users repeatedly
    const partnerCounts = {};
    userExchanges.forEach((exchange) => {
      const partnerId =
        exchange.requesterId === userId
          ? exchange.book.userId
          : exchange.requester.id;

      partnerCounts[partnerId] = (partnerCounts[partnerId] || 0) + 1;
    });

    const repeatedPartners = Object.values(partnerCounts).filter(
      (count) => count >= 3
    ).length;

    // 3. Very high points earned
    const pointsEarned = userExchanges
      .filter((ex) => ex.book.userId === userId)
      .reduce((sum, ex) => sum + ex.pointsOffered, 0);

    const isSuspicious =
      totalExchanges >= 15 || repeatedPartners >= 3 || pointsEarned >= 3000;

    return {
      totalExchanges,
      repeatedPartners,
      pointsEarned,
      isSuspicious,
      severity:
        pointsEarned >= 5000 || totalExchanges >= 25 ? "critical" : "high",
      flags: [
        totalExchanges >= 15 &&
          `High exchange volume: ${totalExchanges} exchanges`,
        repeatedPartners >= 3 &&
          `Repeated exchanges with ${repeatedPartners} same users`,
        pointsEarned >= 3000 &&
          `Unusually high points earned: ${pointsEarned} points`,
      ].filter(Boolean),
    };
  } catch (error) {
    console.error("Error detecting point farming:", error);
    return { isSuspicious: false, flags: [] };
  }
}

/**
 * Get user's trust score (0-100)
 * Based on account age, exchange history, reports, etc.
 */
export async function calculateTrustScore(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        exchanges: {
          where: { status: "completed" },
          select: { bookConditionRating: true, completedAt: true },
        },
        reports: {
          where: { status: "resolved" },
          select: { resolution: true },
        },
        _count: {
          select: {
            books: true,
            exchanges: true,
          },
        },
      },
    });

    if (!user) return 0;

    let score = 50; // Start at 50

    // Account age (max +15)
    const accountAgeDays = Math.floor(
      (new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
    );
    score += Math.min(15, accountAgeDays / 10);

    // Completed exchanges (max +15)
    score += Math.min(15, user._count.exchanges * 2);

    // Average book condition rating (max +10)
    const ratings = user.exchanges
      .filter((ex) => ex.bookConditionRating)
      .map((ex) => ex.bookConditionRating);

    if (ratings.length > 0) {
      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      score += (avgRating / 5) * 10;
    }

    // Reports against user (-20 per report)
    const reportsAgainst = await prisma.report.count({
      where: {
        reportedUserId: userId,
        status: { in: ["resolved", "investigating"] },
      },
    });
    score -= reportsAgainst * 20;

    // Books listed (+5)
    score += Math.min(10, user._count.books * 2);

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
  } catch (error) {
    console.error("Error calculating trust score:", error);
    return 50; // Default neutral score
  }
}

/**
 * Check if user should be warned or suspended
 */
export async function checkUserStatus(userId) {
  try {
    const trustScore = await calculateTrustScore(userId);
    const farmingCheck = await detectPointFarming(userId);

    // Count recent reports
    const recentReports = await prisma.report.count({
      where: {
        reportedUserId: userId,
        status: { in: ["pending", "investigating"] },
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    return {
      trustScore,
      shouldWarn:
        trustScore < 30 || farmingCheck.isSuspicious || recentReports >= 2,
      shouldSuspend: trustScore < 15 || recentReports >= 5,
      reasons: [
        trustScore < 30 && `Low trust score: ${trustScore}/100`,
        farmingCheck.isSuspicious && "Suspicious point farming detected",
        recentReports >= 2 && `${recentReports} recent reports`,
      ].filter(Boolean),
    };
  } catch (error) {
    console.error("Error checking user status:", error);
    return {
      trustScore: 50,
      shouldWarn: false,
      shouldSuspend: false,
      reasons: [],
    };
  }
}
