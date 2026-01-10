# Socket.IO Chat API Documentation

## Overview

This is a complete backend-only Socket.IO implementation for real-time chat messaging in Next.js App Router.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install socket.io socket.io-client
# or
yarn add socket.io socket.io-client
```

### 2. Update package.json

Add the following script to run with the custom server:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

### 3. Start the Server

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:3000` with Socket.IO available at `/api/socket/io`

---

## Socket.IO Events

### Client → Server Events

#### 1. **join:room**

Join a chat room to start receiving messages.

**Payload:**

```javascript
socket.emit("join:room", "room_123");
```

**Response:**

- Emits `user:joined` to other users in the room
- Emits `room:info` back to the client

---

#### 2. **leave:room**

Leave a chat room.

**Payload:**

```javascript
socket.emit("leave:room", "room_123");
```

**Response:**

- Emits `user:left` to other users in the room

---

#### 3. **message:send**

Send a message to a room.

**Payload:**

```javascript
socket.emit("message:send", {
  roomId: "room_123",
  userId: "user_456",
  userName: "John Doe",
  message: "Hello, everyone!",
});
```

**Response:**

- Broadcasts `message:received` to all users in the room (including sender)

---

#### 4. **typing:start**

Indicate that user is typing.

**Payload:**

```javascript
socket.emit("typing:start", {
  roomId: "room_123",
  userId: "user_456",
  userName: "John Doe",
});
```

**Response:**

- Emits `typing:started` to other users in the room

---

#### 5. **typing:stop**

Indicate that user stopped typing.

**Payload:**

```javascript
socket.emit("typing:stop", {
  roomId: "room_123",
  userId: "user_456",
});
```

**Response:**

- Emits `typing:stopped` to other users in the room

---

#### 6. **message:read**

Mark a message as read.

**Payload:**

```javascript
socket.emit("message:read", {
  roomId: "room_123",
  messageId: "msg_123",
  userId: "user_456",
});
```

**Response:**

- Emits `message:read:update` to other users in the room

---

#### 7. **messages:get**

Retrieve message history for a room.

**Payload:**

```javascript
socket.emit("messages:get", {
  roomId: "room_123",
  limit: 50,
  offset: 0,
});
```

**Response:**

- Emits `messages:history` back to the client

---

### Server → Client Events

#### 1. **user:joined**

Notification when a user joins the room.

**Payload:**

```javascript
{
  socketId: "abc123",
  timestamp: "2026-01-10T12:00:00.000Z"
}
```

---

#### 2. **user:left**

Notification when a user leaves the room.

**Payload:**

```javascript
{
  socketId: "abc123",
  timestamp: "2026-01-10T12:00:00.000Z"
}
```

---

#### 3. **message:received**

Receive a new message.

**Payload:**

```javascript
{
  id: "msg_1234567890_abc123",
  roomId: "room_123",
  userId: "user_456",
  userName: "John Doe",
  message: "Hello, everyone!",
  timestamp: "2026-01-10T12:00:00.000Z",
  socketId: "abc123"
}
```

---

#### 4. **typing:started**

Notification when someone starts typing.

**Payload:**

```javascript
{
  userId: "user_456",
  userName: "John Doe",
  timestamp: "2026-01-10T12:00:00.000Z"
}
```

---

#### 5. **typing:stopped**

Notification when someone stops typing.

**Payload:**

```javascript
{
  userId: "user_456",
  timestamp: "2026-01-10T12:00:00.000Z"
}
```

---

#### 6. **message:read:update**

Notification when a message is read.

**Payload:**

```javascript
{
  messageId: "msg_123",
  userId: "user_456",
  timestamp: "2026-01-10T12:00:00.000Z"
}
```

---

#### 7. **room:info**

Room information sent when joining.

**Payload:**

```javascript
{
  roomId: "room_123",
  messageCount: 42,
  activeUsers: 5
}
```

---

#### 8. **messages:history**

Message history response.

**Payload:**

```javascript
{
  roomId: "room_123",
  messages: [...],
  total: 100
}
```

---

## REST API Endpoints

### Messages API

#### GET `/api/socket/messages?roomId=room_123&limit=50&offset=0`

Retrieve messages for a room via HTTP.

**Response:**

```json
{
  "success": true,
  "roomId": "room_123",
  "messages": [...],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

---

#### POST `/api/socket/messages`

Store a message via HTTP.

**Body:**

```json
{
  "roomId": "room_123",
  "userId": "user_456",
  "userName": "John Doe",
  "message": "Hello!"
}
```

**Response:**

```json
{
  "success": true,
  "message": {
    "id": "msg_123",
    "roomId": "room_123",
    "userId": "user_456",
    "userName": "John Doe",
    "message": "Hello!",
    "timestamp": "2026-01-10T12:00:00.000Z"
  }
}
```

---

#### DELETE `/api/socket/messages?messageId=msg_123&roomId=room_123`

Delete a message.

**Response:**

```json
{
  "success": true,
  "message": "Message deleted"
}
```

---

### Rooms API

#### GET `/api/socket/rooms`

Get all rooms.

**Response:**

```json
{
  "success": true,
  "rooms": [...],
  "total": 10
}
```

---

#### GET `/api/socket/rooms?roomId=room_123`

Get a specific room.

**Response:**

```json
{
  "success": true,
  "room": {
    "id": "room_123",
    "name": "General Chat",
    "description": "Main chat room",
    "createdBy": "user_456",
    "createdAt": "2026-01-10T12:00:00.000Z",
    "activeConnections": 5
  }
}
```

---

#### POST `/api/socket/rooms`

Create a new room.

**Body:**

```json
{
  "name": "General Chat",
  "description": "Main chat room",
  "createdBy": "user_456"
}
```

**Response:**

```json
{
  "success": true,
  "room": {
    "id": "room_1736510400000",
    "name": "General Chat",
    "description": "Main chat room",
    "createdBy": "user_456",
    "createdAt": "2026-01-10T12:00:00.000Z",
    "activeConnections": 0
  }
}
```

---

#### PUT `/api/socket/rooms`

Update room information.

**Body:**

```json
{
  "roomId": "room_123",
  "name": "Updated Room Name",
  "description": "Updated description"
}
```

---

#### DELETE `/api/socket/rooms?roomId=room_123`

Delete a room.

**Response:**

```json
{
  "success": true,
  "message": "Room deleted"
}
```

---

## Testing with Socket.IO Client

You can test the API using the Socket.IO client:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/api/socket/io",
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // Join a room
  socket.emit("join:room", "room_123");

  // Send a message
  socket.emit("message:send", {
    roomId: "room_123",
    userId: "user_456",
    userName: "Test User",
    message: "Hello from Socket.IO!",
  });
});

// Listen for messages
socket.on("message:received", (data) => {
  console.log("New message:", data);
});
```

---

## Production Considerations

1. **Database Integration**: Replace in-memory storage (Map) with a real database (MongoDB, PostgreSQL, etc.)

2. **Authentication**: Add authentication middleware to verify users before allowing connections

3. **Rate Limiting**: Implement rate limiting to prevent spam

4. **Scaling**: Use Redis adapter for Socket.IO when running multiple server instances

5. **Persistence**: Store messages and rooms in a database for persistence

6. **Security**:
   - Validate all input data
   - Implement proper CORS settings
   - Use HTTPS in production
   - Implement room access control

---

## Architecture

```
server.js (Custom Server with Socket.IO)
├── Socket.IO Server
│   ├── Connection Handler
│   ├── Room Management
│   ├── Message Broadcasting
│   └── Event Listeners
│
└── Next.js App Router
    └── /api/socket/
        ├── io/route.js (Config endpoint)
        ├── messages/route.js (Message CRUD)
        └── rooms/route.js (Room CRUD)
```

---

## Notes

- Messages are stored in memory and will be lost on server restart
- For production, integrate with a database
- The Socket.IO path is `/api/socket/io`
- Default port is 3000 (configurable via PORT environment variable)
