# 📚 Swagger API Documentation Guide

## Overview

Complete Swagger/OpenAPI 3.0 documentation for all BooksExchange APIs with interactive testing interface.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install swagger-ui-react
```

### 2. Access Documentation
```
http://localhost:3000/api-docs
```

---

## 📁 File Structure

```
src/
├── lib/swagger/
│   └── config.js              # Swagger/OpenAPI configuration
├── app/
│   ├── api/swagger/
│   │   └── route.js           # Swagger JSON endpoint
│   └── api-docs/
│       └── page.js            # Swagger UI page
```

---

## 🎯 Available Endpoints

### **Authentication APIs** (7 endpoints)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ No |
| POST | `/api/auth/signin` | Login with email/password | ❌ No |
| POST | `/api/auth/google` | Login with Google OAuth | ❌ No |
| POST | `/api/auth/forgot-password` | Request password reset | ❌ No |
| POST | `/api/auth/reset-password` | Reset password with token | ❌ No |
| POST | `/api/auth/refresh` | Refresh access token | ❌ No |
| GET | `/api/auth/me` | Get current user | ✅ Yes |

---

## 🔧 How to Use Swagger UI

### 1. **Navigate to API Docs**
```
http://localhost:3000/api-docs
```

### 2. **Test Public Endpoints**
Click on any endpoint (e.g., `/api/auth/signup`) → Click "Try it out" → Fill in the request body → Click "Execute"

### 3. **Test Protected Endpoints**

**Step 1: Get Access Token**
- Use `/api/auth/signup` or `/api/auth/signin`
- Copy the `accessToken` from the response

**Step 2: Authorize**
- Click the green "Authorize" button at the top
- Enter: `Bearer YOUR_ACCESS_TOKEN`
- Click "Authorize" then "Close"

**Step 3: Test Protected Endpoints**
- Now you can test `/api/auth/me` or other protected endpoints
- The token will be automatically included in requests

---

## 📖 Swagger Configuration Structure

### Main Components:

```javascript
// src/lib/swagger/config.js
export const swaggerConfig = {
  openapi: '3.0.0',
  info: { /* API metadata */ },
  servers: [ /* API servers */ ],
  tags: [ /* Endpoint categories */ ],
  components: {
    securitySchemes: { /* Auth methods */ },
    schemas: { /* Data models */ },
  },
  paths: { /* API endpoints */ },
};
```

---

## 🔐 Security Configuration

### Bearer Token Authentication

Already configured in `swaggerConfig`:

```javascript
components: {
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT token in the format: Bearer <token>',
    },
  },
}
```

### Apply to Protected Endpoints:

```javascript
'/api/auth/me': {
  get: {
    security: [{ BearerAuth: [] }],
    // ... rest of config
  },
}
```

---

## 🎨 Reusable Schemas

### User Schema:
```javascript
User: {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string', format: 'email' },
    name: { type: 'string' },
    phone: { type: 'string', nullable: true },
    points: { type: 'integer' },
    profileImage: { type: 'string', nullable: true },
    createdAt: { type: 'string', format: 'date-time' },
  },
}
```

### Reference in Endpoints:
```javascript
schema: {
  $ref: '#/components/schemas/User',
}
```

---

## ➕ Adding New Endpoints

### Template for New Endpoint:

```javascript
// Add to swaggerConfig.paths in src/lib/swagger/config.js

'/api/books': {
  get: {
    tags: ['Books'],
    summary: 'Get all books',
    description: 'Retrieve list of all available books',
    
    // If authentication required
    security: [{ BearerAuth: [] }],
    
    // Query parameters
    parameters: [
      {
        name: 'page',
        in: 'query',
        description: 'Page number',
        required: false,
        schema: {
          type: 'integer',
          default: 1,
        },
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Items per page',
        required: false,
        schema: {
          type: 'integer',
          default: 10,
        },
      },
    ],
    
    // Request body (for POST/PUT)
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'author'],
            properties: {
              title: {
                type: 'string',
                example: 'The Great Book',
              },
              author: {
                type: 'string',
                example: 'John Doe',
              },
            },
          },
        },
      },
    },
    
    // Responses
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Book' },
                },
              },
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      500: {
        description: 'Server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
},
```

### Add New Schema:

```javascript
// Add to swaggerConfig.components.schemas

Book: {
  type: 'object',
  properties: {
    id: { type: 'string', example: 'book123' },
    title: { type: 'string', example: 'The Great Book' },
    author: { type: 'string', example: 'John Doe' },
    isbn: { type: 'string', example: '978-3-16-148410-0' },
    publishedDate: { type: 'string', format: 'date' },
    category: { type: 'string', example: 'Fiction' },
    description: { type: 'string' },
    coverImage: { type: 'string', format: 'uri' },
    available: { type: 'boolean', default: true },
    createdAt: { type: 'string', format: 'date-time' },
  },
},
```

### Add New Tag:

```javascript
// Add to swaggerConfig.tags

{
  name: 'Books',
  description: 'Book management endpoints',
},
```

---

## 🎯 Real-World Example: Books API

### Complete Implementation:

```javascript
// 1. Add tag
tags: [
  { name: 'Authentication', description: 'User authentication endpoints' },
  { name: 'Books', description: 'Book management endpoints' }, // NEW
],

// 2. Add schema
components: {
  schemas: {
    // ... existing schemas
    Book: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        author: { type: 'string' },
        isbn: { type: 'string' },
        category: { type: 'string' },
        available: { type: 'boolean' },
      },
    },
  },
},

// 3. Add endpoints
paths: {
  // ... existing paths
  '/api/books': {
    get: {
      tags: ['Books'],
      summary: 'Get all books',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'category',
          in: 'query',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Book' },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Books'],
      summary: 'Create new book',
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Book' },
          },
        },
      },
      responses: {
        201: {
          description: 'Book created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Book' },
            },
          },
        },
      },
    },
  },
  '/api/books/{id}': {
    get: {
      tags: ['Books'],
      summary: 'Get book by ID',
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Book' },
            },
          },
        },
        404: {
          description: 'Book not found',
        },
      },
    },
  },
},
```

---

## 🔍 Testing Workflow

### 1. Sign Up / Sign In
```
POST /api/auth/signup or /api/auth/signin
```
- Copy `accessToken` from response

### 2. Authorize
- Click "Authorize" button
- Enter: `Bearer YOUR_TOKEN`
- Click "Authorize"

### 3. Test Protected Endpoints
```
GET /api/auth/me
GET /api/books
POST /api/books
```

### 4. Test Error Cases
- Remove authorization
- Try invalid data
- Test validation errors

---

## 🎨 Customization

### Change Server URLs:

```javascript
servers: [
  {
    url: 'http://localhost:3000',
    description: 'Development',
  },
  {
    url: 'https://staging.booksexchange.com',
    description: 'Staging',
  },
  {
    url: 'https://api.booksexchange.com',
    description: 'Production',
  },
],
```

### Add API Info:

```javascript
info: {
  title: 'BooksExchange API',
  version: '2.0.0',
  description: 'Complete API for book exchange platform',
  termsOfService: 'https://booksexchange.com/terms',
  contact: {
    name: 'API Support',
    email: 'api@booksexchange.com',
    url: 'https://booksexchange.com/support',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
},
```

---

## 📊 Response Examples

### Multiple Examples:

```javascript
responses: {
  400: {
    description: 'Bad request',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Error' },
        examples: {
          missingField: {
            summary: 'Missing required field',
            value: { error: 'Title is required' },
          },
          invalidFormat: {
            summary: 'Invalid data format',
            value: { error: 'Invalid ISBN format' },
          },
          tooLong: {
            summary: 'Value too long',
            value: { error: 'Title must be less than 200 characters' },
          },
        },
      },
    },
  },
}
```

---

## 🔥 Pro Tips

1. **Always add examples** - Makes testing easier
2. **Use $ref for reusability** - Define schemas once, use everywhere
3. **Document error cases** - Show all possible error responses
4. **Add descriptions** - Explain what each endpoint does
5. **Group by tags** - Organize endpoints logically
6. **Security schemes** - Define auth methods clearly
7. **Version your API** - Use semantic versioning

---

## 🐛 Troubleshooting

### Swagger UI not loading:
```bash
npm install swagger-ui-react
```

### Changes not reflecting:
- Clear browser cache
- Restart dev server
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Authorization not working:
- Ensure token format: `Bearer <token>`
- Check token hasn't expired
- Verify security scheme is applied to endpoint

---

## 📚 Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Docs](https://swagger.io/tools/swagger-ui/)
- [OpenAPI Examples](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)

---

## ✅ Checklist for New Endpoints

- [ ] Add endpoint to `paths` in swagger config
- [ ] Define request/response schemas
- [ ] Add authentication if required
- [ ] Document all possible responses (200, 400, 401, 404, 500)
- [ ] Add examples for request/response
- [ ] Add query parameters if applicable
- [ ] Add path parameters if applicable
- [ ] Test in Swagger UI
- [ ] Verify authorization works
- [ ] Document error cases

---

**Created:** January 10, 2026  
**Status:** ✅ Production Ready  
**Access:** http://localhost:3000/api-docs
