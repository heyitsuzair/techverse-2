import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Calculate dynamic book value using Gemini AI
 * Factors: condition, demand, rarity, market value, genre popularity
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

    // Get additional metrics
    const demandScore = await calculateDemandScore(bookId);
    const rarityScore = await calculateRarityScore(book.isbn, book.title);

    // Use Gemini AI for intelligent valuation
    const aiValue = await getGeminiValuation(book, demandScore, rarityScore);

    // Ensure minimum and maximum bounds
    const minPoints = 10;
    const maxPoints = 500;

    return Math.max(minPoints, Math.min(maxPoints, aiValue));
  } catch (error) {
    console.error("Error calculating book value:", error);
    // Fallback to basic calculation if AI fails
    return calculateFallbackValue(book);
  }
}

/**
 * Get book valuation from Gemini AI
 * @param {Object} book - Book object with details
 * @param {number} demandScore - Demand score 0-5
 * @param {number} rarityScore - Rarity score 0-3
 * @returns {Promise<number>} - AI-calculated point value
 */
async function getGeminiValuation(book, demandScore, rarityScore) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not set, using fallback calculation");
      return calculateFallbackValue(book);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a book valuation expert for a book exchange platform. Analyze this book and provide a point value between 10-500.

Book Details:
- Title: ${book.title}
- Author: ${book.author || "Unknown"}
- Genre: ${book.genre || "General"}
- Condition: ${book.condition || "Good"}
- ISBN: ${book.isbn || "N/A"}
- Publication Year: ${book.publicationYear || "Unknown"}
- Description: ${book.description?.substring(0, 200) || "No description"}

Platform Metrics:
- Demand Score: ${demandScore}/5 (based on recent exchange requests)
- Rarity Score: ${rarityScore}/3 (fewer copies = rarer)
- Total Exchange Requests: ${book._count?.exchanges || 0}

Valuation Guidelines:
1. Base value: 50 points
2. Condition impact: New (+50%), Excellent (+30%), Good (0%), Fair (-30%), Poor (-50%)
3. Demand impact: High demand books (+50% max)
4. Rarity impact: Rare books (+60% max)
5. Genre popularity: Popular genres slight bonus
6. Author reputation: Well-known authors slight bonus
7. Publication age: Classic vs recent considerations

Consider:
- Market demand for this genre/author
- Physical condition affecting usability
- Scarcity in the platform
- Educational vs entertainment value
- Collectibility factor

Respond with ONLY a JSON object in this exact format (no markdown, no extra text):
{"points": <number between 10-500>, "reasoning": "<brief 2-3 sentence explanation>"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return Math.round(parsed.points);
    }

    // Fallback if parsing fails
    console.warn("Failed to parse Gemini response, using fallback");
    return calculateFallbackValue(book);
  } catch (error) {
    console.error("Gemini AI valuation error:", error);
    return calculateFallbackValue(book);
  }
}

/**
 * Fallback calculation when AI is unavailable
 * @param {Object} book
 * @returns {number}
 */
function calculateFallbackValue(book) {
  let basePoints = 50;
  const conditionMultiplier = getConditionMultiplier(book.condition);

  // Simple multiplier based on exchange count
  const demandMultiplier = Math.min(
    1.5,
    1 + (book._count?.exchanges || 0) * 0.05
  );

  const finalValue = Math.round(
    basePoints * conditionMultiplier * demandMultiplier
  );
  return Math.max(10, Math.min(500, finalValue));
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
 * Get detailed breakdown of book valuation with Gemini AI reasoning
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

    const demandScore = await calculateDemandScore(bookId);
    const rarityScore = await calculateRarityScore(book.isbn, book.title);

    // Get AI-generated valuation with reasoning
    let aiReasoning = "AI valuation unavailable, using fallback calculation";
    let finalValue = await calculateBookValue(bookId);

    // Try to get detailed reasoning from Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are a book valuation expert for a book exchange platform. Analyze this book and provide a point value between 10-500.

Book Details:
- Title: ${book.title}
- Author: ${book.author || "Unknown"}
- Genre: ${book.genre || "General"}
- Condition: ${book.condition || "Good"}
- ISBN: ${book.isbn || "N/A"}
- Publication Year: ${book.publicationYear || "Unknown"}
- Description: ${book.description?.substring(0, 200) || "No description"}

Platform Metrics:
- Demand Score: ${demandScore}/5 (based on recent exchange requests)
- Rarity Score: ${rarityScore}/3 (fewer copies = rarer)
- Total Exchange Requests: ${book._count?.exchanges || 0}

Valuation Guidelines:
1. Base value: 50 points
2. Condition impact: New (+50%), Excellent (+30%), Good (0%), Fair (-30%), Poor (-50%)
3. Demand impact: High demand books (+50% max)
4. Rarity impact: Rare books (+60% max)
5. Genre popularity: Popular genres slight bonus
6. Author reputation: Well-known authors slight bonus
7. Publication age: Classic vs recent considerations

Respond with ONLY a JSON object in this exact format (no markdown, no extra text):
{"points": <number between 10-500>, "reasoning": "<brief 2-3 sentence explanation>"}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          aiReasoning = parsed.reasoning;
          finalValue = Math.round(parsed.points);
        }
      } catch (error) {
        console.error("Error getting AI reasoning:", error);
      }
    }

    const conditionMultiplier = getConditionMultiplier(book.condition);
    const demandMultiplier = 1 + demandScore * 0.1;
    const rarityMultiplier = 1 + rarityScore * 0.2;

    return {
      bookId,
      bookTitle: book.title,
      finalValue,
      aiReasoning,
      method: process.env.GEMINI_API_KEY ? "gemini-ai" : "fallback",
      breakdown: {
        condition: {
          value: book.condition || "N/A",
          multiplier: conditionMultiplier,
          impact: `${conditionMultiplier >= 1 ? "+" : ""}${Math.round(
            (conditionMultiplier - 1) * 100
          )}%`,
        },
        demand: {
          recentRequests: book._count.exchanges,
          score: `${demandScore}/5`,
          multiplier: demandMultiplier,
          impact: `+${Math.round((demandMultiplier - 1) * 100)}%`,
        },
        rarity: {
          score: `${rarityScore}/3`,
          multiplier: rarityMultiplier,
          impact: `+${Math.round((rarityMultiplier - 1) * 100)}%`,
        },
      },
    };
  } catch (error) {
    console.error("Error getting book value breakdown:", error);
    throw error;
  }
}
