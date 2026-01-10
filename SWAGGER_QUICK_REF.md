# 🚀 Quick Reference: Adding Swagger Documentation for New Routes

## ⚡ Fast Template

```javascript
// src/lib/swagger/config.js

// 1. ADD TAG (if new category)
tags: [
  { name: 'YourCategory', description: 'Description here' },
],

// 2. ADD SCHEMA (if new data model)
components: {
  schemas: {
    YourModel: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'abc123' },
        name: { type: 'string', example: 'Example' },
        // ... more fields
      },
    },
  },
},

// 3. ADD ENDPOINT
paths: {
  '/api/your-route': {
    get: {
      tags: ['YourCategory'],
      summary: 'Short description',
      description: 'Detailed description',
      
      // If authentication required:
      security: [{ BearerAuth: [] }],
      
      // Query parameters:
      parameters: [
        {
          name: 'paramName',
          in: 'query',
          required: false,
          schema: { type: 'string' },
        },
      ],
      
      // For POST/PUT - Request body:
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['field1'],
              properties: {
                field1: { type: 'string', example: 'value' },
              },
            },
          },
        },
      },
      
      // Responses:
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/YourModel' },
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
      },
    },
  },
},
```

---

## 📋 Common Patterns

### GET Endpoint (List with Pagination)
```javascript
'/api/books': {
  get: {
    tags: ['Books'],
    summary: 'Get all books',
    security: [{ BearerAuth: [] }],
    parameters: [
      { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
      { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
      { name: 'search', in: 'query', schema: { type: 'string' } },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: { type: 'array', items: { $ref: '#/components/schemas/Book' } },
                pagination: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                    total: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
```

### GET by ID
```javascript
'/api/books/{id}': {
  get: {
    tags: ['Books'],
    summary: 'Get book by ID',
    security: [{ BearerAuth: [] }],
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
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
        description: 'Not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
}
```

### POST (Create)
```javascript
post: {
  tags: ['Books'],
  summary: 'Create new book',
  security: [{ BearerAuth: [] }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['title', 'author'],
          properties: {
            title: { type: 'string', example: 'Book Title' },
            author: { type: 'string', example: 'Author Name' },
            isbn: { type: 'string', example: '978-3-16-148410-0' },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Book' },
        },
      },
    },
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
        },
      },
    },
  },
}
```

### PUT (Update)
```javascript
put: {
  tags: ['Books'],
  summary: 'Update book',
  security: [{ BearerAuth: [] }],
  parameters: [
    { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Updated',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Book' },
        },
      },
    },
    404: { description: 'Not found' },
  },
}
```

### DELETE
```javascript
delete: {
  tags: ['Books'],
  summary: 'Delete book',
  security: [{ BearerAuth: [] }],
  parameters: [
    { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
  ],
  responses: {
    200: {
      description: 'Deleted',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    404: { description: 'Not found' },
  },
}
```

---

## 🎯 Common Data Types

```javascript
// String
{ type: 'string', example: 'text' }

// Email
{ type: 'string', format: 'email', example: 'user@example.com' }

// URL
{ type: 'string', format: 'uri', example: 'https://example.com' }

// Date
{ type: 'string', format: 'date', example: '2026-01-10' }

// DateTime
{ type: 'string', format: 'date-time', example: '2026-01-10T10:00:00Z' }

// Integer
{ type: 'integer', example: 42 }

// Number (float)
{ type: 'number', format: 'float', example: 42.5 }

// Boolean
{ type: 'boolean', example: true }

// Array
{ type: 'array', items: { type: 'string' } }

// Object
{ type: 'object', properties: { key: { type: 'string' } } }

// Enum
{ type: 'string', enum: ['option1', 'option2'], example: 'option1' }

// Nullable
{ type: 'string', nullable: true, example: null }
```

---

## ⚡ Speed Shortcuts

### 1. Copy Existing Endpoint
Find similar endpoint → Copy → Modify

### 2. Reuse Schemas
```javascript
schema: { $ref: '#/components/schemas/Book' }
```

### 3. Standard Error Response
```javascript
content: {
  'application/json': {
    schema: { $ref: '#/components/schemas/Error' },
  },
}
```

### 4. Common Response Structure
```javascript
{
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: { /* your data */ },
  },
}
```

---

## ✅ Checklist

New Endpoint Checklist:
- [ ] Added to correct path in `swaggerConfig.paths`
- [ ] Correct HTTP method (get/post/put/delete)
- [ ] Tag added/referenced
- [ ] Summary and description provided
- [ ] Security added if protected
- [ ] Parameters documented (path/query)
- [ ] Request body documented (if POST/PUT)
- [ ] All response codes documented (200, 400, 401, 404, 500)
- [ ] Examples provided
- [ ] Tested in Swagger UI

---

## 🔥 Pro Tips

1. **Start with existing similar endpoint** - Copy and modify
2. **Test as you go** - Check Swagger UI after each addition
3. **Use examples** - Makes testing much easier
4. **Document errors** - Show what can go wrong
5. **Consistent naming** - Use same patterns across API
6. **Group logically** - Use tags to organize

---

## 🚀 Access Swagger UI

```
http://localhost:3000/api-docs
```

---

**Quick File Reference:**
- Config: `src/lib/swagger/config.js`
- API: `src/app/api/swagger/route.js`
- UI: `src/app/api-docs/page.js`
- Docs: `SWAGGER_DOCUMENTATION.md`
