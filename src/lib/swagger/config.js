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
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
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
  },
};
