import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { analyzeContent } from "@/utils/forumModeration";

/**
 * GET /api/forums/:id
 * Get a specific thread or comment by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Try to find as thread first
    const thread = await prisma.forumThread.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    });

    if (thread) {
      return NextResponse.json({
        type: "thread",
        data: {
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
                name: thread.author?.name,
                isAnonymous: false,
              },
          book: thread.book,
        },
      });
    }

    // Try to find as comment
    const comment = await prisma.forumComment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        thread: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (comment) {
      return NextResponse.json({
        type: "comment",
        data: {
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
                name: comment.author?.name,
                isAnonymous: false,
              },
          thread: comment.thread,
        },
      });
    }

    return NextResponse.json(
      { error: "Thread or comment not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching forum item:", error);
    return NextResponse.json(
      { error: "Failed to fetch forum item" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/forums/:id
 * Update a thread or comment
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // TODO: Extract userId and isAdmin from JWT token
    const userId = "user-id-from-jwt"; // REPLACE WITH ACTUAL JWT EXTRACTION
    const isAdmin = false; // REPLACE WITH ACTUAL ROLE CHECK

    // Parse request body
    const body = await request.json();
    const { title, content } = body;

    // Try to find as thread
    const thread = await prisma.forumThread.findUnique({
      where: { id },
      select: { id: true, authorId: true, isLocked: true, isModerated: true },
    });

    if (thread) {
      // Check authorization
      if (!isAdmin && thread.authorId !== userId) {
        return NextResponse.json(
          { error: "You can only edit your own threads" },
          { status: 403 }
        );
      }

      if (thread.isModerated) {
        return NextResponse.json(
          { error: "Cannot edit a moderated thread" },
          { status: 403 }
        );
      }

      if (thread.isLocked && !isAdmin) {
        return NextResponse.json(
          { error: "Thread is locked and cannot be edited" },
          { status: 403 }
        );
      }

      // Validation
      if (title !== undefined) {
        if (!title || title.trim().length < 5) {
          return NextResponse.json(
            { error: "Title must be at least 5 characters" },
            { status: 400 }
          );
        }
        if (title.length > 200) {
          return NextResponse.json(
            { error: "Title must be less than 200 characters" },
            { status: 400 }
          );
        }
      }

      if (content !== undefined) {
        if (!content || content.trim().length < 10) {
          return NextResponse.json(
            { error: "Content must be at least 10 characters" },
            { status: 400 }
          );
        }
        if (content.length > 10000) {
          return NextResponse.json(
            { error: "Content must be less than 10,000 characters" },
            { status: 400 }
          );
        }
      }

      // Re-analyze content if changed
      let analysis = null;
      if (title || content) {
        const updatedContent =
          title && content ? `${title}\n\n${content}` : content || title;
        analysis = await analyzeContent(updatedContent);

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
      }

      // Update thread
      const updateData = {};
      if (title) updateData.title = title.trim();
      if (content) updateData.content = content.trim();
      if (analysis) {
        updateData.toxicityScore = analysis.toxicityScore;
        updateData.flaggedByAI = analysis.toxicityScore > 0.7;
        updateData.aiFlags = analysis.flags;
        if (analysis.toxicityScore > 0.9) {
          updateData.isModerated = true;
          updateData.moderationReason =
            "Automatically moderated by AI for violating guidelines";
        }
      }

      const updatedThread = await prisma.forumThread.update({
        where: { id },
        data: updateData,
        include: {
          author: {
            select: { id: true, name: true },
          },
        },
      });

      return NextResponse.json({
        type: "thread",
        data: {
          id: updatedThread.id,
          title: updatedThread.title,
          content: updatedThread.content,
          chapter: updatedThread.chapter,
          tags: updatedThread.tags,
          isPinned: updatedThread.isPinned,
          isLocked: updatedThread.isLocked,
          updatedAt: updatedThread.updatedAt,
          author: updatedThread.isAnonymous
            ? {
                name: updatedThread.authorName,
                isAnonymous: true,
              }
            : {
                id: updatedThread.author?.id,
                name: updatedThread.author?.name,
                isAnonymous: false,
              },
        },
      });
    }

    // Try to find as comment
    const comment = await prisma.forumComment.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        isModerated: true,
        thread: {
          select: { isLocked: true },
        },
      },
    });

    if (comment) {
      // Check authorization
      if (!isAdmin && comment.authorId !== userId) {
        return NextResponse.json(
          { error: "You can only edit your own comments" },
          { status: 403 }
        );
      }

      if (comment.isModerated) {
        return NextResponse.json(
          { error: "Cannot edit a moderated comment" },
          { status: 403 }
        );
      }

      if (comment.thread.isLocked && !isAdmin) {
        return NextResponse.json(
          { error: "Thread is locked and comments cannot be edited" },
          { status: 403 }
        );
      }

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

      // Re-analyze content
      const analysis = await analyzeContent(content);

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

      // Update comment
      const updatedComment = await prisma.forumComment.update({
        where: { id },
        data: {
          content: content.trim(),
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
            select: { id: true, name: true },
          },
        },
      });

      return NextResponse.json({
        type: "comment",
        data: {
          id: updatedComment.id,
          content: updatedComment.content,
          updatedAt: updatedComment.updatedAt,
          author: updatedComment.isAnonymous
            ? {
                name: updatedComment.authorName,
                isAnonymous: true,
              }
            : {
                id: updatedComment.author?.id,
                name: updatedComment.author?.name,
                isAnonymous: false,
              },
        },
      });
    }

    return NextResponse.json(
      { error: "Thread or comment not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error updating forum item:", error);
    return NextResponse.json(
      { error: "Failed to update forum item" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/forums/:id
 * Delete a thread or comment
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // TODO: Extract userId and isAdmin from JWT token
    const userId = "user-id-from-jwt"; // REPLACE WITH ACTUAL JWT EXTRACTION
    const isAdmin = false; // REPLACE WITH ACTUAL ROLE CHECK

    // Try to find as thread
    const thread = await prisma.forumThread.findUnique({
      where: { id },
      select: { id: true, authorId: true, commentCount: true },
    });

    if (thread) {
      // Check authorization
      if (!isAdmin && thread.authorId !== userId) {
        return NextResponse.json(
          { error: "You can only delete your own threads" },
          { status: 403 }
        );
      }

      // Delete thread (CASCADE will delete all comments)
      await prisma.forumThread.delete({
        where: { id },
      });

      return NextResponse.json({
        message: "Thread deleted successfully",
        deletedComments: thread.commentCount,
      });
    }

    // Try to find as comment
    const comment = await prisma.forumComment.findUnique({
      where: { id },
      select: {
        id: true,
        authorId: true,
        threadId: true,
        thread: {
          select: { isLocked: true },
        },
      },
    });

    if (comment) {
      // Check authorization
      if (!isAdmin && comment.authorId !== userId) {
        return NextResponse.json(
          { error: "You can only delete your own comments" },
          { status: 403 }
        );
      }

      if (comment.thread.isLocked && !isAdmin) {
        return NextResponse.json(
          { error: "Thread is locked and comments cannot be deleted" },
          { status: 403 }
        );
      }

      // Count child comments
      const childCount = await prisma.forumComment.count({
        where: { parentId: id },
      });

      // Delete comment and update thread count in transaction
      await prisma.$transaction(async (tx) => {
        // Delete comment (CASCADE will delete child comments)
        await tx.forumComment.delete({
          where: { id },
        });

        // Decrement thread comment count (including child comments)
        await tx.forumThread.update({
          where: { id: comment.threadId },
          data: { commentCount: { decrement: 1 + childCount } },
        });
      });

      return NextResponse.json({
        message: "Comment deleted successfully",
        deletedReplies: childCount,
      });
    }

    return NextResponse.json(
      { error: "Thread or comment not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error deleting forum item:", error);
    return NextResponse.json(
      { error: "Failed to delete forum item" },
      { status: 500 }
    );
  }
}
