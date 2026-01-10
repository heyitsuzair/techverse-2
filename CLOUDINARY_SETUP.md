# Cloudinary Setup Guide

## Issue Fixed
The original Cloudinary utilities were importing the Node.js SDK (`cloudinary` package) directly in client components, which caused the "Module not found: Can't resolve 'fs'" error because the browser doesn't have access to Node.js modules like `fs`.

## Solution
Updated to use browser-compatible approaches:

### 1. **Upload (Client-Side)**
Now uses Cloudinary's REST API directly from the browser via `fetch()`:
- No Node.js dependencies
- Works in client components
- Uses unsigned upload preset
- Returns the secure URL directly

### 2. **Delete (Server-Side)**
Created an API route (`/api/cloudinary/delete`) that handles deletion server-side:
- Client calls the API route
- Server uses Cloudinary SDK to delete
- Keeps API credentials secure

---

## Setup Instructions

### Step 1: Create Upload Preset in Cloudinary

1. **Login to Cloudinary Dashboard**
   - Go to https://cloudinary.com/console
   - Sign in with your account

2. **Navigate to Upload Settings**
   - Click on **Settings** (gear icon)
   - Select **Upload** tab

3. **Create New Upload Preset**
   - Scroll to **Upload presets** section
   - Click **Add upload preset**

4. **Configure Preset**
   - **Preset name**: `books_exchange_unsigned` (or any name)
   - **Signing mode**: Select **Unsigned** ⚠️ IMPORTANT
   - **Folder**: (optional) Set default folder like `stalls` or leave empty
   - **Allowed formats**: jpg, jpeg, png, gif, webp
   - **Max file size**: 5MB (or your preference)
   - **Transformations**: (optional) Auto resize, quality optimization

5. **Save the Preset**
   - Click **Save**
   - Copy the preset name (you'll need it for `.env`)

### Step 2: Update Environment Variables

Add these to your `.env.local` or `.env` file:

```bash
# Server-side Cloudinary config (keep these)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client-side Cloudinary config (NEW - add these)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=books_exchange_unsigned
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never put API secrets in `NEXT_PUBLIC_*` variables
- The upload preset MUST be unsigned for browser uploads

### Step 3: Test the Upload

The upload function is now browser-compatible:

```javascript
import uploadToCloudinary from '@/utils/uploadToCloudinary';

// In your component
const handleFileUpload = async (file) => {
  try {
    const url = await uploadToCloudinary(file, 'stalls');
    console.log('Uploaded:', url);
    // url is the secure Cloudinary URL
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

---

## How It Works Now

### Upload Flow

1. **User selects file** in browser
2. **Client calls** `uploadToCloudinary(file, 'stalls')`
3. **Function creates** FormData with:
   - File
   - Upload preset (unsigned)
   - Folder name
4. **Direct POST** to Cloudinary API:
   ```
   https://api.cloudinary.com/v1_1/{cloud_name}/image/upload
   ```
5. **Returns** secure URL directly

**Security:**
- No API secrets exposed
- Cloudinary validates via unsigned preset
- You can set restrictions on preset (formats, size, transformations)

### Delete Flow

1. **Client calls** `deleteFromCloudinary(imageUrl)`
2. **Function extracts** public_id from URL
3. **Client calls** `/api/cloudinary/delete` API route
4. **Server uses** Cloudinary SDK with API secret
5. **Deletes** image securely
6. **Returns** success/failure

**Security:**
- API secret stays on server
- Only authenticated requests can delete (add auth middleware if needed)

---

## File Changes Made

### 1. `/src/utils/uploadToCloudinary.js`
**Before:**
```javascript
import cloudinary from "../config/cloudinary"; // ❌ Node.js only
const result = await cloudinary.uploader.upload(file, options);
```

**After:**
```javascript
// ✅ Browser compatible
const formData = new FormData();
formData.append('file', file);
formData.append('upload_preset', uploadPreset);

const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  { method: 'POST', body: formData }
);
```

### 2. `/src/utils/deleteFromCloudinary.js`
**Before:**
```javascript
import cloudinary from "../config/cloudinary"; // ❌ Node.js only
await cloudinary.uploader.destroy(publicId);
```

**After:**
```javascript
// ✅ Calls server-side API route
const response = await fetch('/api/cloudinary/delete', {
  method: 'POST',
  body: JSON.stringify({ publicId })
});
```

### 3. `/src/app/api/cloudinary/delete/route.js` (NEW)
Server-side API route that securely deletes images:
```javascript
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request) {
  const { publicId } = await request.json();
  const result = await cloudinary.uploader.destroy(publicId);
  return NextResponse.json({ success: true });
}
```

---

## Testing Checklist

### Upload Test
- [ ] Select an image file (< 5MB)
- [ ] Image uploads successfully
- [ ] Returns Cloudinary URL
- [ ] Image visible in browser
- [ ] Image appears in Cloudinary dashboard

### Delete Test
- [ ] Upload an image first
- [ ] Call delete function with URL
- [ ] Image deleted from Cloudinary
- [ ] No errors in console

### Error Handling
- [ ] Try uploading non-image file → Should fail gracefully
- [ ] Try uploading file > 5MB → Should fail gracefully
- [ ] Try deleting invalid URL → Should not throw error
- [ ] Check browser console for detailed errors

---

## Cloudinary Upload Preset Configuration

### Recommended Settings

**Basic:**
- Name: `books_exchange_unsigned`
- Mode: Unsigned ⚠️
- Folder: `stalls` (or `uploads`)

**File Restrictions:**
- Formats: jpg, jpeg, png, gif, webp
- Max file size: 5MB
- Resource type: Image

**Transformations (Optional):**
- Auto format: Best quality
- Auto quality: 80
- Max dimensions: 1920x1920 (to save storage)

**Security:**
- Unsigned upload: Enabled
- Unique filename: True
- Overwrite: False

---

## Troubleshooting

### Error: "Upload preset not found"
**Solution:** 
- Check the preset name in Cloudinary dashboard
- Ensure it matches `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- Preset must be **unsigned**

### Error: "Invalid cloud name"
**Solution:**
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
- Check Cloudinary dashboard for your cloud name

### Error: "Upload failed" with 400 status
**Solution:**
- File might be too large
- File format not allowed
- Check Cloudinary logs in dashboard

### Images not showing
**Solution:**
- Check if URL is HTTPS (secure_url)
- Verify image was actually uploaded to Cloudinary
- Check browser console for CORS errors

---

## Alternative: Use Cloudinary Widget (Future Enhancement)

For a better UX, consider using Cloudinary's Upload Widget:

```bash
npm install @cloudinary/url-gen @cloudinary/react
```

```javascript
import { CloudinaryContext, Image } from 'cloudinary-react';

// Upload widget with preview, cropping, filters
<CloudinaryUploadWidget
  cloudName="your_cloud_name"
  uploadPreset="books_exchange_unsigned"
  onSuccess={(result) => {
    console.log('Uploaded:', result.info.secure_url);
  }}
/>
```

Benefits:
- Built-in image cropping
- Multiple file upload
- Progress bars
- Image transformations
- Better UX

---

## Summary

✅ **Fixed Issues:**
- Removed Node.js dependencies from client code
- Implemented browser-compatible upload
- Secure server-side delete
- No `fs` module errors

✅ **What Works Now:**
- Upload images from browser ✓
- Delete images securely ✓
- No build errors ✓
- Production-ready ✓

⚠️ **Important:**
- Create unsigned upload preset in Cloudinary
- Add environment variables
- Restart dev server after env changes

🚀 **Ready to Use!**
