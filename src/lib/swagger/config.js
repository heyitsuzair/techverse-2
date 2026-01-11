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
    {
      name: "Socket Messages",
      description: "Real-time chat message endpoints",
    },
    {
      name: "Stalls",
      description: "Exchange point stall management endpoints",
    },
    {
      name: "Exchanges",
      description: "Book exchange request and management endpoints",
    },
    {
      name: "Forums",
      description: "Book discussion forum endpoints",
    },
    {
      name: "Payments",
      description: "Payment and point purchase endpoints",
    },
    {
      name: "Reports",
      description: "Content reporting and moderation endpoints",
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
      BookValuation: {
        type: "object",
        properties: {
          bookId: {
            type: "string",
            example: "book-uuid",
          },
          bookTitle: {
            type: "string",
            example: "The Great Gatsby",
          },
          finalValue: {
            type: "integer",
            example: 285,
            description: "Final point value calculated by AI (10-500)",
          },
          aiReasoning: {
            type: "string",
            example:
              "This classic American novel in excellent condition commands premium value. The author's literary significance and the book's enduring popularity justify the higher point allocation. Excellent condition adds substantial value for collectors.",
            description: "AI-generated explanation of the valuation",
          },
          method: {
            type: "string",
            enum: ["gemini-ai", "fallback"],
            example: "gemini-ai",
            description: "Valuation method used",
          },
          breakdown: {
            type: "object",
            properties: {
              condition: {
                type: "object",
                properties: {
                  value: {
                    type: "string",
                    example: "excellent",
                  },
                  multiplier: {
                    type: "number",
                    example: 1.3,
                  },
                  impact: {
                    type: "string",
                    example: "+30%",
                  },
                },
              },
              demand: {
                type: "object",
                properties: {
                  recentRequests: {
                    type: "integer",
                    example: 8,
                  },
                  score: {
                    type: "string",
                    example: "4/5",
                  },
                  multiplier: {
                    type: "number",
                    example: 1.4,
                  },
                  impact: {
                    type: "string",
                    example: "+40%",
                  },
                },
              },
              rarity: {
                type: "object",
                properties: {
                  score: {
                    type: "string",
                    example: "2/3",
                  },
                  multiplier: {
                    type: "number",
                    example: 1.4,
                  },
                  impact: {
                    type: "string",
                    example: "+40%",
                  },
                },
              },
            },
          },
        },
      },
      BookAnalytics: {
        type: "object",
        description:
          "Complete analytics for a book including point value trends, reading journey, and community discussions",
        properties: {
          pointValueTrend: {
            type: "object",
            properties: {
              currentValue: {
                type: "integer",
                example: 285,
                description: "Current point value of the book",
              },
              trend: {
                type: "array",
                description: "Monthly trend data for the last 6 months",
                items: {
                  type: "object",
                  properties: {
                    month: {
                      type: "string",
                      example: "Jan 2026",
                    },
                    averagePoints: {
                      type: "integer",
                      example: 270,
                    },
                    offersCount: {
                      type: "integer",
                      example: 3,
                    },
                    highestOffer: {
                      type: "integer",
                      example: 300,
                    },
                    lowestOffer: {
                      type: "integer",
                      example: 250,
                    },
                  },
                },
              },
              trendDirection: {
                type: "string",
                enum: ["increasing", "decreasing", "stable"],
                example: "increasing",
              },
              percentageChange: {
                type: "integer",
                example: 12,
                description: "Percentage change over the period",
              },
              totalOffers: {
                type: "integer",
                example: 8,
                description: "Total number of exchange offers",
              },
              analysis: {
                type: "string",
                example:
                  "Point value has increased by 12% over the past 6 months, indicating growing demand. Based on 8 offer(s).",
              },
            },
          },
          readingJourney: {
            type: "object",
            properties: {
              timeline: {
                type: "array",
                description: "Chronological timeline of the book's journey",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: [
                        "listed",
                        "exchanged",
                        "read",
                        "reviewed",
                        "noted",
                      ],
                      example: "exchanged",
                    },
                    date: {
                      type: "string",
                      format: "date-time",
                      example: "2025-12-15T10:00:00.000Z",
                    },
                    description: {
                      type: "string",
                      example: "Exchanged from Alice to Bob",
                    },
                    location: {
                      type: "string",
                      nullable: true,
                      example: "Brooklyn, NY",
                    },
                    points: {
                      type: "integer",
                      nullable: true,
                      example: 270,
                    },
                  },
                },
              },
              statistics: {
                type: "object",
                properties: {
                  totalReaders: {
                    type: "integer",
                    example: 5,
                    description: "Number of unique readers",
                  },
                  totalExchanges: {
                    type: "integer",
                    example: 8,
                    description: "Total exchange transactions",
                  },
                  uniqueLocations: {
                    type: "integer",
                    example: 3,
                    description: "Number of different locations",
                  },
                  daysSinceListing: {
                    type: "integer",
                    example: 145,
                  },
                  averageDaysPerReader: {
                    type: "integer",
                    example: 18,
                  },
                },
              },
              currentOwner: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    example: "user-uuid",
                  },
                  name: {
                    type: "string",
                    example: "John Doe",
                  },
                  profileImage: {
                    type: "string",
                    nullable: true,
                    example: "https://res.cloudinary.com/.../profile.jpg",
                  },
                },
              },
            },
          },
          communityDiscussions: {
            type: "object",
            properties: {
              threads: {
                type: "array",
                description: "Top 5 forum threads for this book",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "thread-uuid",
                    },
                    title: {
                      type: "string",
                      example: "What did you think of Chapter 3?",
                    },
                    contentPreview: {
                      type: "string",
                      example:
                        "I found the plot twist absolutely surprising! The way the author revealed...",
                    },
                    chapter: {
                      type: "string",
                      nullable: true,
                      example: "Chapter 3",
                    },
                    tags: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      example: ["discussion", "spoiler"],
                    },
                    isPinned: {
                      type: "boolean",
                      example: false,
                    },
                    isLocked: {
                      type: "boolean",
                      example: false,
                    },
                    viewCount: {
                      type: "integer",
                      example: 142,
                    },
                    commentCount: {
                      type: "integer",
                      example: 23,
                    },
                    likeCount: {
                      type: "integer",
                      example: 15,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2026-01-05T10:30:00.000Z",
                    },
                    author: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          nullable: true,
                          example: "user-uuid",
                        },
                        name: {
                          type: "string",
                          example: "Alice Johnson",
                        },
                        profileImage: {
                          type: "string",
                          nullable: true,
                          example: "https://res.cloudinary.com/.../avatar.jpg",
                        },
                        isAnonymous: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
              statistics: {
                type: "object",
                properties: {
                  totalThreads: {
                    type: "integer",
                    example: 12,
                  },
                  totalComments: {
                    type: "integer",
                    example: 87,
                  },
                  totalDiscussions: {
                    type: "integer",
                    example: 99,
                  },
                  uniqueParticipants: {
                    type: "integer",
                    example: 24,
                  },
                  popularChapters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        chapter: {
                          type: "string",
                          example: "Chapter 3",
                        },
                        discussionCount: {
                          type: "integer",
                          example: 5,
                        },
                      },
                    },
                  },
                },
              },
              hasMoreThreads: {
                type: "boolean",
                example: true,
              },
            },
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
      ChatMessage: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "msg_1234567890_user_456",
            description: "Unique message identifier",
          },
          roomId: {
            type: "string",
            example: "room_123",
            description: "The ID of the chat room this message belongs to",
          },
          userId: {
            type: "string",
            example: "user_456",
            description: "The ID of the user who sent the message",
          },
          userName: {
            type: "string",
            example: "John Doe",
            description: "The name of the user who sent the message",
          },
          message: {
            type: "string",
            example: "Hello, everyone!",
            description: "The message content",
          },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
            description: "When the message was sent",
          },
        },
        required: ["id", "roomId", "userId", "message", "timestamp"],
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
      Stall: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "stall-uuid",
          },
          name: {
            type: "string",
            example: "Central Library Book Exchange",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A community book exchange point",
          },
          locationAddress: {
            type: "string",
            example: "123 Main St, New York, NY 10001",
          },
          locationLat: {
            type: "number",
            format: "float",
            example: 40.7128,
          },
          locationLng: {
            type: "number",
            format: "float",
            example: -74.006,
          },
          contactName: {
            type: "string",
            nullable: true,
            example: "John Doe",
          },
          contactPhone: {
            type: "string",
            nullable: true,
            example: "+1234567890",
          },
          contactEmail: {
            type: "string",
            format: "email",
            nullable: true,
            example: "contact@example.com",
          },
          operatingHours: {
            type: "string",
            nullable: true,
            example: "Monday-Friday: 9AM-5PM",
          },
          availableGenres: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["Fiction", "Non-Fiction", "Mystery"],
          },
          photos: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["https://res.cloudinary.com/.../stall1.jpg"],
          },
          isActive: {
            type: "boolean",
            example: true,
          },
          ownerId: {
            type: "string",
            example: "user-uuid",
          },
          distance: {
            type: "number",
            format: "float",
            nullable: true,
            example: 2.5,
            description: "Distance in km (only in GET /api/stalls response)",
          },
          owner: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "user-uuid",
              },
              name: {
                type: "string",
                example: "John Doe",
              },
              profileImage: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/.../profile.jpg",
              },
              phone: {
                type: "string",
                nullable: true,
                example: "+1234567890",
              },
            },
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
      Exchange: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "exchange-uuid",
          },
          bookId: {
            type: "string",
            example: "book-uuid",
          },
          requesterId: {
            type: "string",
            example: "user-uuid-requester",
          },
          ownerId: {
            type: "string",
            example: "user-uuid-owner",
          },
          status: {
            type: "string",
            enum: ["pending", "accepted", "declined", "completed", "cancelled"],
            example: "pending",
          },
          message: {
            type: "string",
            nullable: true,
            example: "I'd love to exchange this book!",
          },
          meetingAddress: {
            type: "string",
            nullable: true,
            example: "Central Park, New York, NY",
          },
          meetingLat: {
            type: "number",
            format: "float",
            nullable: true,
            example: 40.7829,
          },
          meetingLng: {
            type: "number",
            format: "float",
            nullable: true,
            example: -73.9654,
          },
          scheduledAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-15T14:00:00.000Z",
          },
          pointsOffered: {
            type: "integer",
            example: 100,
          },
          pointsAccepted: {
            type: "integer",
            nullable: true,
            example: 100,
          },
          book: {
            type: "object",
            nullable: true,
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
              coverImage: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/.../cover.jpg",
              },
            },
          },
          requester: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "user-uuid-requester",
              },
              name: {
                type: "string",
                example: "Alice Smith",
              },
              profileImage: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/.../alice.jpg",
              },
            },
          },
          owner: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "user-uuid-owner",
              },
              name: {
                type: "string",
                example: "John Doe",
              },
              profileImage: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/.../profile.jpg",
              },
            },
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
      ForumThread: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "thread-uuid",
          },
          bookId: {
            type: "string",
            example: "book-uuid",
          },
          title: {
            type: "string",
            example: "What did you think of Chapter 3?",
          },
          content: {
            type: "string",
            example: "I found the plot twist absolutely surprising!",
          },
          chapter: {
            type: "string",
            nullable: true,
            example: "Chapter 3",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["discussion", "spoiler"],
          },
          isPinned: {
            type: "boolean",
            example: false,
          },
          isLocked: {
            type: "boolean",
            example: false,
          },
          isAnonymous: {
            type: "boolean",
            example: false,
          },
          authorName: {
            type: "string",
            nullable: true,
            example: "BookLover42",
            description: "Used when isAnonymous is true",
          },
          viewCount: {
            type: "integer",
            example: 142,
          },
          commentCount: {
            type: "integer",
            example: 23,
          },
          likeCount: {
            type: "integer",
            example: 15,
          },
          author: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "user-uuid",
              },
              name: {
                type: "string",
                example: "John Doe",
              },
            },
          },
          book: {
            type: "object",
            nullable: true,
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
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-05T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-05T12:00:00.000Z",
          },
        },
      },
      ForumComment: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "comment-uuid",
          },
          threadId: {
            type: "string",
            example: "thread-uuid",
          },
          content: {
            type: "string",
            example: "I completely agree with your analysis!",
          },
          isAnonymous: {
            type: "boolean",
            example: false,
          },
          authorName: {
            type: "string",
            nullable: true,
            example: "Reader123",
            description: "Used when isAnonymous is true",
          },
          likeCount: {
            type: "integer",
            example: 5,
          },
          author: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "user-uuid",
              },
              name: {
                type: "string",
                example: "John Doe",
              },
            },
          },
          thread: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "thread-uuid",
              },
              title: {
                type: "string",
                example: "What did you think of Chapter 3?",
              },
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-05T11:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-05T11:00:00.000Z",
          },
        },
      },
      PaymentPackage: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "package-uuid",
          },
          name: {
            type: "string",
            example: "Starter Pack",
          },
          points: {
            type: "integer",
            example: 100,
          },
          price: {
            type: "number",
            format: "float",
            example: 9.99,
          },
          currency: {
            type: "string",
            example: "USD",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
        },
      },
      Payment: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "payment-uuid",
          },
          userId: {
            type: "string",
            example: "user-uuid",
          },
          packageId: {
            type: "string",
            nullable: true,
            example: "package-uuid",
          },
          amount: {
            type: "number",
            format: "float",
            example: 9.99,
          },
          currency: {
            type: "string",
            example: "USD",
          },
          points: {
            type: "integer",
            example: 100,
          },
          status: {
            type: "string",
            enum: ["pending", "completed", "failed", "refunded"],
            example: "completed",
          },
          stripeSessionId: {
            type: "string",
            nullable: true,
            example: "cs_test_...",
          },
          stripePaymentIntentId: {
            type: "string",
            nullable: true,
            example: "pi_...",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:05:00.000Z",
          },
        },
      },
      Report: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "report-uuid",
          },
          reporterId: {
            type: "string",
            example: "user-uuid-reporter",
          },
          reportedUserId: {
            type: "string",
            nullable: true,
            example: "user-uuid-reported",
          },
          contentType: {
            type: "string",
            enum: ["book", "forum_thread", "forum_comment", "user", "exchange"],
            example: "forum_thread",
          },
          contentId: {
            type: "string",
            example: "thread-uuid",
          },
          reason: {
            type: "string",
            enum: [
              "spam",
              "harassment",
              "inappropriate_content",
              "fake_information",
              "other",
            ],
            example: "inappropriate_content",
          },
          description: {
            type: "string",
            nullable: true,
            example: "This thread contains offensive language",
          },
          status: {
            type: "string",
            enum: ["pending", "resolved", "dismissed"],
            example: "pending",
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
            description: "Book retrieved successfully with AI valuation",
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
                    valuation: {
                      $ref: "#/components/schemas/BookValuation",
                    },
                    analytics: {
                      $ref: "#/components/schemas/BookAnalytics",
                    },
                  },
                },
                example: {
                  success: true,
                  book: {
                    id: "book-uuid",
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    isbn: "978-0-7432-7356-5",
                    description: "A classic American novel set in the Jazz Age",
                    coverImage: "https://res.cloudinary.com/.../cover.jpg",
                    qrCodeUrl:
                      "https://res.cloudinary.com/.../qr_book-uuid.png",
                    genre: "Fiction",
                    condition: "excellent",
                    language: "English",
                    pointValue: 10,
                    locationAddress: "New York, NY",
                    locationLat: 40.7128,
                    locationLng: -74.006,
                    isAvailable: true,
                    userId: "user-uuid",
                    publicationYear: 1925,
                    createdAt: "2026-01-10T10:00:00.000Z",
                    updatedAt: "2026-01-10T12:00:00.000Z",
                    user: {
                      id: "user-uuid",
                      name: "John Doe",
                      profileImage:
                        "https://res.cloudinary.com/.../profile.jpg",
                      locationAddress: "New York, NY",
                      points: 150,
                    },
                    _count: {
                      exchanges: 8,
                      bookHistory: 3,
                    },
                  },
                  valuation: {
                    bookId: "book-uuid",
                    bookTitle: "The Great Gatsby",
                    finalValue: 285,
                    aiReasoning:
                      "This classic American novel in excellent condition commands premium value. The author's literary significance and the book's enduring popularity justify the higher point allocation. Excellent condition adds substantial value for collectors.",
                    method: "gemini-ai",
                    breakdown: {
                      condition: {
                        value: "excellent",
                        multiplier: 1.3,
                        impact: "+30%",
                      },
                      demand: {
                        recentRequests: 8,
                        score: "4/5",
                        multiplier: 1.4,
                        impact: "+40%",
                      },
                      rarity: {
                        score: "2/3",
                        multiplier: 1.4,
                        impact: "+40%",
                      },
                    },
                  },
                  analytics: {
                    pointValueTrend: {
                      currentValue: 285,
                      trend: [
                        {
                          month: "Aug 2025",
                          averagePoints: 245,
                          offersCount: 1,
                          highestOffer: 245,
                          lowestOffer: 245,
                        },
                        {
                          month: "Sep 2025",
                          averagePoints: 250,
                          offersCount: 2,
                          highestOffer: 260,
                          lowestOffer: 240,
                        },
                        {
                          month: "Oct 2025",
                          averagePoints: 270,
                          offersCount: 1,
                          highestOffer: 270,
                          lowestOffer: 270,
                        },
                        {
                          month: "Nov 2025",
                          averagePoints: 275,
                          offersCount: 2,
                          highestOffer: 290,
                          lowestOffer: 260,
                        },
                        {
                          month: "Dec 2025",
                          averagePoints: 280,
                          offersCount: 1,
                          highestOffer: 280,
                          lowestOffer: 280,
                        },
                        {
                          month: "Jan 2026",
                          averagePoints: 285,
                          offersCount: 1,
                          highestOffer: 285,
                          lowestOffer: 285,
                        },
                      ],
                      trendDirection: "increasing",
                      percentageChange: 16,
                      totalOffers: 8,
                      analysis:
                        "Point value has increased by 16% over the past 6 months, indicating growing demand. Based on 8 offer(s).",
                    },
                    readingJourney: {
                      timeline: [
                        {
                          type: "listed",
                          date: "2025-08-10T10:00:00.000Z",
                          user: {
                            id: "user-uuid-1",
                            name: "Alice Smith",
                            profileImage:
                              "https://res.cloudinary.com/.../alice.jpg",
                          },
                          description: "Listed by Alice Smith",
                          location: null,
                          points: null,
                        },
                        {
                          type: "exchanged",
                          date: "2025-09-15T14:30:00.000Z",
                          from: {
                            id: "user-uuid-1",
                            name: "Alice Smith",
                            profileImage:
                              "https://res.cloudinary.com/.../alice.jpg",
                            locationAddress: "Manhattan, NY",
                          },
                          to: {
                            id: "user-uuid-2",
                            name: "Bob Johnson",
                            profileImage:
                              "https://res.cloudinary.com/.../bob.jpg",
                            locationAddress: "Brooklyn, NY",
                          },
                          description:
                            "Exchanged from Alice Smith to Bob Johnson",
                          location: "Brooklyn, NY",
                          points: 245,
                          exchangeId: "exchange-uuid-1",
                        },
                        {
                          type: "read",
                          date: "2025-10-20T09:00:00.000Z",
                          user: {
                            id: "user-uuid-2",
                            name: "Bob Johnson",
                            profileImage:
                              "https://res.cloudinary.com/.../bob.jpg",
                          },
                          description: "Read by Bob Johnson",
                          notes:
                            "Absolutely loved it! One of the best classics I've read.",
                          location: "Brooklyn, NY",
                          historyId: "history-uuid-1",
                        },
                        {
                          type: "exchanged",
                          date: "2025-11-05T16:00:00.000Z",
                          from: {
                            id: "user-uuid-2",
                            name: "Bob Johnson",
                            profileImage:
                              "https://res.cloudinary.com/.../bob.jpg",
                            locationAddress: "Brooklyn, NY",
                          },
                          to: {
                            id: "user-uuid",
                            name: "John Doe",
                            profileImage:
                              "https://res.cloudinary.com/.../profile.jpg",
                            locationAddress: "New York, NY",
                          },
                          description: "Exchanged from Bob Johnson to John Doe",
                          location: "New York, NY",
                          points: 270,
                          exchangeId: "exchange-uuid-2",
                        },
                      ],
                      statistics: {
                        totalReaders: 3,
                        totalExchanges: 8,
                        uniqueLocations: 3,
                        daysSinceListing: 153,
                        averageDaysPerReader: 19,
                      },
                      currentOwner: {
                        id: "user-uuid",
                        name: "John Doe",
                        profileImage:
                          "https://res.cloudinary.com/.../profile.jpg",
                      },
                    },
                    communityDiscussions: {
                      threads: [
                        {
                          id: "thread-uuid-1",
                          title: "The symbolism of the green light",
                          contentPreview:
                            "I've been thinking about Gatsby's obsession with the green light across the bay. What does everyone think it represents? To me, it seems like...",
                          chapter: "Chapter 1",
                          tags: ["symbolism", "analysis"],
                          isPinned: true,
                          isLocked: false,
                          viewCount: 342,
                          commentCount: 45,
                          likeCount: 78,
                          createdAt: "2025-10-15T11:20:00.000Z",
                          author: {
                            id: "user-uuid-3",
                            name: "Literary Critic",
                            profileImage:
                              "https://res.cloudinary.com/.../critic.jpg",
                            isAnonymous: false,
                          },
                        },
                        {
                          id: "thread-uuid-2",
                          title: "What did you think of Chapter 3?",
                          contentPreview:
                            "The party scenes in this chapter are absolutely wild! Fitzgerald's description of the excess and decadence really brings the Jazz Age to life...",
                          chapter: "Chapter 3",
                          tags: ["discussion", "chapter"],
                          isPinned: false,
                          isLocked: false,
                          viewCount: 198,
                          commentCount: 28,
                          likeCount: 42,
                          createdAt: "2025-11-02T14:45:00.000Z",
                          author: {
                            name: "Curious Reader 4523",
                            isAnonymous: true,
                          },
                        },
                        {
                          id: "thread-uuid-3",
                          title: "Daisy Buchanan - victim or villain?",
                          contentPreview:
                            "I'm torn on how to view Daisy's character. On one hand, she's trapped by societal expectations, but on the other hand, her actions have real...",
                          chapter: "General",
                          tags: ["character analysis", "discussion"],
                          isPinned: false,
                          isLocked: false,
                          viewCount: 267,
                          commentCount: 52,
                          likeCount: 61,
                          createdAt: "2025-12-10T09:30:00.000Z",
                          author: {
                            id: "user-uuid-4",
                            name: "Sarah Williams",
                            profileImage:
                              "https://res.cloudinary.com/.../sarah.jpg",
                            isAnonymous: false,
                          },
                        },
                      ],
                      statistics: {
                        totalThreads: 12,
                        totalComments: 87,
                        totalDiscussions: 99,
                        uniqueParticipants: 24,
                        popularChapters: [
                          {
                            chapter: "Chapter 3",
                            discussionCount: 5,
                          },
                          {
                            chapter: "Chapter 1",
                            discussionCount: 4,
                          },
                          {
                            chapter: "Chapter 7",
                            discussionCount: 3,
                          },
                        ],
                      },
                      hasMoreThreads: true,
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
    "/api/socket/messages": {
      get: {
        tags: ["Socket Messages"],
        summary: "Get chat messages for a specific room",
        description: "Retrieve paginated messages from a chat room",
        parameters: [
          {
            in: "query",
            name: "roomId",
            required: true,
            schema: {
              type: "string",
            },
            description: "The ID of the chat room",
            example: "room_123",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
              default: 50,
            },
            description: "Maximum number of messages to return",
            example: 50,
          },
          {
            in: "query",
            name: "offset",
            schema: {
              type: "integer",
              default: 0,
            },
            description: "Number of messages to skip",
            example: 0,
          },
        ],
        responses: {
          200: {
            description: "Messages retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    roomId: {
                      type: "string",
                      example: "room_123",
                    },
                    messages: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/ChatMessage",
                      },
                    },
                    total: {
                      type: "integer",
                      example: 100,
                    },
                    limit: {
                      type: "integer",
                      example: 50,
                    },
                    offset: {
                      type: "integer",
                      example: 0,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - roomId is required",
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
        tags: ["Socket Messages"],
        summary: "Send a new chat message",
        description:
          "Create and store a new message in a chat room (can also be broadcasted via Socket.IO)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["roomId", "userId", "message"],
                properties: {
                  roomId: {
                    type: "string",
                    description: "The ID of the chat room",
                    example: "room_123",
                  },
                  userId: {
                    type: "string",
                    description: "The ID of the user sending the message",
                    example: "user_456",
                  },
                  userName: {
                    type: "string",
                    description: "The name of the user sending the message",
                    example: "John Doe",
                  },
                  message: {
                    type: "string",
                    description: "The message content",
                    example: "Hello, everyone!",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Message sent successfully",
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
                      $ref: "#/components/schemas/ChatMessage",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - missing required fields",
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
        tags: ["Socket Messages"],
        summary: "Delete a chat message",
        description: "Remove a specific message from a chat room",
        parameters: [
          {
            in: "query",
            name: "messageId",
            required: true,
            schema: {
              type: "string",
            },
            description: "The ID of the message to delete",
            example: "msg_1234567890_user_456",
          },
          {
            in: "query",
            name: "roomId",
            required: true,
            schema: {
              type: "string",
            },
            description: "The ID of the chat room",
            example: "room_123",
          },
        ],
        responses: {
          200: {
            description: "Message deleted successfully",
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
                      example: "Message deleted",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - missing required parameters",
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
    "/api/stalls": {
      get: {
        tags: ["Stalls"],
        summary: "Get nearby stalls",
        description: "Get exchange point stalls within a specified radius of coordinates",
        parameters: [
          {
            name: "lat",
            in: "query",
            required: true,
            description: "Latitude coordinate",
            schema: {
              type: "number",
              format: "float",
              example: 40.7128,
            },
          },
          {
            name: "lng",
            in: "query",
            required: true,
            description: "Longitude coordinate",
            schema: {
              type: "number",
              format: "float",
              example: -74.006,
            },
          },
          {
            name: "radius",
            in: "query",
            description: "Search radius in kilometers",
            schema: {
              type: "number",
              format: "float",
              default: 10,
              example: 10,
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
            description: "Stalls retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    stalls: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Stall",
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
                          example: 5,
                        },
                        totalPages: {
                          type: "integer",
                          example: 1,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid coordinates",
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
        tags: ["Stalls"],
        summary: "Create a new stall",
        description: "Create a new exchange point stall",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "locationAddress", "locationLat", "locationLng"],
                properties: {
                  name: {
                    type: "string",
                    example: "Central Library Book Exchange",
                  },
                  description: {
                    type: "string",
                    nullable: true,
                    example: "A community book exchange point",
                  },
                  locationAddress: {
                    type: "string",
                    example: "123 Main St, New York, NY 10001",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    example: 40.7128,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    example: -74.006,
                  },
                  contactName: {
                    type: "string",
                    nullable: true,
                    example: "John Doe",
                  },
                  contactPhone: {
                    type: "string",
                    nullable: true,
                    example: "+1234567890",
                  },
                  contactEmail: {
                    type: "string",
                    format: "email",
                    nullable: true,
                    example: "contact@example.com",
                  },
                  operatingHours: {
                    type: "string",
                    nullable: true,
                    example: "Monday-Friday: 9AM-5PM",
                  },
                  availableGenres: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["Fiction", "Non-Fiction", "Mystery"],
                  },
                  photos: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["https://res.cloudinary.com/.../stall1.jpg"],
                  },
                  isActive: {
                    type: "boolean",
                    default: true,
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Stall created successfully",
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
                      example: "Stall created successfully",
                    },
                    stall: {
                      $ref: "#/components/schemas/Stall",
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
    "/api/stalls/{id}": {
      get: {
        tags: ["Stalls"],
        summary: "Get stall by ID",
        description: "Get detailed information about a specific stall",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Stall ID",
            schema: {
              type: "string",
              example: "stall-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Stall retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    stall: {
                      $ref: "#/components/schemas/Stall",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Stall not found",
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
      put: {
        tags: ["Stalls"],
        summary: "Update stall",
        description: "Update stall information (owner only)",
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
            description: "Stall ID",
            schema: {
              type: "string",
              example: "stall-uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Updated Stall Name",
                  },
                  description: {
                    type: "string",
                    nullable: true,
                    example: "Updated description",
                  },
                  locationAddress: {
                    type: "string",
                    example: "456 New St, New York, NY 10002",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    example: 40.7589,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    example: -73.9851,
                  },
                  contactName: {
                    type: "string",
                    nullable: true,
                    example: "Jane Doe",
                  },
                  contactPhone: {
                    type: "string",
                    nullable: true,
                    example: "+1234567891",
                  },
                  contactEmail: {
                    type: "string",
                    format: "email",
                    nullable: true,
                    example: "newcontact@example.com",
                  },
                  operatingHours: {
                    type: "string",
                    nullable: true,
                    example: "Monday-Saturday: 10AM-6PM",
                  },
                  availableGenres: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["Fiction", "Non-Fiction"],
                  },
                  photos: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["https://res.cloudinary.com/.../stall2.jpg"],
                  },
                  isActive: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Stall updated successfully",
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
                      example: "Stall updated successfully",
                    },
                    stall: {
                      $ref: "#/components/schemas/Stall",
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
            description: "Forbidden - Not stall owner",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Stall not found",
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
        tags: ["Stalls"],
        summary: "Delete stall",
        description: "Delete a stall (owner only)",
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
            description: "Stall ID",
            schema: {
              type: "string",
              example: "stall-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Stall deleted successfully",
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
                      example: "Stall deleted successfully",
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
            description: "Forbidden - Not stall owner",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Stall not found",
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
    "/api/stalls/my-stalls": {
      get: {
        tags: ["Stalls"],
        summary: "Get my stalls",
        description: "Get all stalls owned by the authenticated user",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Stalls retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    stalls: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Stall",
                      },
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
    "/api/exchanges": {
      post: {
        tags: ["Exchanges"],
        summary: "Request book exchange",
        description: "Initiate a book exchange request",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["bookId"],
                properties: {
                  bookId: {
                    type: "string",
                    example: "book-uuid",
                  },
                  message: {
                    type: "string",
                    nullable: true,
                    example: "I'd love to exchange this book!",
                  },
                  meetingAddress: {
                    type: "string",
                    nullable: true,
                    example: "Central Park, New York, NY",
                  },
                  meetingLat: {
                    type: "number",
                    format: "float",
                    nullable: true,
                    example: 40.7829,
                  },
                  meetingLng: {
                    type: "number",
                    format: "float",
                    nullable: true,
                    example: -73.9654,
                  },
                  scheduledAt: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                    example: "2026-01-15T14:00:00.000Z",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Exchange request created successfully",
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
                      example: "Exchange request created successfully",
                    },
                    exchange: {
                      $ref: "#/components/schemas/Exchange",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  missingBookId: {
                    value: {
                      error: "Book ID is required",
                    },
                  },
                  selfExchange: {
                    value: {
                      error: "Cannot request your own book",
                    },
                  },
                  notAvailable: {
                    value: {
                      error: "Book is not available for exchange",
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
    "/api/exchanges/{id}/accept": {
      post: {
        tags: ["Exchanges"],
        summary: "Accept exchange request",
        description: "Accept a pending exchange request (book owner only)",
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
            description: "Exchange ID",
            schema: {
              type: "string",
              example: "exchange-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Exchange request accepted successfully",
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
                      example: "Exchange request accepted",
                    },
                    exchange: {
                      $ref: "#/components/schemas/Exchange",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                examples: {
                  notPending: {
                    value: {
                      error: "Exchange is not in pending status",
                    },
                  },
                  insufficientPoints: {
                    value: {
                      error: "Requester does not have enough points",
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
              },
            },
          },
          404: {
            description: "Exchange not found",
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
    "/api/exchanges/{id}/decline": {
      post: {
        tags: ["Exchanges"],
        summary: "Decline exchange request",
        description: "Decline a pending exchange request (book owner only)",
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
            description: "Exchange ID",
            schema: {
              type: "string",
              example: "exchange-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Exchange request declined successfully",
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
                      example: "Exchange request declined",
                    },
                    exchange: {
                      $ref: "#/components/schemas/Exchange",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Exchange not in pending status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
              },
            },
          },
          404: {
            description: "Exchange not found",
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
    "/api/exchanges/{id}/confirm": {
      post: {
        tags: ["Exchanges"],
        summary: "Confirm exchange completion",
        description: "Confirm that an exchange has been completed (both parties)",
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
            description: "Exchange ID",
            schema: {
              type: "string",
              example: "exchange-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Exchange confirmed successfully",
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
                      example: "Exchange confirmed successfully",
                    },
                    exchange: {
                      $ref: "#/components/schemas/Exchange",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Exchange not in accepted status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
            description: "Exchange not found",
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
    "/api/books/{id}/forums": {
      get: {
        tags: ["Forums"],
        summary: "Get forum threads for a book",
        description: "Get all forum threads for a specific book with filtering and pagination",
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
          {
            name: "chapter",
            in: "query",
            description: "Filter by chapter",
            schema: {
              type: "string",
              example: "Chapter 3",
            },
          },
          {
            name: "sortBy",
            in: "query",
            description: "Sort order",
            schema: {
              type: "string",
              enum: ["latest", "popular", "pinned"],
              default: "latest",
              example: "latest",
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
            description: "Threads retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    threads: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/ForumThread",
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
                          example: 12,
                        },
                        totalPages: {
                          type: "integer",
                          example: 1,
                        },
                      },
                    },
                  },
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
        tags: ["Forums"],
        summary: "Create forum thread",
        description: "Create a new forum thread for a book",
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
                required: ["title", "content"],
                properties: {
                  title: {
                    type: "string",
                    example: "What did you think of Chapter 3?",
                  },
                  content: {
                    type: "string",
                    example: "I found the plot twist absolutely surprising!",
                  },
                  chapter: {
                    type: "string",
                    nullable: true,
                    example: "Chapter 3",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["discussion", "spoiler"],
                  },
                  isAnonymous: {
                    type: "boolean",
                    default: false,
                    example: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Thread created successfully",
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
                      example: "Thread created successfully",
                    },
                    thread: {
                      $ref: "#/components/schemas/ForumThread",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing required fields or content moderation failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
    "/api/forums/{id}": {
      get: {
        tags: ["Forums"],
        summary: "Get forum thread or comment by ID",
        description: "Get a specific forum thread or comment by its ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Thread or Comment ID",
            schema: {
              type: "string",
              example: "thread-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Thread or comment retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          example: "thread",
                        },
                        data: {
                          $ref: "#/components/schemas/ForumThread",
                        },
                      },
                    },
                    {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          example: "comment",
                        },
                        data: {
                          $ref: "#/components/schemas/ForumComment",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          404: {
            description: "Thread or comment not found",
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
      put: {
        tags: ["Forums"],
        summary: "Update forum thread",
        description: "Update a forum thread (author only)",
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
            description: "Thread ID",
            schema: {
              type: "string",
              example: "thread-uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Updated thread title",
                  },
                  content: {
                    type: "string",
                    example: "Updated thread content",
                  },
                  chapter: {
                    type: "string",
                    nullable: true,
                    example: "Chapter 4",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["updated", "tags"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Thread updated successfully",
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
                      example: "Thread updated successfully",
                    },
                    thread: {
                      $ref: "#/components/schemas/ForumThread",
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
            description: "Forbidden - Not thread author",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Thread not found",
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
        tags: ["Forums"],
        summary: "Delete forum thread",
        description: "Delete a forum thread (author only)",
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
            description: "Thread ID",
            schema: {
              type: "string",
              example: "thread-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Thread deleted successfully",
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
                      example: "Thread deleted successfully",
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
            description: "Forbidden - Not thread author",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Thread not found",
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
    "/api/forums/{id}/comments": {
      get: {
        tags: ["Forums"],
        summary: "Get comments for a thread",
        description: "Get all comments for a forum thread with pagination",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Thread ID",
            schema: {
              type: "string",
              example: "thread-uuid",
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
            description: "Comments retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    comments: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/ForumComment",
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
                          example: 23,
                        },
                        totalPages: {
                          type: "integer",
                          example: 2,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Thread not found",
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
        tags: ["Forums"],
        summary: "Add comment to thread",
        description: "Add a comment to a forum thread",
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
            description: "Thread ID",
            schema: {
              type: "string",
              example: "thread-uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: {
                  content: {
                    type: "string",
                    example: "I completely agree with your analysis!",
                  },
                  isAnonymous: {
                    type: "boolean",
                    default: false,
                    example: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Comment added successfully",
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
                      example: "Comment added successfully",
                    },
                    comment: {
                      $ref: "#/components/schemas/ForumComment",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Missing content or content moderation failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
            description: "Thread not found",
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
    "/api/payments/packages": {
      get: {
        tags: ["Payments"],
        summary: "Get payment packages",
        description: "Get all available point purchase packages",
        responses: {
          200: {
            description: "Packages retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    packages: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/PaymentPackage",
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
    },
    "/api/payments/create-session": {
      post: {
        tags: ["Payments"],
        summary: "Create payment session",
        description: "Create a Stripe checkout session for purchasing points",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["packageId"],
                properties: {
                  packageId: {
                    type: "string",
                    example: "package-uuid",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Payment session created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    sessionId: {
                      type: "string",
                      example: "cs_test_...",
                    },
                    url: {
                      type: "string",
                      example: "https://checkout.stripe.com/...",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid package",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
    "/api/payments/history": {
      get: {
        tags: ["Payments"],
        summary: "Get payment history",
        description: "Get payment history for the authenticated user",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
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
            description: "Payment history retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    payments: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Payment",
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
                          example: 5,
                        },
                        totalPages: {
                          type: "integer",
                          example: 1,
                        },
                      },
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
    "/api/reports": {
      post: {
        tags: ["Reports"],
        summary: "Create a report",
        description: "Report inappropriate content or user behavior",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["contentType", "contentId", "reason"],
                properties: {
                  contentType: {
                    type: "string",
                    enum: ["book", "forum_thread", "forum_comment", "user", "exchange"],
                    example: "forum_thread",
                  },
                  contentId: {
                    type: "string",
                    example: "thread-uuid",
                  },
                  reportedUserId: {
                    type: "string",
                    nullable: true,
                    example: "user-uuid",
                    description: "Required if contentType is 'user'",
                  },
                  reason: {
                    type: "string",
                    enum: [
                      "spam",
                      "harassment",
                      "inappropriate_content",
                      "fake_information",
                      "other",
                    ],
                    example: "inappropriate_content",
                  },
                  description: {
                    type: "string",
                    nullable: true,
                    example: "This thread contains offensive language",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Report created successfully",
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
                      example: "Report submitted successfully",
                    },
                    report: {
                      $ref: "#/components/schemas/Report",
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
    "/api/reports/{id}/resolve": {
      post: {
        tags: ["Reports"],
        summary: "Resolve a report",
        description: "Resolve or dismiss a report (admin only)",
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
            description: "Report ID",
            schema: {
              type: "string",
              example: "report-uuid",
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
                    enum: ["resolve", "dismiss"],
                    example: "resolve",
                  },
                  notes: {
                    type: "string",
                    nullable: true,
                    example: "Content removed per community guidelines",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Report resolved successfully",
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
                      example: "Report resolved successfully",
                    },
                    report: {
                      $ref: "#/components/schemas/Report",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Invalid action",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
            description: "Forbidden - Admin access required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Report not found",
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
