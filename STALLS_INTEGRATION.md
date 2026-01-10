# Exchange Stalls Integration Guide

## Overview
Complete integration of the Exchange Stalls API system into the frontend, enabling users to discover nearby physical book exchange points and manage their own stalls.

---

## Features Implemented

### 1. **Exchange Points Page** (`/exchange-points`)
Location: `src/app/(main)/exchange-points/`

**Features:**
- 📍 Real-time geolocation to get user's current position
- 🗺️ Interactive Google Maps with stall markers
- 📋 List view with detailed stall cards
- 🔄 Toggle between Map and List views
- 🔍 Search by radius (1km to 50km)
- 🎯 Filter by active status
- 📱 Fully responsive design

**Components:**
- **ExchangePointsClient.jsx**: Main client component
  - Fetches user's current location using Geolocation API
  - Calls `GET /api/stalls` with lat, lng, radius parameters
  - Manages view state (map/list)
  - Handles filters (radius, active status)
  
- **MapView.jsx**: Google Maps integration
  - Displays stalls as markers on the map
  - Shows InfoWindow on marker click with stall details
  - Centers on user's current location
  - Requires `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable
  
- **StallCard.jsx**: Stall display card
  - Shows stall photo, name, description
  - Displays distance from user
  - Shows location, operating hours, contact info
  - Available genres badges
  - "Contact Owner" button
  
- **AddStallModal.jsx**: Create/Edit stall modal
  - Form validation
  - Photo upload to Cloudinary
  - "Use Current Location" button for auto-fill
  - Reverse geocoding to get address from coordinates
  - Genre multi-select
  - Active/Inactive toggle

---

### 2. **My Stalls Dashboard** (`/dashboard/stalls/my-stalls`)
Location: `src/app/(dashboard)/dashboard/stalls/my-stalls/`

**Features:**
- 📊 Stats cards (Total, Active, Inactive stalls)
- 📝 List of user's stalls with full details
- ✏️ Edit stall inline
- 🗑️ Delete stall with confirmation
- ➕ Add new stall button
- 📷 Photo preview in stall cards
- 🎨 Clean card-based UI

**API Endpoint:**
- **GET /api/stalls/my-stalls**: Fetch authenticated user's stalls
  - Returns all stalls created by the user
  - Ordered by creation date (newest first)
  - Includes user relation

---

## API Integration

### Frontend → Backend Flow

#### 1. **Get Nearby Stalls**
```javascript
// Get user location
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  
  // Fetch nearby stalls
  fetch(`/api/stalls?lat=${latitude}&lng=${longitude}&radius=10&isActive=true`)
    .then(res => res.json())
    .then(data => {
      // data.stalls contains array of stalls with distance
    });
});
```

**API Response:**
```json
{
  "success": true,
  "stalls": [
    {
      "id": "uuid",
      "name": "Central Library Book Exchange",
      "locationAddress": "123 Main St",
      "locationLat": 40.7128,
      "locationLng": -74.0060,
      "distance": 2.5,
      "isActive": true,
      "photos": ["https://..."],
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "profileImage": "https://..."
      }
    }
  ],
  "count": 1
}
```

#### 2. **Create Stall**
```javascript
const token = localStorage.getItem('token');

fetch('/api/stalls', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: "My Book Exchange",
    description: "Community book sharing spot",
    locationAddress: "456 Park Ave",
    locationLat: 40.7580,
    locationLng: -73.9855,
    contactPhone: "+1234567890",
    contactEmail: "contact@example.com",
    operatingHours: "Mon-Fri 9AM-5PM",
    availableGenres: ["Fiction", "Mystery"],
    photos: ["https://cloudinary.com/..."],
    isActive: true
  })
});
```

#### 3. **Update Stall**
```javascript
const token = localStorage.getItem('token');

fetch(`/api/stalls/${stallId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: "Updated Name",
    operatingHours: "Mon-Sat 10AM-6PM"
    // Only include fields you want to update
  })
});
```

#### 4. **Delete Stall**
```javascript
const token = localStorage.getItem('token');

fetch(`/api/stalls/${stallId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### 5. **Get My Stalls**
```javascript
const token = localStorage.getItem('token');

fetch('/api/stalls/my-stalls', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    // data.stalls contains user's stalls
  });
```

---

## Environment Variables Required

Add to `.env.local`:

```bash
# Google Maps API Key (required for map display and geocoding)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Cloudinary (required for stall photo uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# JWT (already exists)
JWT_SECRET=your_jwt_secret

# Database (already exists)
DATABASE_URL=your_database_url
```

---

## Setup Instructions

### 1. **Install Dependencies**
```bash
npm install @react-google-maps/api
```

### 2. **Run Database Migration**
The `Stall` model already exists in the Prisma schema. Apply any pending migrations:

```bash
npx prisma migrate dev
```

### 3. **Setup Google Maps API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create API credentials (API Key)
5. Restrict the key to your domain (optional but recommended)
6. Add to `.env.local`

### 4. **Test Geolocation**
Geolocation requires:
- HTTPS in production
- User permission in browser
- Browser support (all modern browsers)

**Development:**
- Works on `localhost` without HTTPS
- Browser will prompt for location permission

**Production:**
- Must use HTTPS
- Consider fallback for denied permissions

---

## User Flow

### Adding a Stall

1. User navigates to `/exchange-points`
2. Clicks "Add Exchange Stall" button
3. Modal opens with form
4. User can:
   - Enter stall name (required, 3-200 chars)
   - Add description (optional, max 1000 chars)
   - **Option A**: Click "Use Current Location" to auto-fill
   - **Option B**: Enter address manually and coordinates
   - Add contact phone/email
   - Specify operating hours
   - Select available genres
   - Upload stall photo
   - Toggle active status
5. Click "Add Stall"
6. Stall appears immediately on map and list

### Discovering Stalls

1. User visits `/exchange-points`
2. Browser requests location permission
3. On permission grant:
   - Map centers on user location
   - Fetches stalls within 10km radius
   - Displays markers on map
   - Shows list with distance
4. User can:
   - Adjust radius (1-50km)
   - Toggle between map and list view
   - Click marker to see stall details
   - Click "Contact Owner" to get phone/email

### Managing Stalls

1. User goes to `/dashboard/stalls/my-stalls`
2. Sees stats: Total, Active, Inactive stalls
3. Views all their stalls in card layout
4. Can:
   - Edit any stall (opens modal with pre-filled data)
   - Delete stall (with confirmation)
   - Toggle active status
   - View creation date

---

## Distance Calculation

The system uses the **Haversine formula** to calculate accurate distances between coordinates:

```javascript
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

This provides accurate distance in kilometers between two lat/lng points.

---

## UI/UX Considerations

### Responsive Design
- Mobile-first approach
- Touch-friendly buttons
- Stacked layout on small screens
- Horizontal layout on tablets/desktop

### Loading States
- Spinner while fetching location
- Skeleton cards while loading stalls
- Loading spinner on form submit
- Disabled state during operations

### Error Handling
- Geolocation permission denied → Show manual entry
- No stalls found → Empty state with helpful message
- Network error → Retry button
- Validation errors → Inline messages

### Accessibility
- Semantic HTML
- ARIA labels on buttons
- Keyboard navigation support
- Focus indicators
- Alt text on images

---

## Performance Optimizations

### 1. **Caching**
```javascript
// Cache stalls for 5 minutes
const cacheKey = `stalls_${lat}_${lng}_${radius}`;
const cached = sessionStorage.getItem(cacheKey);

if (cached) {
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < 5 * 60 * 1000) {
    return data;
  }
}
```

### 2. **Debounce Radius Change**
```javascript
const debouncedFetch = debounce((radius) => {
  fetchStalls(lat, lng, radius);
}, 500);
```

### 3. **Lazy Load Photos**
```javascript
<img 
  src={photo} 
  loading="lazy" 
  alt="Stall"
/>
```

### 4. **Map Clustering** (Future)
For areas with many stalls, implement marker clustering:
```bash
npm install @googlemaps/markerclusterer
```

---

## Security Considerations

### 1. **Authorization**
- Only stall owners can edit/delete their stalls
- JWT token validation on all protected endpoints
- UserId extracted from token, not from request body

### 2. **Input Validation**
- Name: 3-200 characters
- Description: Max 1000 characters
- Lat/Lng: Valid float numbers
- Email: Valid email format
- Phone: Optional, any format

### 3. **Photo Upload**
- File type validation (images only)
- Size limit: 5MB
- Uploaded to Cloudinary (not stored locally)
- Old photo deleted when uploading new one

### 4. **Rate Limiting** (Recommended)
Add to API routes:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

---

## Testing Checklist

### Exchange Points Page
- [ ] Geolocation permission prompt appears
- [ ] Location permission denied shows fallback
- [ ] Map loads with user marker
- [ ] Stall markers appear on map
- [ ] InfoWindow opens on marker click
- [ ] List view shows stalls with distance
- [ ] Radius slider updates results
- [ ] Active filter works
- [ ] Map/List toggle works
- [ ] Add stall button opens modal
- [ ] Contact owner shows phone/email

### Add Stall Modal
- [ ] Form validation works
- [ ] "Use Current Location" fills coordinates
- [ ] Photo upload works
- [ ] Photo preview displays
- [ ] Genre selection works
- [ ] Submit creates stall
- [ ] Cancel closes modal
- [ ] Edit pre-fills form data

### My Stalls Dashboard
- [ ] Shows correct stall count
- [ ] Lists all user's stalls
- [ ] Edit button opens modal with data
- [ ] Delete shows confirmation
- [ ] Delete removes stall
- [ ] Empty state shows when no stalls
- [ ] Stats update after operations

### API Endpoints
- [ ] GET /api/stalls returns nearby stalls
- [ ] Distance calculation is accurate
- [ ] POST /api/stalls creates stall
- [ ] PUT /api/stalls/:id updates stall
- [ ] DELETE /api/stalls/:id deletes stall
- [ ] GET /api/stalls/my-stalls returns user's stalls
- [ ] Authorization prevents unauthorized edits

---

## Future Enhancements

### 1. **Real-time Updates**
- WebSocket connection for live stall updates
- Notification when new stall added nearby
- Live stall availability status

### 2. **Advanced Search**
- Search by stall name
- Filter by available genres
- Sort by distance, rating, or activity

### 3. **Ratings & Reviews**
- Users can rate stalls
- Leave reviews
- See average rating on cards

### 4. **Book Inventory**
- Stall owners list available books
- Users can see what's available before visiting
- Reserve books for pickup

### 5. **In-App Messaging**
- Chat with stall owner
- Schedule pickup time
- Ask questions about books

### 6. **Navigation**
- "Get Directions" button
- Opens Google Maps with directions
- Shows travel time and distance

### 7. **Analytics**
- Stall view count
- Contact button clicks
- Popular times
- Owner dashboard with insights

### 8. **Verification**
- Admin can verify stall locations
- Verified badge on trusted stalls
- Report inappropriate stalls

---

## Troubleshooting

### Issue: Geolocation not working
**Solution:**
- Check browser permissions
- Use HTTPS in production
- Provide manual entry fallback

### Issue: Map not loading
**Solution:**
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Check API key restrictions
- Enable Maps JavaScript API in console

### Issue: Photos not uploading
**Solution:**
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Ensure file is an image

### Issue: Distance is incorrect
**Solution:**
- Verify lat/lng coordinates are correct
- Check coordinate order (lat first, then lng)
- Haversine formula expects decimal degrees

### Issue: Can't edit/delete stall
**Solution:**
- Check JWT token is valid
- Verify user is the stall owner
- Check authorization header format

---

## API Routes Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/stalls` | No | Get nearby stalls by lat/lng |
| POST | `/api/stalls` | Yes | Create new stall |
| GET | `/api/stalls/:id` | No | Get stall details |
| PUT | `/api/stalls/:id` | Yes | Update stall (owner only) |
| DELETE | `/api/stalls/:id` | Yes | Delete stall (owner only) |
| GET | `/api/stalls/my-stalls` | Yes | Get user's stalls |

---

## Files Created/Updated

### New Files
1. `src/app/(main)/exchange-points/AddStallModal.jsx` - Modal for creating/editing stalls
2. `src/app/(dashboard)/dashboard/stalls/my-stalls/page.js` - My Stalls dashboard page
3. `src/app/api/stalls/my-stalls/route.js` - API endpoint for user's stalls

### Updated Files
1. `src/app/(main)/exchange-points/ExchangePointsClient.jsx` - Integrated real API calls
2. `src/app/(main)/exchange-points/MapView.jsx` - Real Google Maps with markers
3. `src/app/(main)/exchange-points/StallCard.jsx` - Display real stall data
4. `src/config/routes.js` - Added stalls routes

---

## Conclusion

The Exchange Stalls system is now fully integrated with:
- ✅ Real-time geolocation
- ✅ Google Maps integration
- ✅ Distance-based search
- ✅ Full CRUD operations
- ✅ Photo uploads
- ✅ Owner authorization
- ✅ Responsive UI
- ✅ Dashboard management

Users can now discover nearby book exchange points and manage their own stalls seamlessly!
