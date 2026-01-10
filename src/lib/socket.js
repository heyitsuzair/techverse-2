import { Server } from "socket.io";

let io;

export const initSocketServer = (httpServer) => {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle joining a specific chat room
      socket.on("join:room", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room: ${roomId}`);

        // Notify others in the room
        socket.to(roomId).emit("user:joined", {
          socketId: socket.id,
          timestamp: new Date().toISOString(),
        });
      });

      // Handle leaving a room
      socket.on("leave:room", (roomId) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room: ${roomId}`);

        // Notify others in the room
        socket.to(roomId).emit("user:left", {
          socketId: socket.id,
          timestamp: new Date().toISOString(),
        });
      });

      // Handle sending a message
      socket.on("message:send", (data) => {
        const { roomId, message, userId, userName } = data;

        const messageData = {
          id: `msg_${Date.now()}_${socket.id}`,
          roomId,
          userId,
          userName,
          message,
          timestamp: new Date().toISOString(),
          socketId: socket.id,
        };

        console.log(`Message from ${userName} in room ${roomId}:`, message);

        // Broadcast to all clients in the room (including sender)
        io.to(roomId).emit("message:received", messageData);
      });

      // Handle typing indicator
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

      // Handle message read receipts
      socket.on("message:read", (data) => {
        const { roomId, messageId, userId } = data;
        socket.to(roomId).emit("message:read:update", {
          messageId,
          userId,
          timestamp: new Date().toISOString(),
        });
      });

      // Handle disconnect
      socket.on("disconnect", (reason) => {
        console.log(`Client disconnected: ${socket.id}, Reason: ${reason}`);
      });

      // Handle errors
      socket.on("error", (error) => {
        console.error(`Socket error for ${socket.id}:`, error);
      });
    });

    console.log("Socket.IO server initialized");
  }

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO server not initialized");
  }
  return io;
};
