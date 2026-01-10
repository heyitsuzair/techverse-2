/**
 * Swagger/OpenAPI Configuration
 * Complete API Documentation for BooksExchange
 */

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "BooksExchange API",
    version: "1.0.0",
    description:
      "Complete API documentation for BooksExchange authentication and core features",
    contact: {
      name: "BooksExchange Team",
      email: "support@booksexchange.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://api.booksexchange.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User authentication endpoints",
    },
    {
      name: "Users",
      description: "User profile management endpoints",
    },
    {
      name: "Books",
      description: "Book listing and marketplace endpoints",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token in the format: Bearer <token>",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "clx123abc456",
          },
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          phone: {
            type: "string",
            nullable: true,
            example: "+1234567890",
          },
          points: {
            type: "integer",
            example: 100,
          },
          profileImage: {
            type: "string",
            nullable: true,
            example: "https://example.com/avatar.jpg",
          },
          bio: {
            type: "string",
            nullable: true,
            example: "Book lover and avid reader",
          },
          locationAddress: {
            type: "string",
            nullable: true,
            example: "123 Main St, New York, NY 10001",
          },
          locationLat: {
            type: "number",
            format: "float",
            nullable: true,
            example: 40.7128,
          },
          locationLng: {
            type: "number",
            format: "float",
            nullable: true,
            example: -74.006,
          },
          booksListed: {
            type: "integer",
            example: 5,
            description: "Total number of books listed by the user",
          },
          totalExchanges: {
            type: "integer",
            example: 3,
            description: "Total number of completed exchanges",
          },
          currentPoints: {
            type: "integer",
            example: 100,
            description: "Current points balance",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T12:00:00.000Z",
          },
        },
      },
      PublicUser: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "clx123abc456",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          profileImage: {
            type: "string",
            nullable: true,
            example: "https://example.com/avatar.jpg",
          },
          bio: {
            type: "string",
            nullable: true,
            example: "Book lover and avid reader",
          },
          locationAddress: {
            type: "string",
            nullable: true,
            example: "123 Main St, New York, NY 10001",
          },
          locationLat: {
            type: "number",
            format: "float",
            nullable: true,
            example: 40.7128,
          },
          locationLng: {
            type: "number",
            format: "float",
            nullable: true,
            example: -74.006,
          },
          booksListed: {
            type: "integer",
            example: 5,
            description: "Total number of books listed by the user",
          },
          totalExchanges: {
            type: "integer",
            example: 3,
            description: "Total number of completed exchanges",
          },
          currentPoints: {
            type: "integer",
            example: 100,
            description: "Current points balance",
          },
          points: {
            type: "integer",
            example: 100,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
        },
      },
      Book: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "book-uuid",
          },
          title: {
            type: "string",
            example: "The Great Gatsby",
          },
          author: {
            type: "string",
            nullable: true,
            example: "F. Scott Fitzgerald",
          },
          isbn: {
            type: "string",
            nullable: true,
            example: "978-0-7432-7356-5",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A classic American novel...",
          },
          coverImage: {
            type: "string",
            nullable: true,
            example: "https://res.cloudinary.com/...",
          },
          qrCodeUrl: {
            type: "string",
            nullable: true,
            example: "https://res.cloudinary.com/.../qr_book-uuid.png",
          },
          genre: {
            type: "string",
            nullable: true,
            example: "Fiction",
          },
          condition: {
            type: "string",
            nullable: true,
            example: "good",
            enum: ["new", "excellent", "good", "fair", "poor"],
          },
          language: {
            type: "string",
            example: "English",
          },
          pointValue: {
            type: "integer",
            example: 10,
          },
          locationAddress: {
            type: "string",
            nullable: true,
            example: "New York, NY",
          },
          locationLat: {
            type: "number",
            format: "float",
            nullable: true,
            example: 40.7128,
          },
          locationLng: {
            type: "number",
            format: "float",
            nullable: true,
            example: -74.006,
          },
          isAvailable: {
            type: "boolean",
            example: true,
          },
          userId: {
            type: "string",
            example: "user-uuid",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T12:00:00.000Z",
          },
        },
      },
      BookHistory: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "history-uuid",
          },
          bookId: {
            type: "string",
            example: "book-uuid",
          },
          userId: {
            type: "string",
            example: "user-uuid",
          },
          action: {
            type: "string",
            example: "scanned",
            enum: ["scanned", "noted", "exchanged", "read", "reviewed"],
          },
          notes: {
            type: "string",
            nullable: true,
            example: "Found at Central Library",
          },
          locationAddress: {
            type: "string",
            nullable: true,
            example: "Central Library, 476 5th Ave, New York, NY 10018",
          },
          locationLat: {
            type: "number",
            format: "float",
            nullable: true,
            example: 40.7128,
          },
          locationLng: {
            type: "number",
            format: "float",
            nullable: true,
            example: -74.006,
          },
          startDate: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-01T00:00:00.000Z",
            description: "Start date for reading action",
          },
          endDate: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-10T00:00:00.000Z",
            description: "End date for reading action",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T11:00:00.000Z",
          },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Login successful",
          },
          user: {
            $ref: "#/components/schemas/User",
          },
          accessToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
          refreshToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
          expiresIn: {
            type: "string",
            example: "7d",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Error message",
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/signup": {
      post: {
        tags: ["Authentication"],
        summary: "Sign up with email and password",
        description: "Register a new user account with email/password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "name"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    example: "SecurePass123",
                  },
                  name: {
                    type: "string",
                    example: "John Doe",
                  },
                  phone: {
                    type: "string",
                    example: "+1234567890",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing or invalid fields",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  missingFields: {
                    value: {
                      error: "Missing required fields",
                    },
                  },
                  invalidEmail: {
                    value: {
                      error: "Invalid email format",
                    },
                  },
                  shortPassword: {
                    value: {
                      error: "Password must be at least 8 characters",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict - Email already exists",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "User with this email already exists",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/signin": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in with email and password",
        description: "Authenticate user with email/password credentials",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    example: "SecurePass123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse",
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing credentials",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Email and password are required",
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  invalidCredentials: {
                    value: {
                      error: "Invalid email or password",
                    },
                  },
                  googleAccount: {
                    value: {
                      error:
                        "This account uses Google Sign-In. Please sign in with Google.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/google": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in with Google OAuth",
        description: "Authenticate or register user with Google OAuth token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token"],
                properties: {
                  token: {
                    type: "string",
                    description: "Google ID token from frontend",
                    example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhMTFmZGE5...",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Google authentication successful",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/AuthResponse",
                    },
                    {
                      type: "object",
                      properties: {
                        isNewUser: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Google token is required",
                },
              },
            },
          },
          500: {
            description: "Failed to authenticate with Google",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Failed to authenticate with Google",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/forgot-password": {
      post: {
        tags: ["Authentication"],
        summary: "Request password reset",
        description: "Send password reset email to user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description:
              "Reset email sent (always returns success to prevent email enumeration)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example:
                        "If an account with that email exists, a password reset link has been sent.",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing email",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Email is required",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/reset-password": {
      post: {
        tags: ["Authentication"],
        summary: "Reset password with token",
        description: "Reset user password using token from email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token", "password"],
                properties: {
                  token: {
                    type: "string",
                    description: "Reset token from email",
                    example: "a1b2c3d4e5f6789012345678901234567890abcd",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    example: "NewSecurePass123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password reset successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Password reset successful",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid or expired token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  missingFields: {
                    value: {
                      error: "Token and password are required",
                    },
                  },
                  shortPassword: {
                    value: {
                      error: "Password must be at least 8 characters",
                    },
                  },
                  invalidToken: {
                    value: {
                      error: "Invalid or expired reset token",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/refresh": {
      post: {
        tags: ["Authentication"],
        summary: "Refresh access token",
        description: "Get new access token using refresh token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Token refreshed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    accessToken: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    refreshToken: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    expiresIn: {
                      type: "string",
                      example: "7d",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing refresh token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Refresh token is required",
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid refresh token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Invalid or expired refresh token",
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "User not found",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current user",
        description: "Get authenticated user information",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - No token or invalid token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  noToken: {
                    value: {
                      error: "No authorization header provided",
                    },
                  },
                  invalidFormat: {
                    value: {
                      error:
                        "Invalid authorization header format. Expected: Bearer <token>",
                    },
                  },
                  expiredToken: {
                    value: {
                      error: "Invalid or expired token",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "User not found",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/users/me": {
      put: {
        tags: ["Users"],
        summary: "Update current user profile",
        description:
          "Update authenticated user profile information including name, email, phone, bio, location (address, lat, lng), and profile image",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "User's full name",
                    example: "John Doe",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email address",
                    example: "john.doe@example.com",
                  },
                  phone: {
                    type: "string",
                    description: "User's phone number (optional)",
                    example: "+1234567890",
                  },
                  bio: {
                    type: "string",
                    description: "User's bio/description (optional)",
                    example: "Book lover and avid reader",
                  },
                  locationAddress: {
                    type: "string",
                    description: "User's location address (optional)",
                    example: "123 Main St, New York, NY 10001",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    description: "Location latitude (optional)",
                    example: 40.7128,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    description: "Location longitude (optional)",
                    example: -74.006,
                  },
                  profileImage: {
                    type: "string",
                    format: "binary",
                    description:
                      "Profile image file (jpg, jpeg, png, gif, webp)",
                  },
                },
              },
              examples: {
                updateBasicInfo: {
                  summary: "Update basic information",
                  value: {
                    name: "Jane Smith",
                    bio: "Passionate about classic literature",
                    locationAddress: "San Francisco, CA",
                  },
                },
                updateWithLocation: {
                  summary: "Update with full location",
                  value: {
                    name: "Jane Smith",
                    locationAddress: "456 Market St, San Francisco, CA 94103",
                    locationLat: 37.7749,
                    locationLng: -122.4194,
                  },
                },
                updateWithImage: {
                  summary: "Update with profile image",
                  value: {
                    name: "Jane Smith",
                    profileImage: "(binary file data)",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Profile updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Profile updated successfully",
                    },
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Email already in use",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Email already in use",
                },
              },
            },
          },
          401: {
            description: "Unauthorized - No token or invalid token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description:
              "Internal server error - Failed to upload image or update profile",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  uploadError: {
                    value: {
                      error: "Failed to upload profile image",
                    },
                  },
                  serverError: {
                    value: {
                      error: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get other user's public profile",
        description:
          "Get public profile information of any user by their ID (no authentication required)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User ID",
            schema: {
              type: "string",
              example: "clx123abc456",
            },
          },
        ],
        responses: {
          200: {
            description: "User profile retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      $ref: "#/components/schemas/PublicUser",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - User ID is required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "User ID is required",
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "User not found",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/books": {
      get: {
        tags: ["Books"],
        summary: "Get all books (Marketplace)",
        description:
          "Browse all available books with filtering, search, and pagination",
        parameters: [
          {
            name: "genre",
            in: "query",
            description: "Filter by genre",
            schema: {
              type: "string",
              example: "Fiction",
            },
          },
          {
            name: "condition",
            in: "query",
            description: "Filter by condition",
            schema: {
              type: "string",
              enum: ["new", "excellent", "good", "fair", "poor"],
              example: "good",
            },
          },
          {
            name: "location",
            in: "query",
            description: "Search in location address",
            schema: {
              type: "string",
              example: "New York",
            },
          },
          {
            name: "search",
            in: "query",
            description: "Search in title, author, description",
            schema: {
              type: "string",
              example: "gatsby",
            },
          },
          {
            name: "userId",
            in: "query",
            description: "Filter by book owner",
            schema: {
              type: "string",
              example: "user-uuid",
            },
          },
          {
            name: "page",
            in: "query",
            description: "Page number",
            schema: {
              type: "integer",
              default: 1,
              example: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Items per page",
            schema: {
              type: "integer",
              default: 20,
              example: 20,
            },
          },
        ],
        responses: {
          200: {
            description: "Books retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    books: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Book",
                      },
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        page: {
                          type: "integer",
                          example: 1,
                        },
                        limit: {
                          type: "integer",
                          example: 20,
                        },
                        total: {
                          type: "integer",
                          example: 50,
                        },
                        totalPages: {
                          type: "integer",
                          example: 3,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Create a new book listing",
        description:
          "List a new book on the marketplace with automatic QR code generation",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["title", "genre", "condition"],
                properties: {
                  title: {
                    type: "string",
                    description: "Book title",
                    example: "The Great Gatsby",
                  },
                  author: {
                    type: "string",
                    description: "Author name",
                    example: "F. Scott Fitzgerald",
                  },
                  isbn: {
                    type: "string",
                    description: "ISBN number",
                    example: "978-0-7432-7356-5",
                  },
                  description: {
                    type: "string",
                    description: "Book description",
                    example: "A classic American novel",
                  },
                  genre: {
                    type: "string",
                    description: "Book genre",
                    example: "Fiction",
                  },
                  condition: {
                    type: "string",
                    description: "Book condition",
                    enum: ["new", "excellent", "good", "fair", "poor"],
                    example: "good",
                  },
                  language: {
                    type: "string",
                    description: "Book language",
                    example: "English",
                  },
                  pointValue: {
                    type: "integer",
                    description: "Points required for exchange",
                    example: 10,
                  },
                  locationAddress: {
                    type: "string",
                    description: "Book location address",
                    example: "New York, NY",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    description: "Latitude",
                    example: 40.7128,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    description: "Longitude",
                    example: -74.006,
                  },
                  coverImage: {
                    type: "string",
                    format: "binary",
                    description: "Cover image file",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book created successfully with QR code",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Book listed successfully",
                    },
                    book: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing required fields",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Title, genre, and condition are required",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/books/{id}": {
      get: {
        tags: ["Books"],
        summary: "Get book details",
        description: "Get detailed information about a specific book",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: {
              type: "string",
              example: "book-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Book retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    book: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Book ID required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Book not found",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Books"],
        summary: "Update book details",
        description: "Update book information (owner only)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: {
              type: "string",
              example: "book-uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Updated Title",
                  },
                  author: {
                    type: "string",
                    example: "Author Name",
                  },
                  description: {
                    type: "string",
                    example: "Updated description",
                  },
                  condition: {
                    type: "string",
                    enum: ["new", "excellent", "good", "fair", "poor"],
                    example: "good",
                  },
                  isAvailable: {
                    type: "boolean",
                    example: true,
                  },
                  coverImage: {
                    type: "string",
                    format: "binary",
                    description: "New cover image",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Book updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Book updated successfully",
                    },
                    book: {
                      $ref: "#/components/schemas/Book",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Forbidden - Not book owner",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "You don't have permission to update this book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Books"],
        summary: "Delete a book",
        description: "Delete a book listing (owner only)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: {
              type: "string",
              example: "book-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Book deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Book deleted successfully",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Forbidden - Not book owner",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "You don't have permission to delete this book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/books/{id}/history": {
      get: {
        tags: ["Books"],
        summary: "Get book history",
        description: "Get all history entries for a book",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: {
              type: "string",
              example: "book-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "History retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    history: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/BookHistory",
                      },
                    },
                    total: {
                      type: "integer",
                      example: 5,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Book ID required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Books"],
        summary: "Add book history entry",
        description: "Add a history entry (QR scan, note, etc.)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Book ID",
            schema: {
              type: "string",
              example: "book-uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["action"],
                properties: {
                  action: {
                    type: "string",
                    enum: ["scanned", "noted", "exchanged", "read", "reviewed"],
                    example: "scanned",
                    description: "Type of action performed with the book",
                  },
                  notes: {
                    type: "string",
                    example: "Found this book at Central Library",
                    description: "Optional notes about the action",
                  },
                  locationAddress: {
                    type: "string",
                    example: "Central Library, 476 5th Ave, New York, NY 10018",
                    description: "Full address where action occurred",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    example: 40.7128,
                    description: "Latitude coordinate",
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    example: -74.006,
                    description: "Longitude coordinate",
                  },
                  startDate: {
                    type: "string",
                    format: "date-time",
                    example: "2026-01-01T00:00:00.000Z",
                    description:
                      "Start date when you began reading the book (optional, typically used with action='read'). Format: ISO 8601 date-time string",
                  },
                  endDate: {
                    type: "string",
                    format: "date-time",
                    example: "2026-01-10T00:00:00.000Z",
                    description:
                      "End date when you finished reading the book (optional, typically used with action='read'). Format: ISO 8601 date-time string",
                  },
                },
              },
              examples: {
                scan: {
                  summary: "QR code scan (with location)",
                  value: {
                    action: "scanned",
                    notes: "Found at local coffee shop",
                    locationAddress: "Starbucks, 123 Main St, NYC",
                    locationLat: 40.7128,
                    locationLng: -74.006,
                  },
                },
                reading: {
                  summary: "Reading record (with dates)",
                  value: {
                    action: "read",
                    notes: "Great story, highly recommend!",
                    locationAddress: "Home",
                    locationLat: 40.7128,
                    locationLng: -74.006,
                    startDate: "2026-01-01T00:00:00.000Z",
                    endDate: "2026-01-10T00:00:00.000Z",
                  },
                },
                readingInProgress: {
                  summary: "Started reading (only startDate)",
                  value: {
                    action: "read",
                    notes: "Just started this book today!",
                    startDate: "2026-01-10T00:00:00.000Z",
                  },
                },
                review: {
                  summary: "Book review (no dates needed)",
                  value: {
                    action: "reviewed",
                    notes: "Five stars! Amazing plot and characters.",
                  },
                },
                exchange: {
                  summary: "Book exchange (with location)",
                  value: {
                    action: "exchanged",
                    notes: "Exchanged with John at library",
                    locationAddress: "Public Library, Downtown",
                    locationLat: 40.7589,
                    locationLng: -73.9851,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "History entry added successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "History entry added successfully",
                    },
                    history: {
                      $ref: "#/components/schemas/BookHistory",
                    },
                  },
                },
                example: {
                  success: true,
                  message: "History entry added successfully",
                  history: {
                    id: "history-uuid-123",
                    bookId: "book-uuid-456",
                    userId: "user-uuid-789",
                    action: "read",
                    notes: "Finished reading, excellent book!",
                    locationAddress: "Home Library, 123 Main St, NYC",
                    locationLat: 40.7128,
                    locationLng: -74.006,
                    startDate: "2026-01-01T00:00:00.000Z",
                    endDate: "2026-01-10T00:00:00.000Z",
                    createdAt: "2026-01-10T15:30:00.000Z",
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Action required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Action is required",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
};
