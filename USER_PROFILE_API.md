# User Profile Management API

Complete user profile management with Cloudinary image uploads and public profile viewing.

## 📋 Overview

- **Update Profile**: PUT `/api/users/me` - Update authenticated user profile
- **Get My Profile**: GET `/api/users/me` - Get authenticated user's full profile
- **Get Public Profile**: GET `/api/users/{id}` - Get any user's public profile

## 🔐 Authentication

Protected routes (`/api/users/me`) require JWT Bearer token:
```
Authorization: Bearer <your_access_token>
```

Public routes (`/api/users/{id}`) don't require authentication.

## 📊 Database Schema

### User Model (Extended)
```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  password     String?  // Nullable for Google OAuth
  name         String
  phone        String?
  profileImage String?
  points       Int      @default(100)
  bio          String?   // NEW
  location     String?   // NEW
  
  // OAuth
  googleId      String?  @unique
  emailVerified Boolean  @default(false)
  
  // Password Reset
  resetPasswordToken   String?
  resetPasswordExpires DateTime?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ API Endpoints

### 1. Get Current User Profile
```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response 200 OK:**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc456",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "points": 100,
    "profileImage": "https://res.cloudinary.com/...",
    "bio": "Book lover and avid reader",
    "location": "New York, USA",
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T12:00:00.000Z"
  }
}
```

### 2. Update User Profile
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `name` (string, optional) - User's full name
- `email` (string, optional) - User's email address
- `phone` (string, optional) - User's phone number
- `bio` (string, optional) - User's bio/description
- `location` (string, optional) - User's location
- `profileImage` (file, optional) - Profile image (jpg, jpeg, png, gif, webp)

**Response 200 OK:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "clx123abc456",
    "email": "newemail@example.com",
    "name": "Jane Smith",
    "phone": "+1234567890",
    "points": 100,
    "profileImage": "https://res.cloudinary.com/...",
    "bio": "Passionate about classic literature",
    "location": "San Francisco, CA",
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T12:30:00.000Z"
  }
}
```

**Error Responses:**
- **400 Bad Request**: Email already in use
- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: User not found
- **500 Internal Server Error**: Upload failed or server error

### 3. Get Other User's Public Profile
```http
GET /api/users/{id}
```

No authentication required. Returns public information only.

**Response 200 OK:**
```json
{
  "success": true,
  "user": {
    "id": "clx123abc456",
    "name": "John Doe",
    "profileImage": "https://res.cloudinary.com/...",
    "bio": "Book lover and avid reader",
    "location": "New York, USA",
    "points": 100,
    "createdAt": "2026-01-10T10:00:00.000Z"
  }
}
```

**Note:** Email, phone, and other sensitive data are **NOT** included in public profiles.

## 🖼️ Image Upload with Cloudinary

### Features
- ✅ Automatic upload to Cloudinary
- ✅ Auto-delete old image when updating
- ✅ Image transformation (400x400, face-centered crop)
- ✅ Organized in `user-profiles` folder
- ✅ Support for jpg, jpeg, png, gif, webp

### Configuration Required

Add to your `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### How It Works
1. Client uploads image via form data
2. Server converts file to buffer
3. Upload to Cloudinary with transformations
4. Delete old image if exists (checks Cloudinary URL)
5. Update user record with new URL

## 🔧 Utilities Created

### 1. Cloudinary Config
**File:** `src/config/cloudinary.js`
```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

### 2. Cloudinary Helpers
**File:** `src/utils/cloudinaryHelpers.js`
- `extractPublicId(url)` - Extract public_id from Cloudinary URL
- `isCloudinaryUrl(url)` - Check if URL is from Cloudinary

### 3. Upload Utility
**File:** `src/utils/uploadToCloudinary.js`
- Handles buffer and file uploads
- Supports transformations
- Returns formatted result

### 4. Delete Utility
**File:** `src/utils/deleteFromCloudinary.js`
- Delete single or multiple images
- Cache invalidation support
- Error handling

## 📝 Usage Examples

### Example 1: Update Profile with Image (JavaScript)
```javascript
const formData = new FormData();
formData.append('name', 'Jane Smith');
formData.append('bio', 'Passionate about classic literature');
formData.append('location', 'San Francisco, CA');
formData.append('profileImage', fileInput.files[0]);

const response = await fetch('/api/users/me', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
  body: formData,
});

const data = await response.json();
console.log(data.user);
```

### Example 2: Update Profile (cURL)
```bash
curl -X PUT http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Jane Smith" \
  -F "bio=Passionate about classic literature" \
  -F "location=San Francisco, CA" \
  -F "profileImage=@/path/to/image.jpg"
```

### Example 3: Get Public Profile
```javascript
const response = await fetch('/api/users/clx123abc456');
const data = await response.json();
console.log(data.user); // Public info only
```

## 🎯 Key Features

### Security
- ✅ JWT authentication for profile updates
- ✅ Email uniqueness validation
- ✅ Token validation with detailed errors
- ✅ Public profiles exclude sensitive data

### Image Management
- ✅ Automatic Cloudinary upload
- ✅ Old image deletion on update
- ✅ Face-centered crop (400x400)
- ✅ Format validation (jpg, png, gif, webp)

### Database
- ✅ Prisma ORM with PostgreSQL
- ✅ Automatic timestamp updates
- ✅ Optional fields (bio, location, phone)

## 🚀 Migration Required

Before using the new features, run:

```bash
npx prisma migrate dev --name add_user_bio_location
npx prisma generate
```

This adds the `bio` and `location` fields to the User table.

## 📚 Documentation

Full API documentation available at:
```
http://localhost:3000/api-docs
```

Swagger UI includes:
- ✅ Interactive testing
- ✅ Request/response examples
- ✅ Schema definitions
- ✅ Authentication setup

## ✅ Deliverables Complete

- ✅ PUT `/api/users/me` - Update profile with image upload
- ✅ GET `/api/users/me` - Get authenticated user profile
- ✅ GET `/api/users/{id}` - Get public user profile
- ✅ Cloudinary integration with auto-delete
- ✅ Bio and location fields (optional)
- ✅ Complete Swagger documentation
- ✅ Public vs private data separation

## 🧪 Testing

Test in Swagger UI at `/api-docs` or use the following:

**Get My Profile:**
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Update Profile:**
```bash
curl -X PUT http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=New Name" \
  -F "bio=New bio" \
  -F "location=New York"
```

**Get Public Profile:**
```bash
curl -X GET http://localhost:3000/api/users/USER_ID
```
