import { NextResponse } from "next/server";

// In-memory storage for messages (replace with database in production)
const messageStore = new Map();

/**
 * @swagger
 * /api/socket/messages:
 *   get:
 *     tags:
 *       - Socket Messages
 *     summary: Get chat messages for a specific room
 *     description: Retrieve paginated messages from a chat room
 *     parameters:
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat room
 *         example: room_123
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Maximum number of messages to return
 *         example: 50
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of messages to skip
 *         example: 0
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 roomId:
 *                   type: string
 *                   example: room_123
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ChatMessage'
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 limit:
 *                   type: integer
 *                   example: 50
 *                 offset:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request - roomId is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const limit = parseInt(searchParams.get("limit")) || 50;
    const offset = parseInt(searchParams.get("offset")) || 0;

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 }
      );
    }

    const roomMessages = messageStore.get(roomId) || [];
    const paginatedMessages = roomMessages.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      roomId,
      messages: paginatedMessages,
      total: roomMessages.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/socket/messages:
 *   post:
 *     tags:
 *       - Socket Messages
 *     summary: Send a new chat message
 *     description: Create and store a new message in a chat room (can also be broadcasted via Socket.IO)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - userId
 *               - message
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the chat room
 *                 example: room_123
 *               userId:
 *                 type: string
 *                 description: The ID of the user sending the message
 *                 example: user_456
 *               userName:
 *                 type: string
 *                 description: The name of the user sending the message
 *                 example: John Doe
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: Hello, everyone!
 *     responses:
 *       200:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 **
 * @swagger
 * /api/socket/messages:
 *   delete:
 *     tags:
 *       - Socket Messages
 *     summary: Delete a chat message
 *     description: Remove a specific message from a chat room
 *     parameters:
 *       - in: query
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message to delete
 *         example: msg_1234567890_user_456
 *       - in: query
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat room
 *         example: room_123
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message deleted
 *       400:
 *         description: Bad request - missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */  type: boolean
 *                   example: true
 *                 message:
 *                   $ref: '#/components/schemas/ChatMessage'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { roomId, userId, userName, message } = body;

    if (!roomId || !userId || !message) {
      return NextResponse.json(
        { error: "roomId, userId, and message are required" },
        { status: 400 }
      );
    }

    const messageData = {
      id: `msg_${Date.now()}_${userId}`,
      roomId,
      userId,
      userName: userName || "Anonymous",
      message,
      timestamp: new Date().toISOString(),
    };

    // Store the message
    const roomMessages = messageStore.get(roomId) || [];
    roomMessages.push(messageData);
    messageStore.set(roomId, roomMessages);

    // Here you could emit via Socket.IO if needed
    // const io = getIO();
    // io.to(roomId).emit("message:received", messageData);

    return NextResponse.json({
      success: true,
      message: messageData,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message", details: error.message },
      { status: 500 }
    );
  }
}

// Delete a message
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const messageId = searchParams.get("messageId");
    const roomId = searchParams.get("roomId");

    if (!messageId || !roomId) {
      return NextResponse.json(
        { error: "messageId and roomId are required" },
        { status: 400 }
      );
    }

    const roomMessages = messageStore.get(roomId) || [];
    const filteredMessages = roomMessages.filter((msg) => msg.id !== messageId);
    messageStore.set(roomId, filteredMessages);

    return NextResponse.json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message", details: error.message },
      { status: 500 }
    );
  }
}
