import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Analyze content for toxicity, spam, and inappropriate content
 * Uses Gemini AI for intelligent content moderation
 */
export async function analyzeContent(content) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not set, using basic moderation");
      return basicModeration(content);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a content moderator for a book discussion forum. Analyze this content for:
1. Toxicity (insults, hate speech, harassment)
2. Spam (promotional content, repetitive text)
3. Inappropriate content (adult content, violence, illegal activity)
4. Off-topic content (completely unrelated to books/reading)

Content to analyze:
"${content}"

Respond with ONLY a JSON object (no markdown, no extra text):
{
  "toxicityScore": <number 0.0-1.0>,
  "flags": [<array of strings like "spam", "toxicity", "inappropriate", "off-topic">],
  "shouldBlock": <boolean>,
  "reason": "<brief explanation if should block>"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        toxicityScore: parsed.toxicityScore || 0.0,
        flags: parsed.flags || [],
        shouldBlock: parsed.shouldBlock || false,
        reason: parsed.reason || null,
        method: "gemini-ai",
      };
    }

    // Fallback if parsing fails
    console.warn("Failed to parse Gemini response, using basic moderation");
    return basicModeration(content);
  } catch (error) {
    console.error("Gemini AI moderation error:", error);
    return basicModeration(content);
  }
}

/**
 * Basic moderation fallback (keyword-based)
 */
function basicModeration(content) {
  const lowerContent = content.toLowerCase();
  const flags = [];
  let toxicityScore = 0.0;

  // Basic toxic keywords
  const toxicKeywords = ["spam", "scam", "click here", "buy now", "free money"];
  const foundToxic = toxicKeywords.filter((word) =>
    lowerContent.includes(word)
  );

  if (foundToxic.length > 0) {
    toxicityScore = Math.min(1.0, foundToxic.length * 0.3);
    if (lowerContent.includes("spam") || lowerContent.includes("click here")) {
      flags.push("spam");
    }
    if (foundToxic.length >= 3) {
      flags.push("toxicity");
    }
  }

  // Check for excessive caps (shouting)
  const capsRatio =
    (content.match(/[A-Z]/g) || []).length / Math.max(content.length, 1);
  if (capsRatio > 0.5 && content.length > 20) {
    flags.push("spam");
    toxicityScore += 0.2;
  }

  // Check for excessive repetition
  const words = content.split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
    flags.push("spam");
    toxicityScore += 0.3;
  }

  return {
    toxicityScore: Math.min(1.0, toxicityScore),
    flags: [...new Set(flags)],
    shouldBlock: toxicityScore >= 0.7,
    reason: toxicityScore >= 0.7 ? "Content flagged by basic moderation" : null,
    method: "basic",
  };
}

/**
 * Batch analyze multiple content items
 */
export async function batchAnalyzeContent(contents) {
  const results = await Promise.all(
    contents.map((content) => analyzeContent(content))
  );
  return results;
}

/**
 * Check if user has too many flagged posts (anti-spam)
 */
export async function checkUserModerationHistory(userId, prisma) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Count flagged threads
    const flaggedThreads = await prisma.forumThread.count({
      where: {
        authorId: userId,
        flaggedByAI: true,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Count flagged comments
    const flaggedComments = await prisma.forumComment.count({
      where: {
        authorId: userId,
        flaggedByAI: true,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    const totalFlagged = flaggedThreads + flaggedComments;

    return {
      flaggedThreads,
      flaggedComments,
      totalFlagged,
      shouldRestrict: totalFlagged >= 5, // 5+ flagged posts in 30 days
      reason:
        totalFlagged >= 5
          ? `User has ${totalFlagged} flagged posts in the last 30 days`
          : null,
    };
  } catch (error) {
    console.error("Error checking user moderation history:", error);
    return { totalFlagged: 0, shouldRestrict: false, reason: null };
  }
}

/**
 * Generate anonymous display name
 */
export function generateAnonymousName() {
  const adjectives = [
    "Anonymous",
    "Curious",
    "Thoughtful",
    "Avid",
    "Passionate",
    "Silent",
    "Mysterious",
    "Devoted",
    "Eager",
    "Wise",
  ];
  const nouns = [
    "Reader",
    "Bookworm",
    "Scholar",
    "Bibliophile",
    "Enthusiast",
    "Explorer",
    "Seeker",
    "Learner",
    "Thinker",
    "Observer",
  ];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 9999);

  return `${randomAdj} ${randomNoun} ${randomNum}`;
}
