# User Profile API - Quick Reference

## 🚀 Quick Start

### 1. Run Migration
```bash
npx prisma migrate dev --name add_user_bio_location
npx prisma generate
```

### 2. Set Environment Variables
Add to `.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Test APIs
Visit: `http://localhost:3000/api-docs`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/me` | ✅ Required | Get my full profile |
| PUT | `/api/users/me` | ✅ Required | Update my profile |
| GET | `/api/users/{id}` | ❌ Public | Get user's public profile |

---

## 🔧 Update Profile Examples

### Update Name & Bio
```javascript
const formData = new FormData();
formData.append('name', 'Jane Smith');
formData.append('bio', 'Book enthusiast');

await fetch('/api/users/me', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### Update with Image
```javascript
const formData = new FormData();
formData.append('name', 'Jane Smith');
formData.append('profileImage', file);

await fetch('/api/users/me', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### Update Location
```javascript
const formData = new FormData();
formData.append('location', 'San Francisco, CA');

await fetch('/api/users/me', {
  method: 'PUT',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

---

## 📊 Response Examples

### My Profile (Authenticated)
```json
{
  "success": true,
  "user": {
    "id": "...",
    "email": "user@example.com",    // ✅ Included
    "name": "John Doe",
    "phone": "+1234567890",          // ✅ Included
    "profileImage": "...",
    "bio": "Book lover",
    "location": "New York",
    "points": 100,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Public Profile
```json
{
  "success": true,
  "user": {
    "id": "...",
    // ❌ No email
    "name": "John Doe",
    // ❌ No phone
    "profileImage": "...",
    "bio": "Book lover",
    "location": "New York",
    "points": 100,
    "createdAt": "..."
  }
}
```

---

## 🖼️ Image Upload Details

### Supported Formats
- JPG, JPEG, PNG, GIF, WEBP

### Transformations
- Size: 400x400 pixels
- Crop: Face-centered
- Folder: `user-profiles`

### Auto Features
- ✅ Old image deleted automatically
- ✅ Only Cloudinary images deleted
- ✅ Error handling for failed uploads

---

## 🔐 Security

### Protected Routes
- GET `/api/users/me` - Requires Bearer token
- PUT `/api/users/me` - Requires Bearer token

### Public Routes
- GET `/api/users/{id}` - No auth needed

### Data Privacy
Public profiles exclude:
- ❌ Email address
- ❌ Phone number
- ❌ Password (never returned)
- ❌ Reset tokens
- ❌ OAuth IDs

---

## ✅ Validation

### Email Updates
- ✅ Must be unique
- ✅ Format validated
- ✅ Returns 400 if taken

### Image Uploads
- ✅ Format validation
- ✅ Size limits (Cloudinary)
- ✅ Error handling

---

## 🐛 Common Issues

### Issue: "Email already in use"
**Solution:** Choose a different email

### Issue: "Failed to upload profile image"
**Solution:** Check:
- Cloudinary credentials in .env
- Image format (jpg, png, gif, webp)
- File size

### Issue: "Invalid or expired token"
**Solution:** Get new token via `/api/auth/signin`

---

## 📚 Files Created

### API Routes
- `src/app/api/users/me/route.js`
- `src/app/api/users/[id]/route.js`

### Utilities
- `src/config/cloudinary.js`
- `src/utils/cloudinaryHelpers.js`
- `src/utils/uploadToCloudinary.js` (updated)
- `src/utils/deleteFromCloudinary.js` (updated)

### Documentation
- `USER_PROFILE_API.md`
- `USER_PROFILE_QUICK_REF.md` (this file)

### Schema Changes
- `prisma/schema.prisma` (added `bio` and `location`)

---

## 🧪 Test Checklist

- [ ] Run migration: `npx prisma migrate dev`
- [ ] Set Cloudinary env vars
- [ ] Test GET `/api/users/me` with token
- [ ] Test PUT `/api/users/me` (update name)
- [ ] Test PUT `/api/users/me` (upload image)
- [ ] Test GET `/api/users/{id}` (public)
- [ ] Verify old image deleted on update
- [ ] Check Swagger docs at `/api-docs`

---

## 💡 Tips

1. **Always use Bearer token format:**
   ```
   Authorization: Bearer eyJhbGc...
   ```

2. **Use FormData for updates:**
   ```javascript
   const formData = new FormData();
   // Even for non-file updates
   ```

3. **Check response for errors:**
   ```javascript
   if (!response.ok) {
     const error = await response.json();
     console.error(error.error);
   }
   ```

4. **Test in Swagger UI first:**
   - Visit `/api-docs`
   - Click "Authorize"
   - Enter: `Bearer YOUR_TOKEN`
   - Test endpoints interactively
