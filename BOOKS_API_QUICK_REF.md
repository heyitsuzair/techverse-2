# Books API - Quick Reference

## 🚀 Quick Start

### 1. Run Migration
```bash
npx prisma migrate dev --name add_books_qr_history
npx prisma generate
```

### 2. Environment Variables
Ensure these are set in `.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📡 Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/books` | ❌ | Marketplace - browse all books |
| POST | `/api/books` | ✅ | Create book + QR code |
| GET | `/api/books/:id` | ❌ | Book details |
| PUT | `/api/books/:id` | ✅ | Update book (owner only) |
| DELETE | `/api/books/:id` | ✅ | Delete book (owner only) |
| POST | `/api/books/:id/history` | ✅ | Add scan/note |
| GET | `/api/books/:id/history` | ❌ | Get book history |

---

## 🔍 Quick Examples

### Browse Books
```javascript
// All books
fetch('/api/books')

// Filter by genre
fetch('/api/books?genre=Fiction')

// Search
fetch('/api/books?search=harry+potter')

// Near me
fetch('/api/books?location=New+York')

// My books
fetch('/api/books?userId=my-user-id')
```

### Create Book
```javascript
const formData = new FormData();
formData.append('title', 'Book Title');
formData.append('author', 'Author Name');
formData.append('genre', 'Fiction');
formData.append('condition', 'good');
formData.append('coverImage', file);

fetch('/api/books', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### Add Scan
```javascript
fetch(`/api/books/${bookId}/history`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'scanned',
    notes: 'Found at library',
    location: 'NYC'
  })
});
```

---

## 📝 Required Fields

### Create Book
- ✅ `title` - Book title
- ✅ `genre` - Book genre
- ✅ `condition` - new, excellent, good, fair, poor

### Optional Fields
- Author, ISBN, description
- Cover image (File)
- Location (address, lat, lng)
- Point value (default: 10)
- Language (default: English)

### Add History
- ✅ `action` - scanned, noted, exchanged, read, reviewed
- Notes, location (optional)

---

## 🎨 QR Code Features

✅ Auto-generated on book creation  
✅ Uploaded to Cloudinary  
✅ URL saved in `book.qrCodeUrl`  
✅ Contains: `{APP_URL}/qr-scan/{bookId}`  
✅ 400x400 pixels  
✅ Auto-deleted when book deleted  

**Display QR:**
```jsx
<img src={book.qrCodeUrl} alt="QR Code" className="w-40 h-40" />
```

---

## 🔒 Permissions

**Public:**
- Browse books
- View book details
- View book history

**Authenticated:**
- Create books
- Add history entries

**Owner Only:**
- Update their books
- Delete their books

---

## 📊 Response Format

### Book Object
```json
{
  "id": "uuid",
  "title": "Book Title",
  "author": "Author Name",
  "coverImage": "https://...",
  "qrCodeUrl": "https://...",
  "genre": "Fiction",
  "condition": "good",
  "pointValue": 10,
  "locationAddress": "NYC",
  "locationLat": 40.7128,
  "locationLng": -74.006,
  "isAvailable": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "profileImage": "https://..."
  },
  "_count": {
    "exchanges": 2,
    "bookHistory": 5
  }
}
```

---

## 🎯 Filters

**Genre:**
Fiction, Non-Fiction, Mystery, Romance, Science Fiction, Fantasy, Biography, History, Self-Help, Children's Books, Poetry, Thriller

**Condition:**
new, excellent, good, fair, poor

**Search:**
Searches title, author, description

**Location:**
Searches in locationAddress

---

## ⚡ Quick Integration

### Frontend (React)
```jsx
// Marketplace
const [books, setBooks] = useState([]);

useEffect(() => {
  fetch('/api/books?page=1&limit=20')
    .then(res => res.json())
    .then(data => setBooks(data.books));
}, []);

// Create Book
const handleSubmit = async (formData) => {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  const data = await res.json();
  console.log('QR Code:', data.book.qrCodeUrl);
};
```

---

## 🐛 Common Issues

### Issue: QR code not generated
**Check:**
- Internet connection (uses external API)
- Cloudinary credentials
- APP_URL environment variable

### Issue: Cover image upload fails
**Check:**
- File size (max 5MB recommended)
- File format (jpg, png, gif, webp)
- Cloudinary credentials

### Issue: Permission denied
**Check:**
- Bearer token in Authorization header
- Token not expired
- User is book owner (for update/delete)

---

## 📝 Testing Checklist

- [ ] Create book without image
- [ ] Create book with image
- [ ] Verify QR code generated
- [ ] Browse marketplace
- [ ] Filter by genre
- [ ] Search books
- [ ] View book details
- [ ] Update book
- [ ] Delete book
- [ ] Add history entry
- [ ] View history

---

## 🔗 Related Endpoints

**User APIs:**
- GET `/api/auth/me` - Current user + stats
- PUT `/api/users/me` - Update profile
- GET `/api/users/:id` - Public profile

**Next Steps:**
- Exchange APIs
- Points system
- Reviews/Ratings

---

## 💡 Pro Tips

1. **Always include location** - Helps match nearby users
2. **Use good quality images** - Better for marketplace
3. **Set appropriate point values** - Rare books = more points
4. **Track history** - Adds credibility to book
5. **Keep QR codes** - Print and attach to physical books

---

## ✅ Files Created

- `/api/books/route.js` - GET, POST
- `/api/books/[id]/route.js` - GET, PUT, DELETE
- `/api/books/[id]/history/route.js` - POST, GET
- `/utils/qrcode.js` - QR generation utility
- Schema updated with Book, BookHistory models
