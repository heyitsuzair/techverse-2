# Books & Marketplace API Documentation

Complete API for book listing, discovery, and exchange functionality with QR code generation.

## 📋 Overview

**Endpoints:**
- GET `/api/books` - Get all books (marketplace) with filters
- POST `/api/books` - Create new book listing (Protected)
- GET `/api/books/:id` - Get book details
- PUT `/api/books/:id` - Update book (Protected)
- DELETE `/api/books/:id` - Delete book (Protected)
- POST `/api/books/:id/history` - Add book history/scan (Protected)
- GET `/api/books/:id/history` - Get book history

## 🗄️ Updated Database Schema

### Book Model (Updated)
```prisma
model Book {
  id          String  @id @default(uuid())
  title       String
  author      String?
  isbn        String?
  description String?
  coverImage  String?
  qrCodeUrl   String? // NEW: QR code image URL
  genre       String?
  condition   String? // "new", "excellent", "good", "fair", "poor"
  language    String? @default("English")
  pointValue  Int     @default(10) // NEW: Points for exchange
  
  // Location (NEW)
  locationAddress String?
  locationLat     Float?
  locationLng     Float?
  
  // Availability
  isAvailable Boolean @default(true)
  
  // Owner
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Relations
  exchanges   Exchange[]
  bookHistory BookHistory[] // NEW
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
  @@index([isbn])
  @@index([isAvailable])
  @@index([genre]) // NEW
}

model BookHistory { // NEW
  id       String  @id @default(uuid())
  bookId   String
  book     Book    @relation(fields: [bookId], references: [id], onDelete: Cascade)
  userId   String
  action   String  // "scanned", "noted", "exchanged", "read", "reviewed"
  notes    String?
  location String?
  
  createdAt DateTime @default(now())
  
  @@index([bookId])
  @@index([userId])
}
```

## 🚀 Migration Required

```bash
npx prisma migrate dev --name add_books_qr_history
npx prisma generate
```

## 📡 API Endpoints

### 1. GET /api/books (Marketplace)
Get all available books with filtering and pagination.

**Query Parameters:**
- `genre` - Filter by genre
- `condition` - Filter by condition
- `location` - Search in location address
- `search` - Search in title, author, description
- `userId` - Filter by book owner
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "books": [
    {
      "id": "book-uuid",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "description": "A classic American novel...",
      "coverImage": "https://res.cloudinary.com/...",
      "qrCodeUrl": "https://res.cloudinary.com/.../qr_book-uuid.png",
      "genre": "Fiction",
      "condition": "good",
      "language": "English",
      "pointValue": 10,
      "locationAddress": "New York, NY",
      "locationLat": 40.7128,
      "locationLng": -74.006,
      "isAvailable": true,
      "userId": "user-uuid",
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "profileImage": "https://...",
        "locationAddress": "New York, NY"
      },
      "_count": {
        "exchanges": 2
      },
      "createdAt": "2026-01-10T10:00:00.000Z",
      "updatedAt": "2026-01-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

**Example Usage:**
```javascript
// Get all fiction books
const response = await fetch('/api/books?genre=Fiction&page=1&limit=20');

// Search books
const response = await fetch('/api/books?search=gatsby');

// Filter by location
const response = await fetch('/api/books?location=New+York');

// Get user's books
const response = await fetch('/api/books?userId=user-uuid');
```

---

### 2. POST /api/books (Create Book)
Create a new book listing with automatic QR code generation.

**Authentication:** Required (Bearer token)

**Request (Form Data):**
- `title` (required) - Book title
- `author` - Author name
- `isbn` - ISBN number
- `description` - Book description
- `genre` (required) - Book genre
- `condition` (required) - Book condition (new, excellent, good, fair, poor)
- `language` - Language (default: English)
- `pointValue` - Points value (default: 10)
- `locationAddress` - Book location address
- `locationLat` - Latitude
- `locationLng` - Longitude
- `coverImage` (File) - Cover image

**Response:**
```json
{
  "success": true,
  "message": "Book listed successfully",
  "book": {
    "id": "book-uuid",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "qrCodeUrl": "https://res.cloudinary.com/book-qr-codes/qr_book-uuid.png",
    "coverImage": "https://res.cloudinary.com/book-covers/...",
    "genre": "Fiction",
    "condition": "good",
    "pointValue": 10,
    "isAvailable": true,
    "user": {
      "id": "user-uuid",
      "name": "John Doe",
      "profileImage": "https://...",
      "locationAddress": "New York, NY"
    },
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T10:00:00.000Z"
  }
}
```

**Example Usage:**
```javascript
const formData = new FormData();
formData.append('title', 'The Great Gatsby');
formData.append('author', 'F. Scott Fitzgerald');
formData.append('genre', 'Fiction');
formData.append('condition', 'good');
formData.append('description', 'Classic American novel');
formData.append('pointValue', '10');
formData.append('locationAddress', 'New York, NY');
formData.append('locationLat', '40.7128');
formData.append('locationLng', '-74.006');
formData.append('coverImage', fileInput.files[0]);

const response = await fetch('/api/books', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**QR Code Features:**
- ✅ Automatically generated on book creation
- ✅ Uploaded to Cloudinary (book-qr-codes folder)
- ✅ URL saved in database
- ✅ Contains link to `/qr-scan/:bookId`
- ✅ 400x400 pixels, high quality

---

### 3. GET /api/books/:id (Book Details)
Get detailed information about a specific book.

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "book": {
    "id": "book-uuid",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "description": "A classic American novel...",
    "coverImage": "https://...",
    "qrCodeUrl": "https://...",
    "genre": "Fiction",
    "condition": "good",
    "language": "English",
    "pointValue": 10,
    "locationAddress": "New York, NY",
    "locationLat": 40.7128,
    "locationLng": -74.006,
    "isAvailable": true,
    "userId": "user-uuid",
    "user": {
      "id": "user-uuid",
      "name": "John Doe",
      "profileImage": "https://...",
      "locationAddress": "New York, NY",
      "points": 150
    },
    "bookHistory": [
      {
        "id": "history-uuid",
        "action": "scanned",
        "notes": "Found at Central Library",
        "location": "New York, NY",
        "createdAt": "2026-01-10T11:00:00.000Z"
      }
    ],
    "_count": {
      "exchanges": 2,
      "bookHistory": 5
    },
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T12:00:00.000Z"
  }
}
```

---

### 4. PUT /api/books/:id (Update Book)
Update book details (owner only).

**Authentication:** Required (Bearer token)

**Request (Form Data):**
Same as POST, all fields optional. Only book owner can update.

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "book": { /* updated book object */ }
}
```

**Example Usage:**
```javascript
const formData = new FormData();
formData.append('condition', 'excellent');
formData.append('isAvailable', 'true');
formData.append('pointValue', '15');

const response = await fetch(`/api/books/${bookId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

### 5. DELETE /api/books/:id (Delete Book)
Delete a book (owner only).

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

**Cleanup:**
- ✅ Deletes book from database
- ✅ Cascade deletes exchanges
- ✅ Cascade deletes book history
- ✅ Deletes cover image from Cloudinary
- ✅ Deletes QR code from Cloudinary

---

### 6. POST /api/books/:id/history (Add History)
Add a history entry for a book (QR scan, notes, etc.).

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "action": "scanned",  // Required: scanned, noted, exchanged, read, reviewed
  "notes": "Found this book at Central Library",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "success": true,
  "message": "History entry added successfully",
  "history": {
    "id": "history-uuid",
    "bookId": "book-uuid",
    "userId": "user-uuid",
    "action": "scanned",
    "notes": "Found this book at Central Library",
    "location": "New York, NY",
    "createdAt": "2026-01-10T11:00:00.000Z"
  }
}
```

**Valid Actions:**
- `scanned` - Book QR code scanned
- `noted` - User added a note
- `exchanged` - Book exchanged hands
- `read` - User read the book
- `reviewed` - User reviewed the book

---

### 7. GET /api/books/:id/history (Get History)
Get all history entries for a book.

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "id": "history-uuid",
      "bookId": "book-uuid",
      "userId": "user-uuid",
      "action": "scanned",
      "notes": "Found at Central Library",
      "location": "New York, NY",
      "createdAt": "2026-01-10T11:00:00.000Z"
    }
  ],
  "total": 5
}
```

---

## 📝 Usage Examples

### Example 1: Browse Marketplace
```javascript
// Get all fiction books in good condition
const response = await fetch(
  '/api/books?genre=Fiction&condition=good&page=1&limit=10'
);
const data = await response.json();
console.log(`Found ${data.pagination.total} books`);
```

### Example 2: Create Book with Cover Image
```javascript
const formData = new FormData();
formData.append('title', 'Harry Potter and the Philosopher\'s Stone');
formData.append('author', 'J.K. Rowling');
formData.append('genre', 'Fantasy');
formData.append('condition', 'excellent');
formData.append('description', 'First book in the series');
formData.append('isbn', '978-0-439-70818-8');
formData.append('pointValue', '15');
formData.append('language', 'English');
formData.append('coverImage', coverImageFile);

const response = await fetch('/api/books', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

const data = await response.json();
console.log('QR Code URL:', data.book.qrCodeUrl);
```

### Example 3: Scan QR Code
```javascript
// User scans QR code, which redirects to /qr-scan/:bookId
// Then add history entry
const response = await fetch(`/api/books/${bookId}/history`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'scanned',
    notes: 'Found this book at Starbucks!',
    location: 'San Francisco, CA'
  })
});
```

### Example 4: Update Book Availability
```javascript
const formData = new FormData();
formData.append('isAvailable', 'false'); // Mark as unavailable

const response = await fetch(`/api/books/${bookId}`, {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### Example 5: Search Books Near Me
```javascript
const response = await fetch(
  '/api/books?location=San+Francisco&limit=20'
);
const data = await response.json();

// Further filter by distance using lat/lng
const nearbyBooks = data.books.filter(book => {
  if (!book.locationLat || !book.locationLng) return false;
  const distance = calculateDistance(
    myLat, myLng,
    book.locationLat, book.locationLng
  );
  return distance < 10; // Within 10 miles
});
```

---

## 🎨 QR Code Generation

### How It Works
1. User creates a book listing
2. API generates QR code via QR Server API
3. QR code contains URL: `{APP_URL}/qr-scan/{bookId}`
4. QR code uploaded to Cloudinary (book-qr-codes folder)
5. URL saved to `book.qrCodeUrl`

### QR Code URL Format
```
https://res.cloudinary.com/{cloud}/book-qr-codes/qr_{bookId}.png
```

### QR Code Content
```
https://yourdomain.com/qr-scan/book-uuid-here
```

### Display QR Code
```javascript
<img src={book.qrCodeUrl} alt="Book QR Code" />
```

### Print QR Code
```javascript
const printQR = () => {
  const printWindow = window.open(book.qrCodeUrl);
  printWindow.print();
};
```

---

## 🔍 Filtering & Search

### Genre Filter
```javascript
const genres = [
  "Fiction", "Non-Fiction", "Mystery", "Romance", 
  "Science Fiction", "Fantasy", "Biography", "History",
  "Self-Help", "Children's Books", "Poetry", "Thriller"
];

const response = await fetch(`/api/books?genre=${genre}`);
```

### Condition Filter
```javascript
const conditions = [
  "new", "excellent", "good", "fair", "poor"
];

const response = await fetch(`/api/books?condition=${condition}`);
```

### Combined Filters
```javascript
const response = await fetch(
  `/api/books?genre=Fiction&condition=good&location=New+York&search=gatsby&page=1&limit=10`
);
```

---

## 📊 Book Statistics

Each book includes:
- `_count.exchanges` - Number of exchange requests
- `_count.bookHistory` - Number of history entries
- `pointValue` - Points required for exchange
- `isAvailable` - Current availability status

---

## 🔒 Security & Permissions

### Public Endpoints
- GET `/api/books` - Anyone can browse
- GET `/api/books/:id` - Anyone can view details
- GET `/api/books/:id/history` - Anyone can view history

### Protected Endpoints (Require JWT)
- POST `/api/books` - Create book
- PUT `/api/books/:id` - Update (owner only)
- DELETE `/api/books/:id` - Delete (owner only)
- POST `/api/books/:id/history` - Add history entry

### Ownership Check
```javascript
// Only book owner can update/delete
if (book.userId !== decoded.id) {
  return NextResponse.json(
    { error: "You don't have permission" },
    { status: 403 }
  );
}
```

---

## ✅ Deliverables Complete

- ✅ GET `/api/books` - Marketplace with filters
- ✅ POST `/api/books` - Create book with QR generation
- ✅ GET `/api/books/:id` - Book details
- ✅ PUT `/api/books/:id` - Update book
- ✅ DELETE `/api/books/:id` - Delete book with cleanup
- ✅ POST `/api/books/:id/history` - Add scan/note
- ✅ GET `/api/books/:id/history` - Get history
- ✅ QR code auto-generation and Cloudinary upload
- ✅ Cover image upload to Cloudinary
- ✅ Location tracking (address, lat, lng)
- ✅ Point value system
- ✅ Complete filtering and search
- ✅ Pagination support
- ✅ Ownership validation
- ✅ Cascade delete with cleanup

---

## 🚀 Next Steps

### 1. Run Migration
```bash
npx prisma migrate dev --name add_books_qr_history
npx prisma generate
```

### 2. Test Endpoints
Use Swagger UI at `/api-docs` or test manually:
```bash
# Get all books
curl http://localhost:3000/api/books

# Create book
curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=The Great Gatsby" \
  -F "author=F. Scott Fitzgerald" \
  -F "genre=Fiction" \
  -F "condition=good"

# Get book details
curl http://localhost:3000/api/books/BOOK_ID

# Add scan
curl -X POST http://localhost:3000/api/books/BOOK_ID/history \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action":"scanned","notes":"Found it!"}'
```

### 3. Update Frontend
Update the AddBook component to use the real API:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  // Add all form fields...
  
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  const data = await response.json();
  if (data.success) {
    console.log('QR Code:', data.book.qrCodeUrl);
    // Show success and QR code
  }
};
```

---

## 📚 Related APIs

After completing book APIs, you'll want:
- Exchange APIs (request, accept, complete exchanges)
- Points system (earn/spend points)
- Notifications (exchange requests, scans)
- Reviews/Ratings (book and user reviews)
