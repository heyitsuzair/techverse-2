import { Server } from "socket.io";
import { NextResponse } from "next/server";

let io;
let httpServer;

export async function GET(req) {
  if (!io) {
    try {
      // Get the server from the request
      const res = NextResponse.next();

      // For production deployment, Socket.IO needs to be initialized differently
      // This endpoint provides configuration info
      return NextResponse.json({
        success: true,
        message: "Socket.IO server configuration endpoint",
        path: "/api/socket/io",
        instructions:
          "Connect using Socket.IO client with path: '/api/socket/io'",
      });
    } catch (error) {
      console.error("Socket.IO initialization error:", error);
      return NextResponse.json(
        { error: "Failed to initialize Socket.IO", details: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Socket.IO is already running",
    connections: io?.engine?.clientsCount || 0,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, roomId, data } = body;

    // This endpoint can be used to trigger server-side Socket.IO events
    if (!io) {
      return NextResponse.json(
        { error: "Socket.IO not initialized" },
        { status: 503 }
      );
    }

    switch (action) {
      case "broadcast":
        io.to(roomId).emit(data.event, data.payload);
        return NextResponse.json({
          success: true,
          message: "Message broadcasted",
        });

      case "emit":
        io.emit(data.event, data.payload);
        return NextResponse.json({
          success: true,
          message: "Message emitted globally",
        });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Socket.IO POST error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
