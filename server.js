const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// In-memory storage for messages and rooms
const messageStore = new Map();
const roomStore = new Map();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  });

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/api/socket/io",
    addTrailingSlash: false,
  });

  // Socket.IO connection handler
  io.on("connection", (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Join a room
    socket.on("join:room", (roomId) => {
      socket.join(roomId);
      console.log(`📥 Socket ${socket.id} joined room: ${roomId}`);

      // Update room active connections
      const room = roomStore.get(roomId);
      if (room) {
        room.activeConnections = (room.activeConnections || 0) + 1;
        roomStore.set(roomId, room);
      }

      // Notify others in the room
      socket.to(roomId).emit("user:joined", {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });

      // Send room info to the user
      const roomMessages = messageStore.get(roomId) || [];
      socket.emit("room:info", {
        roomId,
        messageCount: roomMessages.length,
        activeUsers: room?.activeConnections || 1,
      });
    });

    // Leave a room
    socket.on("leave:room", (roomId) => {
      socket.leave(roomId);
      console.log(`📤 Socket ${socket.id} left room: ${roomId}`);

      // Update room active connections
      const room = roomStore.get(roomId);
      if (room) {
        room.activeConnections = Math.max((room.activeConnections || 1) - 1, 0);
        roomStore.set(roomId, room);
      }

      // Notify others in the room
      socket.to(roomId).emit("user:left", {
        socketId: socket.id,
        timestamp: new Date().toISOString(),
      });
    });

    // Send a message
    socket.on("message:send", (data) => {
      const { roomId, message, userId, userName } = data;

      if (!roomId || !message || !userId) {
        socket.emit("error", { message: "Missing required fields" });
        return;
      }

      const messageData = {
        id: `msg_${Date.now()}_${socket.id}`,
        roomId,
        userId,
        userName: userName || "Anonymous",
        message,
        timestamp: new Date().toISOString(),
        socketId: socket.id,
      };

      // Store the message
      const roomMessages = messageStore.get(roomId) || [];
      roomMessages.push(messageData);
      messageStore.set(roomId, roomMessages);

      console.log(`💬 Message from ${userName} in room ${roomId}: ${message}`);

      // Broadcast to all clients in the room (including sender)
      io.to(roomId).emit("message:received", messageData);
    });

    // Typing indicators
    socket.on("typing:start", (data) => {
      const { roomId, userId, userName } = data;
      socket.to(roomId).emit("typing:started", {
        userId,
        userName,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("typing:stop", (data) => {
      const { roomId, userId } = data;
      socket.to(roomId).emit("typing:stopped", {
        userId,
        timestamp: new Date().toISOString(),
      });
    });

    // Read receipts
    socket.on("message:read", (data) => {
      const { roomId, messageId, userId } = data;
      socket.to(roomId).emit("message:read:update", {
        messageId,
        userId,
        timestamp: new Date().toISOString(),
      });
    });

    // Get message history
    socket.on("messages:get", (data) => {
      const { roomId, limit = 50, offset = 0 } = data;
      const roomMessages = messageStore.get(roomId) || [];
      const paginatedMessages = roomMessages.slice(
        Math.max(roomMessages.length - offset - limit, 0),
        roomMessages.length - offset
      );

      socket.emit("messages:history", {
        roomId,
        messages: paginatedMessages.reverse(),
        total: roomMessages.length,
      });
    });

    // Handle disconnect
    socket.on("disconnect", (reason) => {
      console.log(`❌ Client disconnected: ${socket.id}, Reason: ${reason}`);

      // Update all room connections
      for (const [roomId, room] of roomStore.entries()) {
        if (room.activeConnections > 0) {
          room.activeConnections--;
          roomStore.set(roomId, room);
        }
      }
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error(`🔴 Socket error for ${socket.id}:`, error);
    });
  });

  // Start server
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Server ready on http://${hostname}:${port}`);
      console.log(`🔌 Socket.IO ready on path: /api/socket/io`);
    });
});
