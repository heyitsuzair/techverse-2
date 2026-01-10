import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  analyzeContent,
  checkUserModerationHistory,
  generateAnonymousName,
} from "@/utils/forumModeration";

/**
 * GET /api/forums/:id/comments
 * Get comments for a forum thread
 */
export async function GET(request, { params }) {
  try {
    const { id: threadId } = params;
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Check if thread exists
    const thread = await prisma.forumThread.findUnique({
      where: { id: threadId },
      select: { id: true, title: true, isLocked: true, isModerated: true },
    });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    if (thread.isModerated) {
      return NextResponse.json(
        { error: "Thread has been removed by moderators" },
        { status: 410 }
      );
    }

    // Increment view count
    await prisma.forumThread.update({
      where: { id: threadId },
      data: { viewCount: { increment: 1 } },
    });

    // Get comments with pagination
    const [comments, totalCount] = await Promise.all([
      prisma.forumComment.findMany({
        where: {
          threadId,
          isModerated: false,
        },
        orderBy: { createdAt: "asc" },
        skip,
        take: limit,
        select: {
          id: true,
          content: true,
          parentId: true,
          isAnonymous: true,
          authorName: true,
          authorId: true,
          likeCount: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.forumComment.count({
        where: { threadId, isModerated: false },
      }),
    ]);

    // Build threaded structure
    const commentMap = new Map();
    const rootComments = [];

    // First pass: create comment objects
    comments.forEach((comment) => {
      const formattedComment = {
        id: comment.id,
        content: comment.content,
        parentId: comment.parentId,
        likeCount: comment.likeCount,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: comment.isAnonymous
          ? {
              name: comment.authorName,
              isAnonymous: true,
            }
          : {
              id: comment.author?.id,
              name: comment.author?.name || comment.authorName,
              isAnonymous: false,
            },
        replies: [],
      };

      commentMap.set(comment.id, formattedComment);

      if (!comment.parentId) {
        rootComments.push(formattedComment);
      }
    });

    // Second pass: build reply tree
    comments.forEach((comment) => {
      if (comment.parentId && commentMap.has(comment.parentId)) {
        const parent = commentMap.get(comment.parentId);
        const child = commentMap.get(comment.id);
        parent.replies.push(child);
      }
    });

    return NextResponse.json({
      comments: rootComments,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      thread: {
        id: thread.id,
        title: thread.title,
        isLocked: thread.isLocked,
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/forums/:id/comments
 * Add a comment or reply to a forum thread
 */
export async function POST(request, { params }) {
  try {
    const { id: threadId } = params;

    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // TODO: Extract userId from JWT token
    const userId = "user-id-from-jwt"; // REPLACE WITH ACTUAL JWT EXTRACTION

    // Parse request body
    const body = await request.json();
    const { content, parentId, isAnonymous } = body;

    // Validation
    if (!content || content.trim().length < 1) {
      return NextResponse.json(
        { error: "Content cannot be empty" },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Content must be less than 5,000 characters" },
        { status: 400 }
      );
    }

    // Check if thread exists and is not locked
    const thread = await prisma.forumThread.findUnique({
      where: { id: threadId },
      select: { id: true, isLocked: true, isModerated: true },
    });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    if (thread.isModerated) {
      return NextResponse.json(
        { error: "Thread has been removed by moderators" },
        { status: 410 }
      );
    }

    if (thread.isLocked) {
      return NextResponse.json(
        { error: "Thread is locked and cannot accept new comments" },
        { status: 403 }
      );
    }

    // If parentId provided, check if parent comment exists
    if (parentId) {
      const parentComment = await prisma.forumComment.findUnique({
        where: { id: parentId },
        select: { id: true, threadId: true },
      });

      if (!parentComment) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }

      if (parentComment.threadId !== threadId) {
        return NextResponse.json(
          { error: "Parent comment does not belong to this thread" },
          { status: 400 }
        );
      }
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
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
    const analysis = await analyzeContent(content);

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

    // Create comment and update thread comment count in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create comment
      const comment = await tx.forumComment.create({
        data: {
          threadId,
          authorId: isAnonymous ? null : userId,
          authorName,
          isAnonymous: isAnonymous || false,
          content: content.trim(),
          parentId: parentId || null,
          toxicityScore: analysis.toxicityScore,
          flaggedByAI: analysis.toxicityScore > 0.7,
          aiFlags: analysis.flags,
          isModerated: analysis.toxicityScore > 0.9,
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

      // Increment thread comment count
      await tx.forumThread.update({
        where: { id: threadId },
        data: { commentCount: { increment: 1 } },
      });

      return comment;
    });

    // Format response
    const response = {
      id: result.id,
      content: result.content,
      parentId: result.parentId,
      likeCount: result.likeCount,
      createdAt: result.createdAt,
      author: isAnonymous
        ? {
            name: result.authorName,
            isAnonymous: true,
          }
        : {
            id: result.author?.id,
            name: result.author?.name,
            isAnonymous: false,
          },
      moderation: {
        toxicityScore: result.toxicityScore,
        flaggedByAI: result.flaggedByAI,
        flags: result.aiFlags,
        method: analysis.method,
        isModerated: result.isModerated,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
