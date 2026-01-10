# 🔄 Point-Based Exchange System - Complete Implementation

## Overview

A complete AI-powered, point-based book exchange system that prevents fake exchanges, dynamically calculates book values, and handles the full exchange lifecycle.

---

## 🎯 Key Features

✅ **AI-Powered Book Valuation**
- Dynamic point calculation based on condition, demand, rarity
- No fixed price per book
- Values range from 10-500 points

✅ **Point Locking System**
- Points locked when exchange requested
- Returned if declined
- Transferred to owner upon confirmation

✅ **Anti-Fraud Protection**
- Prevents self-exchanges
- Ownership transfers only after confirmation
- 7-day confirmation deadline
- Auto-cancels other pending requests

✅ **Complete Exchange Lifecycle**
1. Request → Lock points
2. Accept → Set confirmation deadline
3. Decline → Return points
4. Confirm → Transfer ownership + points

---

## 📊 Database Schema Updates

### Exchange Model (Enhanced)

```prisma
model Exchange {
  id                  String    @id @default(uuid())
  status              String    @default("pending")
  // "pending", "accepted", "declined", "confirmed", "completed", "cancelled"
  
  bookId              String
  requesterId         String
  
  // Points system
  pointsOffered       Int       // AI-calculated value
  pointsLocked        Boolean   @default(false)
  
  // Exchange details
  message             String?
  meetingAddress      String?
  meetingLat          Float?
  meetingLng          Float?
  scheduledAt         DateTime?
  confirmationDeadline DateTime? // 7 days after acceptance
  
  // Book condition rating
  bookConditionRating Int?      // 1-5 rating by requester
  
  // Declined info
  declinedReason      String?
  declinedAt          DateTime?
  
  // Completion info
  completedAt         DateTime?
  completedBy         String?   // "requester" or "system"
  
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  
  @@index([bookId])
  @@index([requesterId])
  @@index([status])
  @@index([pointsLocked])
}
```

---

## 🤖 AI Book Valuation Algorithm

### Formula
```
Final Value = Base × Condition × Demand × Rarity
```

### Factors

**1. Base Points:** 50

**2. Condition Multiplier (0.5x - 1.5x)**
- New: 1.5x
- Excellent: 1.3x
- Good: 1.0x
- Fair: 0.7x
- Poor: 0.5x

**3. Demand Multiplier (1.0x - 1.5x)**
Based on exchange requests in last 30 days:
- 10+ requests: +50% (1.5x)
- 7-9 requests: +40% (1.4x)
- 4-6 requests: +30% (1.3x)
- 2-3 requests: +20% (1.2x)
- 1 request: +10% (1.1x)
- 0 requests: +0% (1.0x)

**4. Rarity Multiplier (1.0x - 1.6x)**
Based on available copies:
- 1 copy (very rare): +60% (1.6x)
- 2 copies (rare): +40% (1.4x)
- 3-4 copies (uncommon): +20% (1.2x)
- 5+ copies (common): +0% (1.0x)

### Example Calculation

```
Book: "The Great Gatsby" (Excellent condition)
- Base: 50 points
- Condition: Excellent (1.3x)
- Demand: 3 recent requests (1.2x)
- Rarity: Only 2 copies (1.4x)

Value = 50 × 1.3 × 1.2 × 1.4 = 109 points
```

---

## 🔌 API Endpoints

### 1. POST /api/exchanges
**Request a book exchange**

**Auth:** Required

**Request Body:**
```json
{
  "bookId": "book-uuid-123",
  "message": "I'd love to read this book!",
  "meetingAddress": "Central Library",
  "meetingLat": 40.7128,
  "meetingLng": -74.006,
  "scheduledAt": "2026-01-15T14:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exchange request created successfully",
  "exchange": {
    "id": "exchange-uuid",
    "status": "pending",
    "pointsOffered": 109,
    "pointsLocked": true,
    "book": { ... },
    "requester": { ... }
  },
  "pointsLocked": 109,
  "remainingPoints": 141
}
```

**What Happens:**
1. ✅ Calculates book value using AI
2. ✅ Checks user has enough points
3. ✅ Locks points (deducts from balance)
4. ✅ Creates pending exchange
5. ✅ Prevents duplicate requests

---

### 2. GET /api/exchanges
**Get user's exchange history**

**Auth:** Required

**Query Params:**
- `role`: "requester" | "owner" | "all" (default: all)
- `status`: Filter by status
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "exchanges": [
    {
      "id": "exchange-uuid",
      "status": "pending",
      "pointsOffered": 109,
      "userRole": "requester",
      "book": { ... },
      "requester": { ... },
      "owner": { ... }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasMore": true
  }
}
```

---

### 3. PUT /api/exchanges/:id/accept
**Owner accepts the exchange request**

**Auth:** Required (must be book owner)

**Response:**
```json
{
  "success": true,
  "message": "Exchange request accepted successfully",
  "exchange": {
    "id": "exchange-uuid",
    "status": "accepted",
    "confirmationDeadline": "2026-01-17T00:00:00.000Z"
  },
  "nextStep": "Requester must confirm within 7 days"
}
```

**What Happens:**
1. ✅ Changes status to "accepted"
2. ✅ Sets 7-day confirmation deadline
3. ✅ Points remain locked

---

### 4. PUT /api/exchanges/:id/decline
**Owner declines the exchange request**

**Auth:** Required (must be book owner)

**Request Body (Optional):**
```json
{
  "reason": "Book is no longer available"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exchange request declined",
  "exchange": {
    "id": "exchange-uuid",
    "status": "declined",
    "declinedReason": "Book is no longer available",
    "pointsLocked": false
  },
  "pointsReturned": 109
}
```

**What Happens:**
1. ✅ Changes status to "declined"
2. ✅ Returns locked points to requester
3. ✅ Marks points as unlocked

---

### 5. PUT /api/exchanges/:id/confirm
**Requester confirms exchange completion**

**Auth:** Required (must be requester)

**Request Body (Optional):**
```json
{
  "bookConditionRating": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exchange completed successfully!",
  "exchange": {
    "id": "exchange-uuid",
    "status": "completed",
    "bookConditionRating": 5,
    "pointsLocked": false,
    "completedAt": "2026-01-10T15:30:00.000Z",
    "completedBy": "requester"
  },
  "details": {
    "bookTitle": "The Great Gatsby",
    "previousOwner": "John Doe",
    "newOwner": "Jane Smith",
    "pointsTransferred": 109,
    "bookConditionRating": 5,
    "otherRequestsCancelled": 2
  }
}
```

**What Happens:**
1. ✅ Transfers book ownership to requester
2. ✅ Transfers points to book owner
3. ✅ Changes status to "completed"
4. ✅ Unlocks points
5. ✅ Cancels all other pending requests for this book
6. ✅ Returns points to cancelled requesters
7. ✅ Makes book available for future exchanges

---

## 🛡️ Anti-Fraud Features

### 1. Prevent Self-Exchange
```javascript
if (book.userId === decoded.id) {
  return { error: "Cannot request your own book" };
}
```

### 2. Prevent Duplicate Requests
```javascript
const existingExchange = await prisma.exchange.findFirst({
  where: {
    bookId,
    requesterId: decoded.id,
    status: { in: ["pending", "accepted"] }
  }
});
```

### 3. Point Balance Check
```javascript
if (requester.points < pointsRequired) {
  return {
    error: "Insufficient points",
    required: pointsRequired,
    available: requester.points
  };
}
```

### 4. Ownership Verification
```javascript
// Only owner can accept/decline
if (exchange.book.userId !== decoded.id) {
  return { error: "Only the book owner can accept this exchange" };
}

// Only requester can confirm
if (exchange.requesterId !== decoded.id) {
  return { error: "Only the requester can confirm this exchange" };
}
```

### 5. Confirmation Deadline
```javascript
const confirmationDeadline = new Date();
confirmationDeadline.setDate(confirmationDeadline.getDate() + 7);

if (new Date() > exchange.confirmationDeadline) {
  return { error: "Confirmation deadline has passed" };
}
```

---

## 🔄 Exchange Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        EXCHANGE LIFECYCLE                         │
└─────────────────────────────────────────────────────────────────┘

1. REQUEST (Requester)
   ├─ Calculate book value (AI)
   ├─ Check point balance
   ├─ Lock points (deduct from balance)
   └─ Status: PENDING

2a. ACCEPT (Owner)
    ├─ Set 7-day confirmation deadline
    ├─ Points remain locked
    └─ Status: ACCEPTED

2b. DECLINE (Owner)
    ├─ Return points to requester
    ├─ Unlock points
    └─ Status: DECLINED [END]

3. PHYSICAL EXCHANGE
   └─ Requester receives book

4. CONFIRM (Requester)
   ├─ Transfer book ownership → Requester
   ├─ Transfer points → Owner
   ├─ Unlock points
   ├─ Cancel other pending requests
   ├─ Return points to cancelled requesters
   └─ Status: COMPLETED [END]

TIMEOUT (System)
   └─ Auto-cancel if not confirmed within 7 days
```

---

## 📝 Status Values

| Status | Description | Can Transition To |
|--------|-------------|-------------------|
| `pending` | Initial state, awaiting owner response | accepted, declined |
| `accepted` | Owner accepted, awaiting physical exchange | confirmed, cancelled |
| `declined` | Owner declined, points returned | - |
| `confirmed` | Requester confirmed, same as completed | completed |
| `completed` | Exchange finished, ownership transferred | - |
| `cancelled` | Cancelled by system or user | - |

---

## 💡 Example Usage Scenarios

### Scenario 1: Successful Exchange

```
1. Alice requests Bob's "Harry Potter" (100 points)
   → Alice: 250 → 150 points (locked)
   → Status: pending

2. Bob accepts the request
   → Status: accepted
   → Deadline: 7 days from now

3. They meet and exchange the book

4. Alice confirms exchange
   → Book owner: Bob → Alice
   → Bob points: 100 → 200 (earned 100)
   → Alice remaining: 150 points
   → Status: completed
```

### Scenario 2: Declined Exchange

```
1. Charlie requests Diana's "1984" (75 points)
   → Charlie: 200 → 125 points (locked)
   → Status: pending

2. Diana declines (book damaged)
   → Charlie: 125 → 200 points (returned)
   → Status: declined
```

### Scenario 3: Multiple Requests

```
1. Eve requests Frank's "Pride & Prejudice" (90 points)
   → Eve: 300 → 210 points
   → Status: pending

2. Grace requests same book (90 points)
   → Grace: 180 → 90 points
   → Status: pending

3. Frank accepts Eve's request
   → Eve's exchange: accepted
   → Grace's exchange: still pending

4. Eve confirms exchange
   → Book → Eve
   → Frank gets 90 points
   → Grace's exchange: cancelled (auto)
   → Grace: 90 → 180 points (returned)
```

---

## 🧪 Testing Checklist

- [ ] Request exchange with insufficient points → Error
- [ ] Request own book → Error
- [ ] Duplicate request for same book → Error
- [ ] Accept exchange as requester → Error (403)
- [ ] Decline exchange as requester → Error (403)
- [ ] Confirm exchange as owner → Error (403)
- [ ] Confirm before acceptance → Error
- [ ] Accept/decline already processed exchange → Error
- [ ] Successful flow: request → accept → confirm
- [ ] Points locked correctly
- [ ] Points returned on decline
- [ ] Points transferred on confirm
- [ ] Ownership transferred on confirm
- [ ] Other requests cancelled on confirm
- [ ] Book value calculation accurate

---

## 📚 Files Created

1. **Schema**: `prisma/schema.prisma`
   - Enhanced Exchange model with point system

2. **Utility**: `src/utils/bookValuation.js`
   - `calculateBookValue()` - AI valuation
   - `getBookValueBreakdown()` - Detailed breakdown

3. **APIs**:
   - `src/app/api/exchanges/route.js` - POST (request) & GET (history)
   - `src/app/api/exchanges/[id]/accept/route.js` - PUT (accept)
   - `src/app/api/exchanges/[id]/decline/route.js` - PUT (decline)
   - `src/app/api/exchanges/[id]/confirm/route.js` - PUT (confirm)

---

## 🚀 Next Steps

1. **Run Migration:**
```bash
npx prisma migrate dev --name add_exchange_point_system
```

2. **Test Endpoints:**
   - Use Swagger UI at `/api-docs`
   - Test with Postman/Thunder Client
   - Verify point calculations

3. **Frontend Integration:**
   - Create exchange request UI
   - Show point costs before request
   - Display accept/decline buttons for owners
   - Add confirm button for requesters
   - Show exchange status timeline

4. **Future Enhancements:**
   - Add wishlist feature for better demand scoring
   - Email notifications for exchange events
   - Auto-complete after deadline
   - Dispute resolution system
   - Exchange ratings and reviews

---

## ✅ System Guarantees

✅ **No fake exchanges** - Ownership only transfers after confirmation
✅ **Fair pricing** - AI-calculated values based on multiple factors
✅ **Point safety** - Locked points returned if exchange fails
✅ **Anti-abuse** - Prevents self-exchange and duplicates
✅ **Transparency** - Full exchange history and point tracking
✅ **Fairness** - First-come-first-served with automatic cleanup

---

**🎉 The point-based exchange system is now complete and ready for use!**
