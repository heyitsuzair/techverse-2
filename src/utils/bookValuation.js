import { prisma } from "@/lib/prisma";

/**
 * Calculate dynamic book value based on AI algorithm
 * Factors: condition, demand, rarity, wishlist frequency
 *
 * @param {string} bookId - Book ID to evaluate
 * @returns {Promise<number>} - Calculated point value
 */
export async function calculateBookValue(bookId) {
  try {
    // Get book details with related data
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        _count: {
          select: {
            exchanges: true, // How many times requested
          },
        },
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    // Base point value
    let basePoints = 50;

    // 1. CONDITION FACTOR (0.5x - 1.5x multiplier)
    const conditionMultiplier = getConditionMultiplier(book.condition);

    // 2. DEMAND FACTOR (based on exchange requests)
    const demandScore = await calculateDemandScore(bookId);
    const demandMultiplier = 1 + demandScore * 0.1; // +0% to +50%

    // 3. RARITY FACTOR (how many copies exist in system)
    const rarityScore = await calculateRarityScore(book.isbn, book.title);
    const rarityMultiplier = 1 + rarityScore * 0.2; // +0% to +60%

    // 4. WISHLIST FREQUENCY (placeholder for future wishlist feature)
    // const wishlistMultiplier = await calculateWishlistScore(bookId);

    // Calculate final value
    const finalValue = Math.round(
      basePoints *
        conditionMultiplier *
        demandMultiplier *
        rarityMultiplier
    );

    // Ensure minimum and maximum bounds
    const minPoints = 10;
    const maxPoints = 500;

    return Math.max(minPoints, Math.min(maxPoints, finalValue));
  } catch (error) {
    console.error("Error calculating book value:", error);
    // Return default value on error
    return 50;
  }
}

/**
 * Get condition multiplier based on book condition
 * @param {string} condition
 * @returns {number} Multiplier value
 */
function getConditionMultiplier(condition) {
  const conditionMap = {
    new: 1.5,
    excellent: 1.3,
    good: 1.0,
    fair: 0.7,
    poor: 0.5,
  };

  return conditionMap[condition?.toLowerCase()] || 1.0;
}

/**
 * Calculate demand score based on exchange requests
 * @param {string} bookId
 * @returns {Promise<number>} Score from 0-5
 */
async function calculateDemandScore(bookId) {
  try {
    // Count exchanges in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentExchanges = await prisma.exchange.count({
      where: {
        bookId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Score based on recent activity
    if (recentExchanges >= 10) return 5;
    if (recentExchanges >= 7) return 4;
    if (recentExchanges >= 4) return 3;
    if (recentExchanges >= 2) return 2;
    if (recentExchanges >= 1) return 1;
    return 0;
  } catch (error) {
    console.error("Error calculating demand score:", error);
    return 0;
  }
}

/**
 * Calculate rarity score based on availability
 * @param {string} isbn
 * @param {string} title
 * @returns {Promise<number>} Score from 0-3
 */
async function calculateRarityScore(isbn, title) {
  try {
    let availableCount = 0;

    // First try to count by ISBN if available
    if (isbn) {
      availableCount = await prisma.book.count({
        where: {
          isbn,
          isAvailable: true,
        },
      });
    }

    // If no ISBN or no results, search by title
    if (!isbn || availableCount === 0) {
      availableCount = await prisma.book.count({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
          isAvailable: true,
        },
      });
    }

    // Rarity scoring (fewer copies = rarer = higher value)
    if (availableCount === 1) return 3; // Very rare
    if (availableCount === 2) return 2; // Rare
    if (availableCount <= 4) return 1; // Somewhat rare
    return 0; // Common
  } catch (error) {
    console.error("Error calculating rarity score:", error);
    return 0;
  }
}

/**
 * Calculate wishlist score (future feature)
 * @param {string} bookId
 * @returns {Promise<number>} Score from 0-2
 */
async function calculateWishlistScore(bookId) {
  try {
    // Placeholder for wishlist feature
    // const wishlistCount = await prisma.wishlist.count({
    //   where: { bookId }
    // });

    // if (wishlistCount >= 20) return 2;
    // if (wishlistCount >= 10) return 1;
    return 0;
  } catch (error) {
    console.error("Error calculating wishlist score:", error);
    return 0;
  }
}

/**
 * Get detailed breakdown of book valuation
 * @param {string} bookId
 * @returns {Promise<Object>} Valuation breakdown
 */
export async function getBookValueBreakdown(bookId) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        _count: {
          select: {
            exchanges: true,
          },
        },
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    const basePoints = 50;
    const conditionMultiplier = getConditionMultiplier(book.condition);
    const demandScore = await calculateDemandScore(bookId);
    const demandMultiplier = 1 + demandScore * 0.1;
    const rarityScore = await calculateRarityScore(book.isbn, book.title);
    const rarityMultiplier = 1 + rarityScore * 0.2;

    const finalValue = await calculateBookValue(bookId);

    return {
      bookId,
      bookTitle: book.title,
      finalValue,
      breakdown: {
        basePoints,
        condition: {
          value: book.condition || "N/A",
          multiplier: conditionMultiplier,
          impact: Math.round((conditionMultiplier - 1) * 100),
        },
        demand: {
          recentRequests: book._count.exchanges,
          score: demandScore,
          multiplier: demandMultiplier,
          impact: Math.round((demandMultiplier - 1) * 100),
        },
        rarity: {
          score: rarityScore,
          multiplier: rarityMultiplier,
          impact: Math.round((rarityMultiplier - 1) * 100),
        },
      },
      formula:
        "Base × Condition × Demand × Rarity = " +
        `${basePoints} × ${conditionMultiplier} × ${demandMultiplier.toFixed(2)} × ${rarityMultiplier.toFixed(2)} = ${finalValue}`,
    };
  } catch (error) {
    console.error("Error getting book value breakdown:", error);
    throw error;
  }
}
