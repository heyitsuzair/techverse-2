# 📚 Book Forums & Community System

Complete documentation for the forum and discussion system.

## 📋 Table of Contents
- [Overview](#overview)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [AI Content Moderation](#ai-content-moderation)
- [Anonymous Posting](#anonymous-posting)
- [Usage Examples](#usage-examples)
- [Moderation Guide](#moderation-guide)
- [Testing](#testing)

## 🎯 Overview

The Book Forums & Community system allows users to:
- Create discussion threads for specific books
- Organize discussions by chapter
- Post anonymously
- Reply to comments (threaded discussions)
- Have content automatically moderated by AI
- View, edit, and delete their posts

### Key Features
- **Book-Centric**: All threads are linked to specific books
- **Chapter Organization**: Discuss specific chapters or general topics
- **Anonymous Posting**: Users can post without revealing their identity
- **AI Moderation**: Automatic toxicity detection using Gemini AI
- **Threaded Replies**: Nested comment structure for better conversations
- **Moderation Tools**: Pin, lock, and moderate inappropriate content
- **Statistics**: View counts, comment counts, like counts

## 🗄️ Database Schema

### ForumThread Model

```prisma
model ForumThread {
  id        String   @id @default(uuid())
  bookId    String
  book      Book     @relation(fields: [bookId], references: [id])
  
  // Author (nullable for anonymous posts)
  authorId   String?
  author     User?    @relation(fields: [authorId], references: [id])
  authorName String
  isAnonymous Boolean @default(false)
  
  // Content
  title      String
  content    String
  chapter    String?  // "Chapter 1", "Chapter 5", "General", null
  tags       String[] // ["discussion", "theory", "spoiler"]
  
  // Moderation
  isModerated      Boolean  @default(false)
  isPinned         Boolean  @default(false)
  isLocked         Boolean  @default(false)
  moderatedBy      String?
  moderationReason String?
  
  // AI Content Analysis
  toxicityScore Float   @default(0.0)  // 0.0 - 1.0
  flaggedByAI   Boolean @default(false)
  aiFlags       String[] // ["spam", "toxicity", "inappropriate"]
  
  // Statistics
  viewCount    Int @default(0)
  commentCount Int @default(0)
  likeCount    Int @default(0)
  
  // Relations
  comments ForumComment[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([bookId])
  @@index([authorId])
  @@index([chapter])
  @@index([isModerated])
  @@index([isPinned])
  @@index([flaggedByAI])
  @@index([createdAt])
}
```

### ForumComment Model

```prisma
model ForumComment {
  id        String   @id @default(uuid())
  threadId  String
  thread    ForumThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
  
  // Author (nullable for anonymous posts)
  authorId   String?
  author     User?    @relation(fields: [authorId], references: [id])
  authorName String
  isAnonymous Boolean @default(false)
  
  // Content
  content String
  
  // Nested replies
  parentId String?  // Self-referencing for threaded comments
  
  // Moderation
  isModerated      Boolean @default(false)
  moderatedBy      String?
  moderationReason String?
  
  // AI Content Analysis
  toxicityScore Float   @default(0.0)
  flaggedByAI   Boolean @default(false)
  aiFlags       String[]
  
  // Statistics
  likeCount Int @default(0)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([threadId])
  @@index([authorId])
  @@index([parentId])
  @@index([isModerated])
  @@index([flaggedByAI])
  @@index([createdAt])
}
```

## 🔌 API Endpoints

### 1. Get Forum Threads

**GET** `/api/books/:id/forums`

Get all forum threads for a specific book.

**Query Parameters:**
- `chapter` (string, optional): Filter by chapter
- `sortBy` (string, optional): `latest` | `popular` | `pinned` (default: `latest`)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (default: 20)

**Response:**
```json
{
  "threads": [
    {
      "id": "thread-uuid",
      "title": "What did you think of Chapter 3?",
      "content": "I found the plot twist surprising...",
      "chapter": "Chapter 3",
      "tags": ["discussion", "spoiler"],
      "isPinned": false,
      "isLocked": false,
      "viewCount": 142,
      "commentCount": 23,
      "likeCount": 15,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T14:20:00Z",
      "author": {
        "id": "user-uuid",
        "name": "John Doe",
        "isAnonymous": false
      }
    },
    {
      "id": "thread-uuid-2",
      "title": "Theory about the ending",
      "content": "What if the narrator is unreliable?",
      "chapter": "General",
      "tags": ["theory"],
      "isPinned": true,
      "isLocked": false,
      "viewCount": 521,
      "commentCount": 87,
      "likeCount": 64,
      "createdAt": "2024-01-14T15:00:00Z",
      "updatedAt": "2024-01-16T09:00:00Z",
      "author": {
        "name": "Anonymous Reader 4523",
        "isAnonymous": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  },
  "book": {
    "id": "book-uuid",
    "title": "The Great Gatsby"
  },
  "filters": {
    "availableChapters": ["Chapter 1", "Chapter 2", "Chapter 3", "General"]
  }
}
```

---

### 2. Create Forum Thread

**POST** `/api/books/:id/forums`

Create a new discussion thread for a book.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Request Body:**
```json
{
  "title": "What did you think of Chapter 3?",
  "content": "I found the plot twist absolutely surprising! The way the author revealed...",
  "chapter": "Chapter 3",
  "tags": ["discussion", "spoiler"],
  "isAnonymous": false
}
```

**Field Validation:**
- `title` (required): 5-200 characters
- `content` (required): 10-10,000 characters
- `chapter` (optional): Any string (e.g., "Chapter 1", "General")
- `tags` (optional): Array of strings
- `isAnonymous` (optional): Boolean (default: false)

**Response (201 Created):**
```json
{
  "id": "thread-uuid",
  "title": "What did you think of Chapter 3?",
  "content": "I found the plot twist absolutely surprising...",
  "chapter": "Chapter 3",
  "tags": ["discussion", "spoiler"],
  "isPinned": false,
  "isLocked": false,
  "viewCount": 0,
  "commentCount": 0,
  "likeCount": 0,
  "createdAt": "2024-01-15T10:30:00Z",
  "author": {
    "id": "user-uuid",
    "name": "John Doe",
    "isAnonymous": false
  },
  "moderation": {
    "toxicityScore": 0.05,
    "flaggedByAI": false,
    "flags": [],
    "method": "gemini-ai",
    "isModerated": false
  }
}
```

**Error Responses:**
- `400`: Content violates guidelines, validation error
- `401`: Authentication required
- `403`: Account restricted from posting
- `404`: Book not found

---

### 3. Get Comments

**GET** `/api/forums/:id/comments`

Get all comments for a specific thread (with threaded structure).

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (default: 50)

**Response:**
```json
{
  "comments": [
    {
      "id": "comment-uuid-1",
      "content": "Great observation! I noticed that too.",
      "parentId": null,
      "likeCount": 5,
      "createdAt": "2024-01-15T11:00:00Z",
      "updatedAt": "2024-01-15T11:00:00Z",
      "author": {
        "id": "user-uuid",
        "name": "Jane Smith",
        "isAnonymous": false
      },
      "replies": [
        {
          "id": "comment-uuid-2",
          "content": "Yes! And also notice how...",
          "parentId": "comment-uuid-1",
          "likeCount": 2,
          "createdAt": "2024-01-15T12:30:00Z",
          "updatedAt": "2024-01-15T12:30:00Z",
          "author": {
            "name": "Curious Reader 1234",
            "isAnonymous": true
          },
          "replies": []
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 23,
    "totalPages": 1
  },
  "thread": {
    "id": "thread-uuid",
    "title": "What did you think of Chapter 3?",
    "isLocked": false
  }
}
```

**Special Behaviors:**
- Automatically increments thread `viewCount`
- Returns nested reply structure
- Hides author details for anonymous comments

---

### 4. Create Comment

**POST** `/api/forums/:id/comments`

Add a comment or reply to a thread.

**Headers:**
- `Authorization: Bearer <token>` (required)

**Request Body:**
```json
{
  "content": "Great observation! I noticed that too.",
  "parentId": null,
  "isAnonymous": false
}
```

**Field Validation:**
- `content` (required): 1-5,000 characters
- `parentId` (optional): UUID of parent comment (for replies)
- `isAnonymous` (optional): Boolean (default: false)

**Response (201 Created):**
```json
{
  "id": "comment-uuid",
  "content": "Great observation! I noticed that too.",
  "parentId": null,
  "likeCount": 0,
  "createdAt": "2024-01-15T11:00:00Z",
  "author": {
    "id": "user-uuid",
    "name": "Jane Smith",
    "isAnonymous": false
  },
  "moderation": {
    "toxicityScore": 0.02,
    "flaggedByAI": false,
    "flags": [],
    "method": "gemini-ai",
    "isModerated": false
  }
}
```

**Special Behaviors:**
- Automatically increments thread `commentCount`
- Validates `parentId` belongs to same thread
- Blocked if thread is locked

**Error Responses:**
- `400`: Content violates guidelines, validation error
- `401`: Authentication required
- `403`: Account restricted, thread locked
- `404`: Thread or parent comment not found
- `410`: Thread has been removed

---

### 5. Get Thread/Comment Details

**GET** `/api/forums/:id`

Get details of a specific thread or comment by ID.

**Response (Thread):**
```json
{
  "type": "thread",
  "data": {
    "id": "thread-uuid",
    "title": "What did you think of Chapter 3?",
    "content": "I found the plot twist...",
    "chapter": "Chapter 3",
    "tags": ["discussion"],
    "isPinned": false,
    "isLocked": false,
    "viewCount": 142,
    "commentCount": 23,
    "likeCount": 15,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:20:00Z",
    "author": { ... },
    "book": {
      "id": "book-uuid",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  }
}
```

**Response (Comment):**
```json
{
  "type": "comment",
  "data": {
    "id": "comment-uuid",
    "content": "Great observation!",
    "parentId": null,
    "likeCount": 5,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z",
    "author": { ... },
    "thread": {
      "id": "thread-uuid",
      "title": "What did you think of Chapter 3?"
    }
  }
}
```

---

### 6. Update Thread/Comment

**PUT** `/api/forums/:id`

Update a thread or comment (author or admin only).

**Headers:**
- `Authorization: Bearer <token>` (required)

**Request Body (Thread):**
```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

**Request Body (Comment):**
```json
{
  "content": "Updated comment content"
}
```

**Response:**
```json
{
  "type": "thread",
  "data": {
    "id": "thread-uuid",
    "title": "Updated title",
    "content": "Updated content",
    "updatedAt": "2024-01-15T16:00:00Z",
    "author": { ... }
  }
}
```

**Restrictions:**
- Only author or admin can edit
- Cannot edit moderated content
- Cannot edit if thread is locked (unless admin)
- Content is re-analyzed by AI

**Error Responses:**
- `400`: Validation error, violates guidelines
- `401`: Authentication required
- `403`: Not authorized, thread locked, content moderated
- `404`: Not found

---

### 7. Delete Thread/Comment

**DELETE** `/api/forums/:id`

Delete a thread or comment (author or admin only).

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
```json
{
  "message": "Thread deleted successfully",
  "deletedComments": 23
}
```

or

```json
{
  "message": "Comment deleted successfully",
  "deletedReplies": 3
}
```

**Special Behaviors:**
- Deleting a thread also deletes all its comments (CASCADE)
- Deleting a comment also deletes all its replies (CASCADE)
- Thread `commentCount` is automatically decremented

**Restrictions:**
- Only author or admin can delete
- Cannot delete if thread is locked (unless admin)

**Error Responses:**
- `401`: Authentication required
- `403`: Not authorized, thread locked
- `404`: Not found

## 🤖 AI Content Moderation

The system uses **Gemini AI** to automatically detect and flag inappropriate content.

### How It Works

1. **Content Analysis**: When a thread or comment is created/updated, the content is sent to Gemini AI
2. **Toxicity Scoring**: AI returns a score from 0.0 (safe) to 1.0 (very toxic)
3. **Automatic Flagging**: Content with score > 0.7 is flagged for review
4. **Automatic Blocking**: Content with score > 0.9 is blocked or auto-moderated
5. **Flag Categories**: AI categorizes issues: `spam`, `toxicity`, `inappropriate`, `off-topic`

### Moderation Thresholds

| Toxicity Score | Action | Explanation |
|---------------|--------|-------------|
| 0.0 - 0.6 | ✅ Allowed | Content is safe |
| 0.7 - 0.89 | ⚠️ Flagged | `flaggedByAI = true`, visible but flagged for review |
| 0.9 - 1.0 | 🚫 Blocked/Moderated | `isModerated = true`, content hidden or rejected |

### AI Analysis Response

```javascript
{
  toxicityScore: 0.85,
  flags: ["toxicity", "harassment"],
  shouldBlock: false,
  reason: "Content contains potentially hostile language",
  method: "gemini-ai"
}
```

### Fallback System

If Gemini AI is unavailable:
- System falls back to basic keyword-based moderation
- Checks for common spam patterns
- Detects excessive caps and repetition
- `method: "basic"` in response

### User Moderation History

The system tracks each user's flagged posts:
- Counts flagged threads and comments in last 30 days
- Restricts posting if ≥ 5 flagged posts
- Response: `"Account restricted from posting"`

### Implementation Files

- **src/utils/forumModeration.js**: Core moderation logic
  - `analyzeContent(content)`: Analyze single piece of content
  - `batchAnalyzeContent(contents)`: Analyze multiple items
  - `checkUserModerationHistory(userId, prisma)`: Check user's history
  - `basicModeration(content)`: Fallback keyword detection

## 👤 Anonymous Posting

Users can choose to post threads and comments anonymously.

### How Anonymous Posting Works

1. **Setting Anonymous Mode**: Set `isAnonymous: true` in request body
2. **Author ID**: `authorId` is set to `null` in database
3. **Display Name**: System generates a random name like `"Anonymous Reader 4523"`
4. **Ownership**: Anonymous posts can still be edited/deleted by the creator (using session/JWT)

### Anonymous Name Generation

```javascript
generateAnonymousName()
// Returns: "Curious Bookworm 7821"
// Returns: "Thoughtful Scholar 3456"
// Returns: "Anonymous Reader 9012"
```

Pattern: `[Adjective] [Noun] [4-digit number]`

### Privacy Protection

- Real user ID is NOT stored in database
- Real name is NOT visible in API responses
- User can still manage their own anonymous posts via JWT authentication
- Admins cannot see who made anonymous posts (by design)

### Example API Response

```json
{
  "author": {
    "name": "Mysterious Enthusiast 1234",
    "isAnonymous": true
  }
}
```

vs. authenticated post:

```json
{
  "author": {
    "id": "user-uuid",
    "name": "John Doe",
    "isAnonymous": false
  }
}
```

## 📖 Usage Examples

### Example 1: Creating a Discussion Thread

```javascript
// User wants to discuss Chapter 5
const response = await fetch('/api/books/book-uuid/forums', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'The symbolism in Chapter 5',
    content: 'I noticed that the green light represents...',
    chapter: 'Chapter 5',
    tags: ['analysis', 'symbolism'],
    isAnonymous: false
  })
});

const thread = await response.json();
console.log(thread.moderation.toxicityScore); // 0.03 (safe)
```

### Example 2: Posting an Anonymous Reply

```javascript
// User wants to reply anonymously
const response = await fetch('/api/forums/thread-uuid/comments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'I agree! I also think that...',
    parentId: 'parent-comment-uuid', // For threaded reply
    isAnonymous: true
  })
});

const comment = await response.json();
console.log(comment.author.name); // "Silent Thinker 5678"
console.log(comment.author.isAnonymous); // true
```

### Example 3: Filtering Threads by Chapter

```javascript
// Get all discussions about Chapter 3
const response = await fetch('/api/books/book-uuid/forums?chapter=Chapter%203&sortBy=popular');
const data = await response.json();

console.log(data.threads.length); // Number of threads
console.log(data.filters.availableChapters); // ["Chapter 1", "Chapter 2", "Chapter 3", ...]
```

### Example 4: Editing a Thread

```javascript
// Update thread content
const response = await fetch('/api/forums/thread-uuid', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated: The symbolism in Chapter 5',
    content: 'Updated analysis with more details...'
  })
});

// Content is re-analyzed by AI
const updated = await response.json();
console.log(updated.data.moderation); // New AI analysis
```

## 🛡️ Moderation Guide

### For Admins

#### View Flagged Content

```sql
-- Get all threads flagged by AI
SELECT * FROM "ForumThread" 
WHERE "flaggedByAI" = true 
ORDER BY "toxicityScore" DESC;

-- Get all comments flagged by AI
SELECT * FROM "ForumComment" 
WHERE "flaggedByAI" = true 
ORDER BY "toxicityScore" DESC;
```

#### Moderate a Thread

```javascript
// Admin manually moderates a thread
await prisma.forumThread.update({
  where: { id: 'thread-uuid' },
  data: {
    isModerated: true,
    moderatedBy: 'admin-user-id',
    moderationReason: 'Contains spoilers without warning'
  }
});
```

#### Pin a Thread

```javascript
// Pin important discussion
await prisma.forumThread.update({
  where: { id: 'thread-uuid' },
  data: { isPinned: true }
});
```

#### Lock a Thread

```javascript
// Lock to prevent further comments
await prisma.forumThread.update({
  where: { id: 'thread-uuid' },
  data: { 
    isLocked: true,
    moderationReason: 'Discussion has become unproductive'
  }
});
```

### Moderation Workflow

1. **AI Flags Content** → `flaggedByAI = true`
2. **Admin Reviews** → Check `toxicityScore` and `aiFlags`
3. **Decision**:
   - ✅ Approve: `flaggedByAI = false`
   - ⚠️ Warn User: Keep flagged, message user
   - 🚫 Remove: `isModerated = true`
   - 🔒 Lock Thread: `isLocked = true`

## 🧪 Testing

### Database Migration

First, apply the schema changes:

```bash
npx prisma migrate dev --name add_forum_system
```

### Test Scenarios

#### 1. Test Anonymous Posting

```bash
curl -X POST http://localhost:3000/api/books/BOOK_ID/forums \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Anonymous Thread",
    "content": "This is posted anonymously",
    "isAnonymous": true
  }'

# Verify: authorId should be null, authorName should be generated
```

#### 2. Test AI Moderation

```bash
# Post toxic content
curl -X POST http://localhost:3000/api/books/BOOK_ID/forums \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spam test",
    "content": "BUY NOW! CLICK HERE! FREE MONEY! SPAM SPAM SPAM",
    "isAnonymous": false
  }'

# Expected: toxicityScore > 0.7, flaggedByAI = true, possibly rejected
```

#### 3. Test Threaded Replies

```bash
# Create parent comment
curl -X POST http://localhost:3000/api/forums/THREAD_ID/comments \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content": "Parent comment"}'

# Create nested reply
curl -X POST http://localhost:3000/api/forums/THREAD_ID/comments \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a reply",
    "parentId": "PARENT_COMMENT_ID"
  }'

# Verify: GET /api/forums/THREAD_ID/comments shows nested structure
```

#### 4. Test Chapter Filtering

```bash
# Create threads with different chapters
curl -X POST http://localhost:3000/api/books/BOOK_ID/forums \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Ch1", "content": "Content", "chapter": "Chapter 1"}'

curl -X POST http://localhost:3000/api/books/BOOK_ID/forums \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Ch2", "content": "Content", "chapter": "Chapter 2"}'

# Filter by chapter
curl http://localhost:3000/api/books/BOOK_ID/forums?chapter=Chapter%201

# Verify: Only Chapter 1 threads returned
```

#### 5. Test CASCADE Deletes

```bash
# Create thread with comments
# Delete thread
curl -X DELETE http://localhost:3000/api/forums/THREAD_ID \
  -H "Authorization: Bearer TOKEN"

# Verify: All comments are also deleted from database
```

### Manual Testing Checklist

- [ ] Create thread (authenticated)
- [ ] Create thread (anonymous)
- [ ] AI flags toxic content
- [ ] AI blocks extremely toxic content (score > 0.9)
- [ ] Post comment
- [ ] Post nested reply (parentId)
- [ ] Edit own thread
- [ ] Edit own comment
- [ ] Delete own thread (CASCADE deletes comments)
- [ ] Delete own comment (CASCADE deletes replies)
- [ ] Cannot edit others' posts
- [ ] Cannot edit locked thread (unless admin)
- [ ] Filter threads by chapter
- [ ] Sort threads (latest, popular, pinned)
- [ ] Pagination works correctly
- [ ] View count increments
- [ ] Comment count increments/decrements
- [ ] User with 5+ flagged posts gets restricted

## 🚀 Next Steps

### Recommended Enhancements

1. **Like/Unlike Functionality**
   - Add endpoints: `POST /api/forums/:id/like`, `DELETE /api/forums/:id/like`
   - Track users who liked (many-to-many relation)
   - Update `likeCount` accordingly

2. **Search Functionality**
   - Full-text search within threads
   - Search by tags, chapter, author

3. **Notifications**
   - Notify when someone replies to your comment
   - Email digests of popular discussions
   - @mention notifications

4. **User Reputation**
   - Award points for helpful posts
   - Display reputation badges
   - Trust score affects moderation

5. **Rich Text Support**
   - Markdown formatting
   - Code blocks for technical discussions
   - Spoiler tags

6. **Report System Integration**
   - Allow users to report inappropriate posts
   - Link to existing Report model
   - Admin review dashboard

7. **Forum Analytics**
   - Most active threads
   - Top contributors
   - Trending topics

8. **Mobile App Support**
   - Push notifications
   - Offline reading
   - Better mobile UI

## 📚 Related Documentation

- [EXCHANGE_SYSTEM_COMPLETE.md](./EXCHANGE_SYSTEM_COMPLETE.md) - Book exchange system
- [ANTI_ABUSE_SYSTEM.md](./ANTI_ABUSE_SYSTEM.md) - Anti-abuse and reporting
- [GEMINI_SETUP.md](./GEMINI_SETUP.md) - Gemini AI integration guide
- [swagger-config.js](./src/lib/swagger/config.js) - API documentation

## ⚙️ Configuration

### Environment Variables

```env
# Gemini AI (for content moderation)
GEMINI_API_KEY=your_gemini_api_key_here

# Database
DATABASE_URL=postgresql://...
```

### Feature Flags

You can disable certain features in production:

```javascript
// In .env or config file
FORUM_ALLOW_ANONYMOUS=true
FORUM_AI_MODERATION=true
FORUM_AUTO_BLOCK_TOXIC=true
FORUM_AUTO_MODERATE_THRESHOLD=0.9
```

---

**Last Updated**: January 2024  
**Version**: 1.0.0  
**Status**: ✅ Complete and Ready for Production
