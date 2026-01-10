import { NextResponse } from "next/server";

// In-memory storage for rooms (replace with database in production)
const roomStore = new Map();

// Get all rooms or a specific room
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (roomId) {
      const room = roomStore.get(roomId);
      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        room,
      });
    }

    // Return all rooms
    const rooms = Array.from(roomStore.values());
    return NextResponse.json({
      success: true,
      rooms,
      total: rooms.length,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms", details: error.message },
      { status: 500 }
    );
  }
}

// Create a new room
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, createdBy } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Room name is required" },
        { status: 400 }
      );
    }

    const roomId = `room_${Date.now()}`;
    const room = {
      id: roomId,
      name,
      description: description || "",
      createdBy: createdBy || "system",
      createdAt: new Date().toISOString(),
      participants: [],
      activeConnections: 0,
    };

    roomStore.set(roomId, room);

    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room", details: error.message },
      { status: 500 }
    );
  }
}

// Update room information
export async function PUT(req) {
  try {
    const body = await req.json();
    const { roomId, name, description } = body;

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 }
      );
    }

    const room = roomStore.get(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    if (name) room.name = name;
    if (description !== undefined) room.description = description;
    room.updatedAt = new Date().toISOString();

    roomStore.set(roomId, room);

    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room", details: error.message },
      { status: 500 }
    );
  }
}

// Delete a room
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required" },
        { status: 400 }
      );
    }

    const deleted = roomStore.delete(roomId);
    if (!deleted) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Room deleted",
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: error.message },
      { status: 500 }
    );
  }
}
