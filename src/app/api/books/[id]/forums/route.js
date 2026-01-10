import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  analyzeContent,
  checkUserModerationHistory,
  generateAnonymousName,
} from "@/utils/forumModeration";

/**
 * GET /api/books/:id/forums
 * Get forum threads for a specific book
 */
export async function GET(request, { params }) {
  try {
    const { id: bookId } = params;
    const { searchParams } = new URL(request.url);

    // Query parameters
    const chapter = searchParams.get("chapter");
    const sortBy = searchParams.get("sortBy") || "latest"; // latest, popular, pinned
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true, title: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Build where clause
    const where = {
      bookId,
      isModerated: false, // Don't show moderated (removed) threads
    };

    if (chapter) {
      where.chapter = chapter;
    }

    // Build orderBy clause
    let orderBy = [];
    if (sortBy === "pinned") {
      orderBy = [{ isPinned: "desc" }, { createdAt: "desc" }];
    } else if (sortBy === "popular") {
      orderBy = [
        { isPinned: "desc" },
        { commentCount: "desc" },
        { likeCount: "desc" },
      ];
    } else {
      // latest
      orderBy = [{ isPinned: "desc" }, { createdAt: "desc" }];
    }

    // Get threads with pagination
    const [threads, totalCount] = await Promise.all([
      prisma.forumThread.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          content: true,
          chapter: true,
          tags: true,
          isAnonymous: true,
          authorName: true,
          authorId: true,
          isPinned: true,
          isLocked: true,
          viewCount: true,
          commentCount: true,
          likeCount: true,
          createdAt: true,
          updatedAt: true,
          // Include author details if not anonymous
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.forumThread.count({ where }),
    ]);

    // Format threads (hide author details for anonymous posts)
    const formattedThreads = threads.map((thread) => ({
      id: thread.id,
      title: thread.title,
      content: thread.content,
      chapter: thread.chapter,
      tags: thread.tags,
      isPinned: thread.isPinned,
      isLocked: thread.isLocked,
      viewCount: thread.viewCount,
      commentCount: thread.commentCount,
      likeCount: thread.likeCount,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      author: thread.isAnonymous
        ? {
            name: thread.authorName,
            isAnonymous: true,
          }
        : {
            id: thread.author?.id,
            name: thread.author?.name || thread.authorName,
            isAnonymous: false,
          },
    }));

    // Get unique chapters for filtering
    const chapters = await prisma.forumThread.findMany({
      where: { bookId, isModerated: false },
      select: { chapter: true },
      distinct: ["chapter"],
    });

    return NextResponse.json({
      threads: formattedThreads,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      book: {
        id: book.id,
        title: book.title,
      },
      filters: {
        availableChapters: chapters
          .map((c) => c.chapter)
          .filter((c) => c !== null)
          .sort(),
      },
    });
  } catch (error) {
    console.error("Error fetching forum threads:", error);
    return NextResponse.json(
      { error: "Failed to fetch forum threads" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books/:id/forums
 * Create a new forum thread
 */
export async function POST(request, { params }) {
  try {
    const { id: bookId } = params;

    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // TODO: Extract userId from JWT token
    // For now, using a placeholder - replace with actual JWT verification
    const userId = "user-id-from-jwt"; // REPLACE WITH ACTUAL JWT EXTRACTION

    // Parse request body
    const body = await request.json();
    const { title, content, chapter, tags, isAnonymous } = body;

    // Validation
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { error: "Title must be at least 5 characters" },
        { status: 400 }
      );
    }

    if (!content || content.trim().length < 10) {
      return NextResponse.json(
        { error: "Content must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: "Title must be less than 200 characters" },
        { status: 400 }
      );
    }

    if (content.length > 10000) {
      return NextResponse.json(
        { error: "Content must be less than 10,000 characters" },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check user's moderation history
    const moderationHistory = await checkUserModerationHistory(userId, prisma);
    if (moderationHistory.shouldRestrict) {
      return NextResponse.json(
        {
          error: "Account restricted from posting",
          reason: moderationHistory.reason,
        },
        { status: 403 }
      );
    }

    // AI Content Analysis
    const combinedContent = `${title}\n\n${content}`;
    const analysis = await analyzeContent(combinedContent);

    // Block if AI determines content should be blocked
    if (analysis.shouldBlock) {
      return NextResponse.json(
        {
          error: "Content violates community guidelines",
          reason: analysis.reason,
          flags: analysis.flags,
        },
        { status: 400 }
      );
    }

    // Determine author name
    const authorName = isAnonymous ? generateAnonymousName() : user.name;

    // Create thread
    const thread = await prisma.forumThread.create({
      data: {
        bookId,
        authorId: isAnonymous ? null : userId,
        authorName,
        isAnonymous: isAnonymous || false,
        title: title.trim(),
        content: content.trim(),
        chapter: chapter || null,
        tags: tags || [],
        toxicityScore: analysis.toxicityScore,
        flaggedByAI: analysis.toxicityScore > 0.7,
        aiFlags: analysis.flags,
        isModerated: analysis.toxicityScore > 0.9, // Auto-moderate very toxic content
        moderationReason:
          analysis.toxicityScore > 0.9
            ? "Automatically moderated by AI for violating guidelines"
            : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Format response
    const response = {
      id: thread.id,
      title: thread.title,
      content: thread.content,
      chapter: thread.chapter,
      tags: thread.tags,
      isPinned: thread.isPinned,
      isLocked: thread.isLocked,
      viewCount: thread.viewCount,
      commentCount: thread.commentCount,
      likeCount: thread.likeCount,
      createdAt: thread.createdAt,
      author: isAnonymous
        ? {
            name: thread.authorName,
            isAnonymous: true,
          }
        : {
            id: thread.author?.id,
            name: thread.author?.name,
            isAnonymous: false,
          },
      moderation: {
        toxicityScore: thread.toxicityScore,
        flaggedByAI: thread.flaggedByAI,
        flags: thread.aiFlags,
        method: analysis.method,
        isModerated: thread.isModerated,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating forum thread:", error);
    return NextResponse.json(
      { error: "Failed to create forum thread" },
      { status: 500 }
    );
  }
}
