# 🚀 Book Forums Quick Start Guide

Get the forum system up and running in 5 minutes!

## ✅ Prerequisites

- ✅ PostgreSQL database configured
- ✅ Prisma ORM set up
- ✅ Gemini AI API key (optional, has fallback)

## 📦 Installation Steps

### Step 1: Apply Database Migration

```bash
cd /Applications/techverse
npx prisma migrate dev --name add_forum_system
```

This creates the `ForumThread` and `ForumComment` tables.

### Step 2: Verify Migration

```bash
npx prisma studio
```

Check that you now have:
- ✅ `ForumThread` table
- ✅ `ForumComment` table

### Step 3: Test the API

#### Create a Forum Thread

```bash
curl -X POST http://localhost:3000/api/books/YOUR_BOOK_ID/forums \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "What did you think of Chapter 3?",
    "content": "I found the plot twist absolutely surprising!",
    "chapter": "Chapter 3",
    "tags": ["discussion", "spoiler"],
    "isAnonymous": false
  }'
```

#### Get All Threads for a Book

```bash
curl http://localhost:3000/api/books/YOUR_BOOK_ID/forums
```

#### Add a Comment

```bash
curl -X POST http://localhost:3000/api/forums/THREAD_ID/comments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great observation! I noticed that too.",
    "isAnonymous": false
  }'
```

## 🎯 Key Features

| Feature | Endpoint | Description |
|---------|----------|-------------|
| **List Threads** | `GET /api/books/:id/forums` | Get all threads for a book |
| **Create Thread** | `POST /api/books/:id/forums` | Start a new discussion |
| **Get Comments** | `GET /api/forums/:id/comments` | Get threaded comments |
| **Add Comment** | `POST /api/forums/:id/comments` | Reply to a thread |
| **Update** | `PUT /api/forums/:id` | Edit thread/comment |
| **Delete** | `DELETE /api/forums/:id` | Remove thread/comment |

## 🤖 AI Moderation

The system automatically analyzes content for:
- 🚫 **Toxicity** - Insults, hate speech, harassment
- 🗑️ **Spam** - Promotional content, repetitive text
- ⚠️ **Inappropriate** - Adult content, violence
- 📝 **Off-topic** - Unrelated to books

### Toxicity Scores

| Score | Status | Action |
|-------|--------|--------|
| 0.0 - 0.6 | ✅ Safe | Allowed |
| 0.7 - 0.89 | ⚠️ Flagged | Visible but flagged for review |
| 0.9 - 1.0 | 🚫 Blocked | Auto-moderated/rejected |

## 👤 Anonymous Posting

Users can post anonymously:

```javascript
{
  "title": "My theory about the ending",
  "content": "What if...",
  "isAnonymous": true  // 👈 This makes it anonymous
}
```

System generates random names like:
- `Anonymous Reader 4523`
- `Curious Bookworm 7821`
- `Thoughtful Scholar 3456`

## 📁 New Files Created

| File | Purpose |
|------|---------|
| `src/utils/forumModeration.js` | AI content moderation logic |
| `src/app/api/books/[id]/forums/route.js` | List/create threads |
| `src/app/api/forums/[id]/comments/route.js` | List/add comments |
| `src/app/api/forums/[id]/route.js` | Get/update/delete threads/comments |
| `FORUM_SYSTEM.md` | Complete documentation |
| `FORUM_QUICK_START.md` | This guide |

## 🗃️ Database Schema

### ForumThread
- `id`, `bookId`, `authorId` (nullable), `authorName`
- `title`, `content`, `chapter`, `tags[]`
- `isAnonymous`, `isPinned`, `isLocked`, `isModerated`
- `toxicityScore`, `flaggedByAI`, `aiFlags[]`
- `viewCount`, `commentCount`, `likeCount`

### ForumComment
- `id`, `threadId`, `authorId` (nullable), `authorName`
- `content`, `parentId` (for threaded replies)
- `isAnonymous`, `isModerated`
- `toxicityScore`, `flaggedByAI`, `aiFlags[]`
- `likeCount`

## 🔧 Configuration

### Environment Variables

```env
# Required for AI moderation (optional, has fallback)
GEMINI_API_KEY=your_gemini_api_key_here
```

If `GEMINI_API_KEY` is not set:
- System uses basic keyword-based moderation
- Still works, just less intelligent

## 🎨 Frontend Integration

### Display Threads

```javascript
const threads = await fetch(`/api/books/${bookId}/forums?chapter=Chapter%201`)
  .then(res => res.json());

threads.threads.forEach(thread => {
  console.log(thread.title);
  console.log(thread.author.isAnonymous ? '👤 Anonymous' : thread.author.name);
  console.log(`💬 ${thread.commentCount} comments`);
  console.log(`👁️ ${thread.viewCount} views`);
});
```

### Create Thread Form

```javascript
const handleSubmit = async (formData) => {
  const response = await fetch(`/api/books/${bookId}/forums`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: formData.title,
      content: formData.content,
      chapter: formData.chapter,
      tags: formData.tags,
      isAnonymous: formData.postAnonymously
    })
  });

  const thread = await response.json();

  if (thread.moderation.flaggedByAI) {
    alert('Your post has been flagged for review');
  }
};
```

### Display Threaded Comments

```javascript
const CommentTree = ({ comment, depth = 0 }) => (
  <div style={{ marginLeft: depth * 20 + 'px' }}>
    <p>{comment.content}</p>
    <small>
      {comment.author.isAnonymous ? '👤 Anonymous' : comment.author.name}
    </small>
    {comment.replies.map(reply => (
      <CommentTree key={reply.id} comment={reply} depth={depth + 1} />
    ))}
  </div>
);
```

## 🧪 Testing Checklist

- [ ] Run `npx prisma migrate dev --name add_forum_system`
- [ ] Create a test thread (authenticated)
- [ ] Create a test thread (anonymous)
- [ ] Try posting spam to test AI moderation
- [ ] Add comments to a thread
- [ ] Add nested replies (parentId)
- [ ] Edit your own thread
- [ ] Delete your own thread
- [ ] Filter threads by chapter
- [ ] Test pagination

## ⚠️ Important Notes

### JWT Token Placeholder

**IMPORTANT**: The API currently uses placeholder JWT extraction:

```javascript
const userId = "user-id-from-jwt"; // REPLACE WITH ACTUAL JWT EXTRACTION
const isAdmin = false; // REPLACE WITH ACTUAL ROLE CHECK
```

**You MUST replace this with your actual JWT verification logic:**

```javascript
// Example replacement:
import { verifyToken } from '@/lib/auth';

const token = authHeader.replace('Bearer ', '');
const { userId, isAdmin } = verifyToken(token);
```

### CASCADE Deletes

- Deleting a thread also deletes all its comments
- Deleting a comment also deletes all its replies
- This is handled automatically by Prisma

### User Restrictions

If a user has 5+ flagged posts in 30 days:
- They are restricted from creating new threads/comments
- Error: `"Account restricted from posting"`
- Admins must review and clear their history

## 📚 Full Documentation

For complete details, see:
- **[FORUM_SYSTEM.md](./FORUM_SYSTEM.md)** - Full documentation
- **[GEMINI_SETUP.md](./GEMINI_SETUP.md)** - AI setup guide

## 🆘 Troubleshooting

### "Authentication required"
- Check that `Authorization: Bearer <token>` header is present
- Verify JWT token is valid

### "Book not found"
- Use a valid book ID from your database
- Check `Book` table in Prisma Studio

### "Account restricted from posting"
- User has 5+ flagged posts in last 30 days
- Check moderation history:
  ```sql
  SELECT * FROM "ForumThread" WHERE "authorId" = 'user-id' AND "flaggedByAI" = true;
  ```

### AI moderation not working
- Check `GEMINI_API_KEY` is set in `.env`
- System will fallback to basic moderation if key is missing
- Check console logs for Gemini errors

### Comments not nesting properly
- Verify `parentId` is valid comment ID
- Check that parent comment belongs to same thread

## 🎉 You're Ready!

The forum system is now fully functional. Users can:
- ✅ Create discussions for books
- ✅ Organize by chapter
- ✅ Post anonymously
- ✅ Reply to comments (threaded)
- ✅ Have content auto-moderated by AI

Happy coding! 🚀
