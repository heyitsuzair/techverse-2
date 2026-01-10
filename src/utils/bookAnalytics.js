import { prisma } from "@/lib/prisma";
import { getBookValueBreakdown } from "./bookValuation";

/**
 * Get point value trend by months
 * Shows how the book's point value has changed over time
 */
export async function getPointValueTrend(bookId) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        pointValue: true,
        createdAt: true,
        exchanges: {
          where: {
            status: {
              in: ["completed", "confirmed"],
            },
          },
          select: {
            pointsOffered: true,
            completedAt: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!book) {
      return null;
    }

    // Build monthly trend
    const monthlyData = {};
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthlyData[monthKey] = {
        month: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        averagePoints: 0,
        offersCount: 0,
        totalPoints: 0,
        highestOffer: 0,
        lowestOffer: null,
      };
    }

    // Add exchange data
    book.exchanges.forEach((exchange) => {
      const exchangeDate = exchange.completedAt || exchange.createdAt;
      if (exchangeDate >= sixMonthsAgo) {
        const monthKey = `${exchangeDate.getFullYear()}-${String(
          exchangeDate.getMonth() + 1
        ).padStart(2, "0")}`;
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].offersCount++;
          monthlyData[monthKey].totalPoints += exchange.pointsOffered || 0;
          monthlyData[monthKey].highestOffer = Math.max(
            monthlyData[monthKey].highestOffer,
            exchange.pointsOffered || 0
          );
          if (
            monthlyData[monthKey].lowestOffer === null ||
            exchange.pointsOffered < monthlyData[monthKey].lowestOffer
          ) {
            monthlyData[monthKey].lowestOffer = exchange.pointsOffered || 0;
          }
        }
      }
    });

    // Calculate averages
    const trend = Object.keys(monthlyData)
      .sort()
      .map((key) => {
        const data = monthlyData[key];
        data.averagePoints =
          data.offersCount > 0
            ? Math.round(data.totalPoints / data.offersCount)
            : book.pointValue;
        return data;
      });

    // Calculate trend direction
    const recentAvg = trend[trend.length - 1]?.averagePoints || book.pointValue;
    const olderAvg = trend[0]?.averagePoints || book.pointValue;
    const trendDirection =
      recentAvg > olderAvg
        ? "increasing"
        : recentAvg < olderAvg
        ? "decreasing"
        : "stable";
    const percentageChange =
      olderAvg > 0 ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100) : 0;

    return {
      currentValue: book.pointValue,
      trend,
      trendDirection,
      percentageChange,
      totalOffers: book.exchanges.length,
      analysis: generateTrendAnalysis(
        trendDirection,
        percentageChange,
        book.exchanges.length
      ),
    };
  } catch (error) {
    console.error("Error calculating point value trend:", error);
    return null;
  }
}

/**
 * Get reading journey for a book
 * Shows all the readers and their journey with the book
 */
export async function getReadingJourney(bookId) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        exchanges: {
          where: {
            status: {
              in: ["completed", "confirmed"],
            },
          },
          select: {
            id: true,
            requester: {
              select: {
                id: true,
                name: true,
                profileImage: true,
                locationAddress: true,
              },
            },
            owner: {
              select: {
                id: true,
                name: true,
                profileImage: true,
                locationAddress: true,
              },
            },
            completedAt: true,
            createdAt: true,
            pointsOffered: true,
          },
          orderBy: {
            completedAt: "asc",
          },
        },
        bookHistory: {
          select: {
            id: true,
            action: true,
            notes: true,
            createdAt: true,
            locationAddress: true,
            user: {
              select: {
                id: true,
                name: true,
                profileImage: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!book) {
      return null;
    }

    // Build journey timeline
    const journeyEvents = [];

    // Add original listing
    journeyEvents.push({
      type: "listed",
      date: book.createdAt,
      user: book.user,
      description: `Listed by ${book.user.name}`,
      location: null,
      points: null,
    });

    // Add exchanges
    book.exchanges.forEach((exchange) => {
      journeyEvents.push({
        type: "exchanged",
        date: exchange.completedAt || exchange.createdAt,
        from: exchange.owner,
        to: exchange.requester,
        description: `Exchanged from ${exchange.owner.name} to ${exchange.requester.name}`,
        location: exchange.requester.locationAddress,
        points: exchange.pointsOffered,
        exchangeId: exchange.id,
      });
    });

    // Add significant book history events
    const significantActions = ["read", "reviewed", "noted"];
    book.bookHistory.forEach((history) => {
      if (significantActions.includes(history.action)) {
        journeyEvents.push({
          type: history.action,
          date: history.createdAt,
          user: history.user,
          description: `${
            history.action.charAt(0).toUpperCase() + history.action.slice(1)
          } by ${history.user.name}`,
          notes: history.notes,
          location: history.locationAddress,
          historyId: history.id,
        });
      }
    });

    // Sort by date
    journeyEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate statistics
    const uniqueReaders = new Set();
    const locations = new Set();

    journeyEvents.forEach((event) => {
      if (event.user) uniqueReaders.add(event.user.id);
      if (event.from) uniqueReaders.add(event.from.id);
      if (event.to) uniqueReaders.add(event.to.id);
      if (event.location) locations.add(event.location);
    });

    const daysSinceListing = Math.floor(
      (new Date() - new Date(book.createdAt)) / (1000 * 60 * 60 * 24)
    );

    return {
      timeline: journeyEvents,
      statistics: {
        totalReaders: uniqueReaders.size,
        totalExchanges: book.exchanges.length,
        uniqueLocations: locations.size,
        daysSinceListing,
        averageDaysPerReader:
          book.exchanges.length > 0
            ? Math.round(daysSinceListing / book.exchanges.length)
            : daysSinceListing,
      },
      currentOwner: book.user,
    };
  } catch (error) {
    console.error("Error getting reading journey:", error);
    return null;
  }
}

/**
 * Get community discussions for a book
 * Returns forum threads with preview data
 */
export async function getCommunityDiscussions(bookId, limit = 5) {
  try {
    const threads = await prisma.forumThread.findMany({
      where: {
        bookId,
        isModerated: false,
      },
      orderBy: [
        { isPinned: "desc" },
        { commentCount: "desc" },
        { createdAt: "desc" },
      ],
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        chapter: true,
        tags: true,
        authorName: true,
        isAnonymous: true,
        isPinned: true,
        isLocked: true,
        viewCount: true,
        commentCount: true,
        likeCount: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
    });

    // Get total count
    const totalThreads = await prisma.forumThread.count({
      where: {
        bookId,
        isModerated: false,
      },
    });

    // Get total comments across all threads
    const totalComments = await prisma.forumComment.count({
      where: {
        thread: {
          bookId,
        },
        isModerated: false,
      },
    });

    // Get unique participants
    const threadAuthors = await prisma.forumThread.findMany({
      where: {
        bookId,
        isModerated: false,
        authorId: { not: null },
      },
      select: { authorId: true },
      distinct: ["authorId"],
    });

    const commentAuthors = await prisma.forumComment.findMany({
      where: {
        thread: {
          bookId,
        },
        isModerated: false,
        authorId: { not: null },
      },
      select: { authorId: true },
      distinct: ["authorId"],
    });

    const uniqueParticipants = new Set([
      ...threadAuthors.map((t) => t.authorId),
      ...commentAuthors.map((c) => c.authorId),
    ]);

    // Get popular chapters being discussed
    const chapterDiscussions = await prisma.forumThread.groupBy({
      by: ["chapter"],
      where: {
        bookId,
        isModerated: false,
        chapter: { not: null },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 5,
    });

    // Format threads (hide author details for anonymous)
    const formattedThreads = threads.map((thread) => ({
      id: thread.id,
      title: thread.title,
      contentPreview:
        thread.content.length > 150
          ? thread.content.substring(0, 150) + "..."
          : thread.content,
      chapter: thread.chapter,
      tags: thread.tags,
      isPinned: thread.isPinned,
      isLocked: thread.isLocked,
      viewCount: thread.viewCount,
      commentCount: thread.commentCount,
      likeCount: thread.likeCount,
      createdAt: thread.createdAt,
      author: thread.isAnonymous
        ? {
            name: thread.authorName,
            isAnonymous: true,
          }
        : {
            id: thread.author?.id,
            name: thread.author?.name || thread.authorName,
            profileImage: thread.author?.profileImage,
            isAnonymous: false,
          },
    }));

    return {
      threads: formattedThreads,
      statistics: {
        totalThreads,
        totalComments,
        totalDiscussions: totalThreads + totalComments,
        uniqueParticipants: uniqueParticipants.size,
        popularChapters: chapterDiscussions.map((ch) => ({
          chapter: ch.chapter,
          discussionCount: ch._count.id,
        })),
      },
      hasMoreThreads: totalThreads > limit,
    };
  } catch (error) {
    console.error("Error getting community discussions:", error);
    return null;
  }
}

/**
 * Generate human-readable trend analysis
 */
function generateTrendAnalysis(direction, percentage, totalOffers) {
  if (totalOffers === 0) {
    return "No exchange offers yet. Point value is based on initial assessment.";
  }

  if (direction === "stable") {
    return `Point value has remained stable over the past 6 months with ${totalOffers} offer(s).`;
  }

  const change = Math.abs(percentage);
  if (direction === "increasing") {
    return `Point value has increased by ${change}% over the past 6 months, indicating growing demand. Based on ${totalOffers} offer(s).`;
  } else {
    return `Point value has decreased by ${change}% over the past 6 months. Based on ${totalOffers} offer(s).`;
  }
}

/**
 * Get complete book analytics (all features combined)
 */
export async function getCompleteBookAnalytics(bookId) {
  try {
    const [pointValueTrend, readingJourney, communityDiscussions] =
      await Promise.all([
        getPointValueTrend(bookId),
        getReadingJourney(bookId),
        getCommunityDiscussions(bookId, 5),
      ]);

    return {
      pointValueTrend,
      readingJourney,
      communityDiscussions,
    };
  } catch (error) {
    console.error("Error getting complete book analytics:", error);
    return {
      pointValueTrend: null,
      readingJourney: null,
      communityDiscussions: null,
    };
  }
}
