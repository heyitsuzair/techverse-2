# Database Schema Update - Books & Exchanges

## 📋 Overview

Updated the database schema to include:
- ✅ Books model for user-listed books
- ✅ Exchanges model for book exchange transactions
- ✅ Enhanced location with address, latitude, and longitude
- ✅ User statistics (books listed, total exchanges, current points)

## 🗄️ Database Schema

### User Model (Updated)
```prisma
model User {
  id           String  @id @default(uuid())
  email        String  @unique
  password     String?
  name         String
  phone        String?
  profileImage String?
  points       Int     @default(100)
  bio          String?
  
  // Location (NEW)
  locationAddress String?
  locationLat     Float?
  locationLng     Float?

  // OAuth
  googleId      String? @unique
  emailVerified Boolean @default(false)

  // Password Reset
  resetPasswordToken   String?
  resetPasswordExpires DateTime?

  // Relations (NEW)
  books     Book[]
  exchanges Exchange[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([googleId])
}
```

### Book Model (NEW)
```prisma
model Book {
  id          String  @id @default(uuid())
  title       String
  author      String?
  isbn        String?
  description String?
  coverImage  String?
  genre       String?
  condition   String? // "New", "Like New", "Good", "Fair"
  language    String? @default("English")
  
  // Availability
  isAvailable Boolean @default(true)
  
  // Owner
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Relations
  exchanges Exchange[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([isbn])
  @@index([isAvailable])
}
```

### Exchange Model (NEW)
```prisma
model Exchange {
  id     String @id @default(uuid())
  status String @default("pending") // "pending", "accepted", "completed", "cancelled"
  
  // Book being exchanged
  bookId String
  book   Book   @relation(fields: [bookId], references: [id], onDelete: Cascade)
  
  // Users involved
  requesterId String
  requester   User   @relation(fields: [requesterId], references: [id], onDelete: Cascade)
  
  // Exchange details
  message        String?
  meetingAddress String?
  meetingLat     Float?
  meetingLng     Float?
  scheduledAt    DateTime?
  completedAt    DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([bookId])
  @@index([requesterId])
  @@index([status])
}
```

## 🚀 Migration Required

Run the migration to apply changes:

```bash
cd /Applications/techverse
npx prisma migrate dev --name add_books_exchanges_location
npx prisma generate
```

## 📡 API Updates

### 1. GET /api/auth/me (Updated)
Get current authenticated user with statistics.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc456",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "points": 100,
    "profileImage": "https://...",
    "bio": "Book lover",
    "locationAddress": "123 Main St, New York, NY 10001",
    "locationLat": 40.7128,
    "locationLng": -74.006,
    "booksListed": 5,
    "totalExchanges": 3,
    "currentPoints": 100,
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T12:00:00.000Z"
  }
}
```

### 2. PUT /api/users/me (Updated)
Update user profile with new location fields.

**Request (Form Data):**
- `name` - User's name
- `email` - User's email
- `phone` - Phone number
- `bio` - Bio/description
- `locationAddress` - Full address (NEW)
- `locationLat` - Latitude (NEW)
- `locationLng` - Longitude (NEW)
- `profileImage` - Profile image file

**Example:**
```javascript
const formData = new FormData();
formData.append('name', 'Jane Smith');
formData.append('bio', 'Book enthusiast');
formData.append('locationAddress', '456 Market St, San Francisco, CA 94103');
formData.append('locationLat', '37.7749');
formData.append('locationLng', '-122.4194');

await fetch('/api/users/me', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "...",
    "email": "...",
    "name": "Jane Smith",
    "locationAddress": "456 Market St, San Francisco, CA 94103",
    "locationLat": 37.7749,
    "locationLng": -122.4194,
    "booksListed": 5,
    "totalExchanges": 3,
    "currentPoints": 100,
    ...
  }
}
```

### 3. GET /api/users/{id} (Updated)
Get public user profile with statistics.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc456",
    "name": "John Doe",
    "profileImage": "https://...",
    "bio": "Book lover",
    "locationAddress": "123 Main St, New York, NY 10001",
    "locationLat": 40.7128,
    "locationLng": -74.006,
    "booksListed": 5,
    "totalExchanges": 3,
    "currentPoints": 100,
    "points": 100,
    "createdAt": "2026-01-10T10:00:00.000Z"
  }
}
```

**Note:** Email and phone are NOT included in public profiles.

### 4. Removed: GET /api/users/me
This endpoint has been removed as it duplicated `/api/auth/me`.

**Use `/api/auth/me` instead for getting current user profile.**

## 📊 User Statistics

All user endpoints now return:

1. **booksListed** - Total number of books the user has listed
2. **totalExchanges** - Total number of completed exchanges
3. **currentPoints** - Current points balance

These are calculated dynamically:
- `booksListed`: Count of books in `Book` table where `userId` matches
- `totalExchanges`: Count of exchanges in `Exchange` table where `requesterId` matches and `status = "completed"`
- `currentPoints`: Current value of `points` field

## 🗺️ Location Fields

### Before (Simple String)
```json
{
  "location": "New York, USA"
}
```

### After (Structured Location)
```json
{
  "locationAddress": "123 Main St, New York, NY 10001",
  "locationLat": 40.7128,
  "locationLng": -74.006
}
```

### Benefits:
- ✅ Store full address for display
- ✅ Store coordinates for map integration
- ✅ Calculate distances between users
- ✅ Find nearby book exchanges
- ✅ Show users on a map

## 🔗 Relationships

### User → Books (One-to-Many)
- One user can list many books
- Books are deleted when user is deleted (cascade)
- Query: `user.books` or `Book.where({ userId })`

### User → Exchanges (One-to-Many)
- One user can have many exchanges (as requester)
- Exchanges track book exchange requests
- Query: `user.exchanges` or `Exchange.where({ requesterId })`

### Book → Exchanges (One-to-Many)
- One book can have many exchange requests
- Exchanges are deleted when book is deleted (cascade)
- Query: `book.exchanges` or `Exchange.where({ bookId })`

## 📝 Usage Examples

### Example 1: Update Location
```javascript
const formData = new FormData();
formData.append('locationAddress', '789 Broadway, New York, NY 10003');
formData.append('locationLat', '40.7300');
formData.append('locationLng', '-73.9900');

const response = await fetch('/api/users/me', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

const data = await response.json();
console.log(data.user.locationAddress); // "789 Broadway, New York, NY 10003"
console.log(data.user.locationLat);     // 40.73
console.log(data.user.locationLng);     // -73.99
```

### Example 2: Get User Statistics
```javascript
const response = await fetch('/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const data = await response.json();
console.log(`Books Listed: ${data.user.booksListed}`);
console.log(`Total Exchanges: ${data.user.totalExchanges}`);
console.log(`Current Points: ${data.user.currentPoints}`);
```

### Example 3: Query Books by User (Prisma)
```javascript
// Get all books by a user
const books = await prisma.book.findMany({
  where: { userId: 'user-id-here' },
  include: { user: true }
});

// Get available books only
const availableBooks = await prisma.book.findMany({
  where: { 
    userId: 'user-id-here',
    isAvailable: true 
  }
});
```

### Example 4: Query Exchanges (Prisma)
```javascript
// Get completed exchanges by user
const exchanges = await prisma.exchange.findMany({
  where: { 
    requesterId: 'user-id-here',
    status: 'completed'
  },
  include: { 
    book: true,
    requester: true
  }
});

// Get pending exchanges for a book
const pendingExchanges = await prisma.exchange.findMany({
  where: { 
    bookId: 'book-id-here',
    status: 'pending'
  }
});
```

## 🎯 Key Changes Summary

### Added:
- ✅ `Book` model with full book details
- ✅ `Exchange` model with exchange workflow
- ✅ `locationAddress`, `locationLat`, `locationLng` fields
- ✅ User statistics in API responses (booksListed, totalExchanges)
- ✅ Cascade delete for books and exchanges

### Removed:
- ❌ `location` (single string field)
- ❌ GET `/api/users/me` endpoint (use `/api/auth/me` instead)

### Updated:
- ✅ GET `/api/auth/me` - Returns statistics
- ✅ PUT `/api/users/me` - Accepts new location fields
- ✅ GET `/api/users/{id}` - Returns statistics
- ✅ Swagger documentation updated

## 📚 Next Steps

### 1. Run Migration
```bash
npx prisma migrate dev --name add_books_exchanges_location
npx prisma generate
```

### 2. Test API Endpoints
- Test `/api/auth/me` with Bearer token
- Test `/api/users/me` PUT with new location fields
- Test `/api/users/{id}` for public profiles

### 3. Integrate Location Picker
In your frontend:
- Use Google Maps/Mapbox for address autocomplete
- Get lat/lng from selected address
- Send all three fields (address, lat, lng) together

### 4. Build Book Listing API
Next steps for books:
- POST `/api/books` - List a new book
- GET `/api/books` - Get all books (with filters)
- GET `/api/books/{id}` - Get book details
- PUT `/api/books/{id}` - Update book
- DELETE `/api/books/{id}` - Remove book

### 5. Build Exchange API
Next steps for exchanges:
- POST `/api/exchanges` - Request an exchange
- GET `/api/exchanges` - Get user's exchanges
- PUT `/api/exchanges/{id}` - Accept/complete/cancel
- GET `/api/exchanges/{id}` - Get exchange details

## ✅ Deliverables Complete

- ✅ Books schema created with user relation
- ✅ Exchanges schema created with user and book relations
- ✅ Location split into address, lat, lng
- ✅ User statistics (booksListed, totalExchanges, currentPoints)
- ✅ All APIs updated to return statistics
- ✅ Removed duplicate GET /api/users/me endpoint
- ✅ Swagger documentation updated
- ✅ Complete migration-ready schema

## 🔍 API Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/auth/me` | ✅ | Get current user + stats |
| PUT | `/api/users/me` | ✅ | Update profile + location |
| GET | `/api/users/{id}` | ❌ | Public profile + stats |

**Statistics Included:**
- `booksListed` - Count of user's books
- `totalExchanges` - Count of completed exchanges
- `currentPoints` - Current points balance

**Location Fields:**
- `locationAddress` - Full street address
- `locationLat` - Latitude coordinate
- `locationLng` - Longitude coordinate
