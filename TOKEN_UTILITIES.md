# 🔐 Token Utility Functions - Documentation

## Overview

Reusable token extraction and validation functions to avoid code duplication across all auth routes.

---

## Functions Available

### 1. `extractBearerToken(request)`

Extracts the Bearer token from the Authorization header.

**Parameters:**
- `request` - Next.js Request object

**Returns:**
- `string` - The extracted token (without "Bearer " prefix)
- `null` - If no token found or invalid format

**Usage:**
```javascript
import { extractBearerToken } from '@/lib/auth/token-utils';

export async function GET(request) {
  const token = extractBearerToken(request);
  
  if (!token) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }
  
  // Use token...
}
```

---

### 2. `validateAuthHeader(request)`

Validates the Authorization header and extracts the token with detailed error messages.

**Parameters:**
- `request` - Next.js Request object

**Returns:**
```javascript
{
  token: string | null,
  error: string | null
}
```

**Possible errors:**
- `"No authorization header provided"`
- `"Invalid authorization header format. Expected: Bearer <token>"`
- `"No token provided in authorization header"`

**Usage:**
```javascript
import { validateAuthHeader } from '@/lib/auth/token-utils';

export async function POST(request) {
  const { token, error } = validateAuthHeader(request);
  
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
  
  // Token is valid, use it...
}
```

---

## Where It's Used

These utilities are used in:

1. **`/api/auth/me`** - Get current user endpoint
2. **`src/middleware/auth.js`** - requireAuth middleware

All token extraction now uses these reusable functions for consistency.

---

## Benefits

✅ **DRY Principle** - Don't Repeat Yourself  
✅ **Consistent Error Messages** - Same validation everywhere  
✅ **Easy Maintenance** - Update in one place  
✅ **Type Safety** - Clear return types  
✅ **Trim Whitespace** - Handles extra spaces in tokens  
✅ **Better Testing** - Test once, works everywhere

---

## Example: Creating a Protected Route

```javascript
import { NextResponse } from 'next/server';
import { validateAuthHeader } from '@/lib/auth/token-utils';
import { verifyAccessToken } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma';

export async function POST(request) {
  // Step 1: Validate and extract token
  const { token, error: tokenError } = validateAuthHeader(request);
  
  if (tokenError) {
    return NextResponse.json({ error: tokenError }, { status: 401 });
  }
  
  // Step 2: Verify token
  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
  
  // Step 3: Use decoded user data
  const userId = decoded.id;
  
  // Your protected logic here...
  const data = await prisma.someModel.findMany({
    where: { userId }
  });
  
  return NextResponse.json({ success: true, data });
}
```

---

## Alternative: Using requireAuth Middleware

For even simpler code, use the `requireAuth` middleware:

```javascript
import { requireAuth } from '@/middleware/auth';

export async function GET(request) {
  // One line authentication check
  const { error, user } = await requireAuth(request);
  if (error) return error;
  
  // user contains: { id, email, name }
  console.log('Authenticated user:', user.email);
  
  // Your logic here...
}
```

The `requireAuth` middleware internally uses `validateAuthHeader` for consistency.

---

## Token Format

Expected Authorization header format:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:**
- Must include "Bearer " prefix
- One space after "Bearer"
- Token can have leading/trailing whitespace (automatically trimmed)

---

## Error Handling

### Bad Format Examples:

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// Missing "Bearer " prefix
// Error: "Invalid authorization header format. Expected: Bearer <token>"

Authorization: Bearer
// No token after "Bearer "
// Error: "No token provided in authorization header"

Authorization: BearereyJhbGci...
// Missing space after "Bearer"
// Error: "Invalid authorization header format. Expected: Bearer <token>"

(no header)
// Missing Authorization header entirely
// Error: "No authorization header provided"
```

---

## Implementation Details

### File Location:
```
src/lib/auth/token-utils.js
```

### Code:
```javascript
export function extractBearerToken(request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer ')) return null;
  
  const token = authHeader.substring(7).trim();
  
  if (!token) return null;
  
  return token;
}

export function validateAuthHeader(request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return {
      token: null,
      error: 'No authorization header provided',
    };
  }
  
  if (!authHeader.startsWith('Bearer ')) {
    return {
      token: null,
      error: 'Invalid authorization header format. Expected: Bearer <token>',
    };
  }
  
  const token = authHeader.substring(7).trim();
  
  if (!token) {
    return {
      token: null,
      error: 'No token provided in authorization header',
    };
  }
  
  return {
    token,
    error: null,
  };
}
```

---

## Testing

### Test Valid Token:
```javascript
const mockRequest = {
  headers: {
    get: (key) => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
};

const { token, error } = validateAuthHeader(mockRequest);
console.log(token); // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
console.log(error); // null
```

### Test Invalid Token:
```javascript
const mockRequest = {
  headers: {
    get: (key) => 'InvalidFormat'
  }
};

const { token, error } = validateAuthHeader(mockRequest);
console.log(token); // null
console.log(error); // "Invalid authorization header format. Expected: Bearer <token>"
```

---

## Migration Guide

If you have existing code that manually extracts tokens:

### Before:
```javascript
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }
  
  const token = authHeader.substring(7);
  // ...
}
```

### After:
```javascript
import { validateAuthHeader } from '@/lib/auth/token-utils';

export async function GET(request) {
  const { token, error } = validateAuthHeader(request);
  
  if (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
  
  // ...
}
```

**Benefits of migration:**
- ✅ 5 lines → 2 lines
- ✅ Handles edge cases (whitespace)
- ✅ Better error messages
- ✅ Consistent across all routes

---

## Best Practices

1. **Always use `validateAuthHeader`** for new routes
2. **Don't extract tokens manually** - use the utility
3. **Handle both token and error** in return value
4. **Return 401 status** for auth errors
5. **Use requireAuth middleware** for simpler code

---

**Created:** January 10, 2026  
**Status:** ✅ Active in all auth routes  
**Version:** 1.0.0
