# BooksExchange Authentication API Documentation

Complete authentication system with JWT tokens, Google OAuth, and email functionality.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Database Schema](#database-schema)
- [Security Features](#security-features)

---

## Environment Variables

Add these to your `.env` file:

```env
# Database
DATABASE_URL="your-database-connection-string"

# JWT Secrets (Generate strong random strings)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-refresh-token-secret-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"

# Email (SMTP) - Example with Gmail
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-specific-password"
SMTP_FROM_NAME="BooksExchange"
SMTP_FROM_EMAIL="noreply@booksexchange.com"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### How to Get Environment Variables:

#### 1. JWT Secrets
Generate strong random strings:
```bash
# Run in terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2. Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
6. Copy Client ID and Client Secret

#### 3. Gmail SMTP (Option 1 - Recommended for development)
1. Enable 2-Factor Authentication on your Gmail
2. Generate App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this as `SMTP_PASSWORD`

#### 4. SendGrid SMTP (Option 2 - Recommended for production)
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

#### 5. Mailgun SMTP (Option 3)
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
SMTP_USER="postmaster@your-domain.mailgun.org"
SMTP_PASSWORD="your-mailgun-smtp-password"
```

---

## Installation

### 1. Install Required Packages
```bash
npm install jsonwebtoken bcryptjs nodemailer google-auth-library
```

### 2. Update Prisma Schema

Add these fields to your `User` model in `prisma/schema.prisma`:

```prisma
model User {
  id                    String    @id @default(cuid())
  email                 String    @unique
  password              String?   // Nullable for Google OAuth users
  name                  String
  phone                 String?
  profileImage          String?
  points                Int       @default(0)
  
  // Google OAuth
  googleId              String?   @unique
  emailVerified         Boolean   @default(false)
  
  // Password Reset
  resetPasswordToken    String?
  resetPasswordExpires  DateTime?
  
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  // Relations
  books                 Book[]
  // ... other relations
}
```

### 3. Run Prisma Migration
```bash
npx prisma migrate dev --name add_auth_fields
npx prisma generate
```

---

## API Endpoints

### 1. Sign Up (Email/Password)
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "phone": "+1234567890" // optional
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "points": 100,
    "createdAt": "2026-01-10T10:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

**Error Responses:**
- `400`: Missing fields or invalid format
- `409`: Email already exists

---

### 2. Sign In (Email/Password)
**POST** `/api/auth/signin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "points": 150,
    "profileImage": null,
    "createdAt": "2026-01-10T10:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

**Error Responses:**
- `400`: Missing credentials
- `401`: Invalid email or password

---

### 3. Google Sign In
**POST** `/api/auth/google`

**Request Body:**
```json
{
  "token": "google-id-token-from-frontend"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful", // or "User registered successfully"
  "user": {
    "id": "clx...",
    "email": "user@gmail.com",
    "name": "John Doe",
    "profileImage": "https://lh3.googleusercontent.com/...",
    "googleId": "123456789",
    "points": 100,
    "createdAt": "2026-01-10T10:00:00.000Z"
  },
  "isNewUser": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

---

### 4. Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

**Note:** Always returns success to prevent email enumeration attacks.

---

### 5. Reset Password
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**
- `400`: Invalid or expired token
- `400`: Password too short

---

### 6. Refresh Token
**POST** `/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

---

### 7. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <access-token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "points": 150,
    "profileImage": null,
    "createdAt": "2026-01-10T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: No token or invalid token
- `404`: User not found

---

## Usage Examples

### Frontend Integration (Next.js Client Component)

```javascript
// lib/api/auth.js
const API_BASE = '/api/auth';

export const authAPI = {
  // Sign Up
  async signup(data) {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Sign In
  async signin(email, password) {
    const response = await fetch(`${API_BASE}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Google Sign In
  async googleSignIn(token) {
    const response = await fetch(`${API_BASE}/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return response.json();
  },

  // Forgot Password
  async forgotPassword(email) {
    const response = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  // Reset Password
  async resetPassword(token, password) {
    const response = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    return response.json();
  },

  // Refresh Token
  async refreshToken(refreshToken) {
    const response = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    return response.json();
  },

  // Get Current User
  async getCurrentUser(accessToken) {
    const response = await fetch(`${API_BASE}/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.json();
  },
};
```

### Google OAuth Frontend Setup

```bash
npm install @react-oauth/google
```

```javascript
// app/providers.jsx
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
```

```javascript
// components/GoogleSignInButton.jsx
'use client';

import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '@/lib/api/auth';

export function GoogleSignInButton({ onSuccess }) {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await authAPI.googleSignIn(credentialResponse.credential);
      
      if (result.success) {
        // Store tokens
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        
        onSuccess(result.user);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Login Failed')}
      useOneTap
      theme="outline"
      size="large"
      text="continue_with"
    />
  );
}
```

### Token Management

```javascript
// lib/auth/tokens.js
export const tokenManager = {
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return null;

    try {
      const result = await authAPI.refreshToken(refreshToken);
      if (result.success) {
        this.setTokens(result.accessToken, result.refreshToken);
        return result.accessToken;
      }
    } catch (error) {
      this.clearTokens();
      return null;
    }
  },
};
```

---

## Database Schema

Complete Prisma schema for authentication:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                    String    @id @default(cuid())
  email                 String    @unique
  password              String?
  name                  String
  phone                 String?
  profileImage          String?
  points                Int       @default(0)
  
  // OAuth
  googleId              String?   @unique
  emailVerified         Boolean   @default(false)
  
  // Password Reset
  resetPasswordToken    String?
  resetPasswordExpires  DateTime?
  
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@index([email])
  @@index([googleId])
}
```

---

## Security Features

### ✅ Implemented Security Measures:

1. **Password Hashing**: bcryptjs with 10 salt rounds
2. **JWT Tokens**: Separate access and refresh tokens
3. **Token Expiration**: Access tokens expire in 7 days, refresh in 30 days
4. **Email Enumeration Prevention**: Generic messages for forgot password
5. **Secure Reset Tokens**: Cryptographically secure random tokens, hashed in database
6. **Token Expiration**: Reset tokens expire in 1 hour
7. **Google OAuth**: Verified tokens through Google's official library
8. **Password Requirements**: Minimum 8 characters (enhance as needed)
9. **HTTPS Only**: Ensure production uses HTTPS
10. **Environment Variables**: Sensitive data stored securely

### 🔒 Additional Recommendations:

```javascript
// Add rate limiting (install: npm install express-rate-limit)
// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many attempts, please try again later',
});
```

---

## Token Utility Functions

Reusable functions for token extraction and validation:

```javascript
// lib/auth/token-utils.js
import { extractBearerToken, validateAuthHeader } from '@/lib/auth/token-utils';

/**
 * Extract Bearer token from Authorization header
 * Returns: string | null
 */
const token = extractBearerToken(request);
if (!token) {
  // Handle missing token
}

/**
 * Validate and extract token with detailed error
 * Returns: { token: string|null, error: string|null }
 */
const { token, error } = validateAuthHeader(request);
if (error) {
  return NextResponse.json({ error }, { status: 401 });
}
```

### Usage in Protected Routes:

```javascript
// Using in your own API routes
import { validateAuthHeader } from '@/lib/auth/token-utils';
import { verifyAccessToken } from '@/lib/auth/jwt';

export async function POST(request) {
  // Validate and extract token
  const { token, error } = validateAuthHeader(request);
  
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
  
  // Verify token
  try {
    const decoded = verifyAccessToken(token);
    // Use decoded.id, decoded.email, etc.
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
  
  // Your protected logic here...
}
```

### Or use the requireAuth middleware:

```javascript
import { requireAuth } from '@/middleware/auth';

export async function GET(request) {
  const { error, user } = await requireAuth(request);
  if (error) return error;
  
  // user contains: { id, email, name }
  // Your logic here...
}
```

---

## Testing with cURL

```bash
# Sign Up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'

# Sign In
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'

# Get Current User
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Forgot Password
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## Support

For issues or questions:
- Check environment variables are correctly set
- Verify Prisma migrations are up to date
- Check server logs for detailed error messages
- Ensure SMTP credentials are correct for email functionality

---

**Last Updated:** January 10, 2026
**Version:** 1.0.0
