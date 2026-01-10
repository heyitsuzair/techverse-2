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
      name: "Payments",
      description: "Point packages and payment processing endpoints",
    },
    {
      name: "Exchanges",
      description: "Book exchange system with AI-powered valuation",
    },
    {
      name: "Reports",
      description: "Anti-abuse and dispute resolution system",
    },
    {
      name: "Forums",
      description: "Book discussion forums and community features",
    },
    {
      name: "Stalls",
      description: "Physical exchange points and stalls for book trading",
    },
    {
      name: "Admin",
      description: "Administrative endpoints",
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
      PointPackage: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "pkg-uuid-123",
          },
          name: {
            type: "string",
            example: "Popular Pack",
          },
          description: {
            type: "string",
            nullable: true,
            example: "Best value for regular book enthusiasts",
          },
          price: {
            type: "number",
            format: "float",
            example: 19.99,
            description: "Price in dollars",
          },
          points: {
            type: "number",
            example: 1000,
            description: "Base points in package",
          },
          bonusPoints: {
            type: "number",
            example: 200,
            description: "Bonus points added to base",
          },
          totalPoints: {
            type: "number",
            example: 1200,
            description: "Total points (base + bonus)",
          },
          features: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "1,200 Exchange Points",
              "Valid for 12 months",
              "Priority support",
              "Bonus: 200 extra points",
            ],
          },
          validityMonths: {
            type: "number",
            example: 12,
            description: "Package validity in months",
          },
          badge: {
            type: "string",
            nullable: true,
            example: "Best Value - Save 17%",
            description: "Display badge/label",
          },
        },
      },
      PaymentHistory: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "payment-uuid-123",
          },
          packageName: {
            type: "string",
            example: "Popular Pack",
          },
          packageDescription: {
            type: "string",
            nullable: true,
            example: "Best value for regular users",
          },
          amount: {
            type: "number",
            format: "float",
            example: 19.99,
            description: "Amount paid in dollars",
          },
          currency: {
            type: "string",
            example: "usd",
          },
          pointsPurchased: {
            type: "number",
            example: 1200,
            description: "Total points purchased (including bonus)",
          },
          status: {
            type: "string",
            enum: ["pending", "completed", "failed", "refunded"],
            example: "completed",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T10:00:00.000Z",
          },
          completedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-10T10:01:30.000Z",
          },
          package: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "pkg-uuid-456",
              },
              name: {
                type: "string",
                example: "Popular Pack",
              },
              basePoints: {
                type: "number",
                example: 1000,
              },
              bonusPoints: {
                type: "number",
                example: 200,
              },
            },
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
          status: {
            type: "string",
            enum: ["pending", "accepted", "declined", "completed", "cancelled"],
            example: "pending",
          },
          bookId: {
            type: "string",
            example: "book-uuid",
          },
          requesterId: {
            type: "string",
            example: "requester-user-uuid",
          },
          pointsOffered: {
            type: "integer",
            example: 285,
            description: "Points offered for the exchange (AI-calculated)",
          },
          pointsLocked: {
            type: "boolean",
            example: true,
            description:
              "Whether points are currently locked for this exchange",
          },
          message: {
            type: "string",
            nullable: true,
            example: "I would love to read this book!",
          },
          meetingAddress: {
            type: "string",
            nullable: true,
            example: "Central Park, 59th St, New York, NY",
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
          confirmationDeadline: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-22T14:00:00.000Z",
            description: "7 days after acceptance",
          },
          bookConditionRating: {
            type: "integer",
            nullable: true,
            minimum: 1,
            maximum: 5,
            example: 4,
            description: "Rating given by requester after receiving book",
          },
          declinedReason: {
            type: "string",
            nullable: true,
            example: "Book is no longer available",
          },
          declinedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-11T10:00:00.000Z",
          },
          completedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-20T15:30:00.000Z",
          },
          completedBy: {
            type: "string",
            nullable: true,
            example: "requester",
            description: "Who confirmed the completion",
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
      Report: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "report-uuid",
          },
          type: {
            type: "string",
            enum: [
              "book_condition",
              "fraud",
              "abuse",
              "fake_exchange",
              "repeated_exchange",
            ],
            example: "book_condition",
          },
          status: {
            type: "string",
            enum: ["pending", "investigating", "resolved", "dismissed"],
            example: "pending",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
            example: "medium",
          },
          exchangeId: {
            type: "string",
            nullable: true,
            example: "exchange-uuid",
          },
          bookId: {
            type: "string",
            nullable: true,
            example: "book-uuid",
          },
          reporterId: {
            type: "string",
            example: "reporter-user-uuid",
          },
          reportedUserId: {
            type: "string",
            nullable: true,
            example: "reported-user-uuid",
          },
          reason: {
            type: "string",
            example: "Book condition does not match description",
          },
          description: {
            type: "string",
            nullable: true,
            example:
              "Book was described as 'excellent' but has torn pages and water damage",
          },
          evidence: {
            type: "object",
            nullable: true,
            description: "JSON object containing evidence URLs, photos, etc.",
          },
          expectedCondition: {
            type: "string",
            nullable: true,
            example: "excellent",
          },
          actualCondition: {
            type: "string",
            nullable: true,
            example: "poor",
          },
          conditionPhotos: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "https://example.com/photo1.jpg",
              "https://example.com/photo2.jpg",
            ],
          },
          resolution: {
            type: "string",
            nullable: true,
            enum: [
              "valid",
              "invalid",
              "partial_refund",
              "full_refund",
              "exchange_reversed",
              "user_warned",
              "user_suspended",
              "dismissed",
            ],
            example: "partial_refund",
          },
          resolutionNotes: {
            type: "string",
            nullable: true,
            example: "Partial refund issued due to condition mismatch",
          },
          resolvedBy: {
            type: "string",
            nullable: true,
            example: "admin-user-uuid",
          },
          resolvedAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-01-12T10:00:00.000Z",
          },
          pointsAdjusted: {
            type: "integer",
            nullable: true,
            example: 150,
            description: "Points refunded or adjusted",
          },
          exchangeReversed: {
            type: "boolean",
            example: false,
          },
          userWarned: {
            type: "boolean",
            example: false,
          },
          userSuspended: {
            type: "boolean",
            example: false,
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
          authorId: {
            type: "string",
            nullable: true,
            example: "user-uuid",
            description: "Null for anonymous posts",
          },
          authorName: {
            type: "string",
            example: "John Doe",
            description: "Display name (generated for anonymous users)",
          },
          isAnonymous: {
            type: "boolean",
            example: false,
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
            description:
              "Chapter being discussed (e.g., 'Chapter 1', 'General')",
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["discussion", "spoiler"],
          },
          isModerated: {
            type: "boolean",
            example: false,
            description: "True if content has been removed by moderators",
          },
          isPinned: {
            type: "boolean",
            example: false,
            description: "Pinned threads appear first",
          },
          isLocked: {
            type: "boolean",
            example: false,
            description: "Locked threads cannot receive new comments",
          },
          moderatedBy: {
            type: "string",
            nullable: true,
            example: "admin-user-uuid",
          },
          moderationReason: {
            type: "string",
            nullable: true,
            example: "Violates community guidelines",
          },
          toxicityScore: {
            type: "number",
            format: "float",
            example: 0.05,
            description: "AI-calculated toxicity score (0.0-1.0)",
          },
          flaggedByAI: {
            type: "boolean",
            example: false,
            description:
              "True if AI flagged content as potentially inappropriate",
          },
          aiFlags: {
            type: "array",
            items: {
              type: "string",
            },
            example: [],
            description:
              "AI-detected issues: spam, toxicity, inappropriate, off-topic",
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
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-05T14:20:00.000Z",
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
          authorId: {
            type: "string",
            nullable: true,
            example: "user-uuid",
            description: "Null for anonymous posts",
          },
          authorName: {
            type: "string",
            example: "Jane Smith",
            description: "Display name (generated for anonymous users)",
          },
          isAnonymous: {
            type: "boolean",
            example: false,
          },
          content: {
            type: "string",
            example: "Great observation! I noticed that too.",
          },
          parentId: {
            type: "string",
            nullable: true,
            example: "parent-comment-uuid",
            description: "Parent comment ID for threaded replies",
          },
          isModerated: {
            type: "boolean",
            example: false,
            description: "True if content has been removed",
          },
          moderatedBy: {
            type: "string",
            nullable: true,
            example: "admin-user-uuid",
          },
          moderationReason: {
            type: "string",
            nullable: true,
            example: "Spam content",
          },
          toxicityScore: {
            type: "number",
            format: "float",
            example: 0.02,
            description: "AI-calculated toxicity score (0.0-1.0)",
          },
          flaggedByAI: {
            type: "boolean",
            example: false,
          },
          aiFlags: {
            type: "array",
            items: {
              type: "string",
            },
            example: [],
          },
          likeCount: {
            type: "integer",
            example: 5,
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
      Stall: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "stall-uuid",
          },
          name: {
            type: "string",
            example: "Brooklyn Book Exchange Point",
          },
          description: {
            type: "string",
            nullable: true,
            example: "A cozy spot for trading sci-fi and fantasy books",
          },
          address: {
            type: "string",
            example: "123 Main St, Brooklyn, NY 11201",
          },
          locationLat: {
            type: "number",
            format: "float",
            example: 40.7128,
            description: "Latitude coordinate (-90 to 90)",
          },
          locationLng: {
            type: "number",
            format: "float",
            example: -74.006,
            description: "Longitude coordinate (-180 to 180)",
          },
          contactName: {
            type: "string",
            example: "John Doe",
          },
          contactPhone: {
            type: "string",
            example: "+1234567890",
          },
          contactEmail: {
            type: "string",
            nullable: true,
            example: "john@example.com",
          },
          operatingHours: {
            type: "string",
            example:
              '{"monday":"9am-5pm","tuesday":"9am-5pm","wednesday":"9am-5pm"}',
            description: "JSON string with operating hours per day",
          },
          isActive: {
            type: "boolean",
            example: true,
            description: "Whether the stall is currently active",
          },
          photos: {
            type: "array",
            items: {
              type: "string",
            },
            example: [
              "https://res.cloudinary.com/xxx/image1.jpg",
              "https://res.cloudinary.com/xxx/image2.jpg",
            ],
            description: "Array of Cloudinary photo URLs",
          },
          ownerId: {
            type: "string",
            example: "user-uuid",
          },
          viewCount: {
            type: "integer",
            example: 142,
            description: "Number of times the stall has been viewed",
          },
          contactCount: {
            type: "integer",
            example: 28,
            description: "Number of times users contacted the owner",
          },
          distance: {
            type: "number",
            format: "float",
            example: 2.3,
            description:
              "Distance in kilometers (only in nearby search results)",
          },
          owner: {
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
                example: "https://res.cloudinary.com/xxx/profile.jpg",
              },
              email: {
                type: "string",
                example: "john@example.com",
              },
              phone: {
                type: "string",
                nullable: true,
                example: "+1234567890",
              },
              locationAddress: {
                type: "string",
                nullable: true,
                example: "New York, NY",
              },
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-09T12:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-09T12:00:00.000Z",
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
    "/api/payments/packages": {
      get: {
        tags: ["Payments"],
        summary: "Get point packages",
        description:
          "Get all available point packages and user's current points (if authenticated)",
        security: [],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            schema: {
              type: "string",
            },
            required: false,
            description: "Optional Bearer token to get user's current points",
            example: "Bearer your_access_token_here",
          },
        ],
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
                    currentPoints: {
                      type: "number",
                      nullable: true,
                      example: 1250,
                      description:
                        "User's current points (null if not authenticated)",
                    },
                    packages: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/PointPackage",
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  currentPoints: 1250,
                  packages: [
                    {
                      id: "pkg-uuid-1",
                      name: "Starter Pack",
                      description: "Perfect for getting started",
                      price: 9.99,
                      points: 500,
                      bonusPoints: 0,
                      totalPoints: 500,
                      features: [
                        "500 Exchange Points",
                        "Valid for 6 months",
                        "Basic support",
                      ],
                      validityMonths: 6,
                      badge: null,
                    },
                    {
                      id: "pkg-uuid-2",
                      name: "Popular Pack",
                      description: "Best value for regular users",
                      price: 19.99,
                      points: 1000,
                      bonusPoints: 200,
                      totalPoints: 1200,
                      features: [
                        "1,200 Exchange Points",
                        "Valid for 12 months",
                        "Priority support",
                        "Bonus: 200 extra points",
                      ],
                      validityMonths: 12,
                      badge: "Best Value - Save 17%",
                    },
                  ],
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
        security: [{ bearerAuth: [] }],
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
                    example: "pkg-uuid-123",
                    description: "ID of the point package to purchase",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Checkout session created successfully",
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
                      example: "Checkout session created successfully",
                    },
                    sessionId: {
                      type: "string",
                      example: "cs_test_a1b2c3d4e5f6",
                    },
                    sessionUrl: {
                      type: "string",
                      example:
                        "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6",
                    },
                    package: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "pkg-uuid-123",
                        },
                        name: {
                          type: "string",
                          example: "Popular Pack",
                        },
                        price: {
                          type: "number",
                          example: 19.99,
                        },
                        points: {
                          type: "number",
                          example: 1200,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - Package ID required",
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
            description: "Package not found",
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
    "/api/payments/webhook": {
      post: {
        tags: ["Payments"],
        summary: "Stripe webhook",
        description:
          "Handle Stripe webhook events (configured in Stripe Dashboard). This endpoint verifies the webhook signature and processes payment events.",
        security: [],
        parameters: [
          {
            in: "header",
            name: "stripe-signature",
            schema: {
              type: "string",
            },
            required: true,
            description: "Stripe webhook signature for verification",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                description: "Stripe event object",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Webhook processed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    received: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid signature or missing header",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Webhook handler failed",
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
        description: "Get user's payment transaction history with pagination",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
              default: 1,
            },
            description: "Page number",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Items per page",
          },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["pending", "completed", "failed", "refunded"],
            },
            description: "Filter by payment status",
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
                        $ref: "#/components/schemas/PaymentHistory",
                      },
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        page: {
                          type: "number",
                          example: 1,
                        },
                        limit: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 25,
                        },
                        totalPages: {
                          type: "number",
                          example: 3,
                        },
                        hasMore: {
                          type: "boolean",
                          example: true,
                        },
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  payments: [
                    {
                      id: "payment-uuid-1",
                      packageName: "Popular Pack",
                      packageDescription: "Best value for regular users",
                      amount: 19.99,
                      currency: "usd",
                      pointsPurchased: 1200,
                      status: "completed",
                      createdAt: "2026-01-10T10:00:00.000Z",
                      completedAt: "2026-01-10T10:01:30.000Z",
                      package: {
                        id: "pkg-uuid-2",
                        name: "Popular Pack",
                        basePoints: 1000,
                        bonusPoints: 200,
                      },
                    },
                  ],
                  pagination: {
                    page: 1,
                    limit: 10,
                    total: 5,
                    totalPages: 1,
                    hasMore: false,
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
        summary: "Request a book exchange",
        description:
          "Request to exchange a book. AI calculates the point value based on condition, demand, and rarity. Points are locked until exchange is completed or declined.",
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
                    description: "ID of the book to request",
                  },
                  message: {
                    type: "string",
                    example: "I would love to read this book!",
                    description: "Optional message to the book owner",
                  },
                  meetingAddress: {
                    type: "string",
                    example: "Central Park, 59th St, New York, NY",
                    description: "Proposed meeting location",
                  },
                  meetingLat: {
                    type: "number",
                    example: 40.7829,
                    description: "Meeting location latitude",
                  },
                  meetingLng: {
                    type: "number",
                    example: -73.9654,
                    description: "Meeting location longitude",
                  },
                  scheduledAt: {
                    type: "string",
                    format: "date-time",
                    example: "2026-01-15T14:00:00.000Z",
                    description: "Proposed meeting date/time",
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
                    pointsLocked: {
                      type: "integer",
                      example: 285,
                    },
                    remainingPoints: {
                      type: "integer",
                      example: 215,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request - validation error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Cannot request your own book",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - invalid or missing token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Book not found or unavailable",
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
      get: {
        tags: ["Exchanges"],
        summary: "Get exchange history",
        description:
          "Get user's exchange history with filtering and pagination",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "query",
            name: "role",
            schema: {
              type: "string",
              enum: ["requester", "owner", "all"],
              default: "all",
            },
            description: "Filter by user role in exchanges",
          },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: [
                "pending",
                "accepted",
                "declined",
                "completed",
                "cancelled",
              ],
            },
            description: "Filter by exchange status",
          },
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
              default: 1,
            },
            description: "Page number",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Items per page",
          },
        ],
        responses: {
          200: {
            description: "Exchanges retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    exchanges: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Exchange",
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
                          example: 10,
                        },
                        total: {
                          type: "integer",
                          example: 25,
                        },
                        totalPages: {
                          type: "integer",
                          example: 3,
                        },
                        hasMore: {
                          type: "boolean",
                          example: true,
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
    "/api/exchanges/{id}/accept": {
      put: {
        tags: ["Exchanges"],
        summary: "Accept exchange request (Book Owner)",
        description:
          "Book owner accepts the exchange request. Sets a 7-day confirmation deadline.",
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
            description: "Exchange accepted successfully",
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
                    nextStep: {
                      type: "string",
                      example:
                        "Requester must confirm exchange completion within 7 days",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Already processed or invalid status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized - only book owner can accept",
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
      put: {
        tags: ["Exchanges"],
        summary: "Decline exchange request (Book Owner)",
        description:
          "Book owner declines the exchange request. Locked points are returned to requester.",
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
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  reason: {
                    type: "string",
                    example: "Book is no longer available",
                    description: "Optional reason for declining",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Exchange declined successfully",
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
                    pointsReturned: {
                      type: "integer",
                      example: 285,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Already processed or invalid status",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized - only book owner can decline",
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
      put: {
        tags: ["Exchanges"],
        summary: "Confirm exchange completion (Requester)",
        description:
          "Requester confirms physical exchange completed. Transfers book ownership and points to owner. Cancels other pending requests for the same book.",
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
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  bookConditionRating: {
                    type: "integer",
                    minimum: 1,
                    maximum: 5,
                    example: 4,
                    description: "Optional rating of book condition (1-5)",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Exchange completed successfully",
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
                      example: "Exchange completed successfully",
                    },
                    exchange: {
                      $ref: "#/components/schemas/Exchange",
                    },
                    details: {
                      type: "object",
                      properties: {
                        bookTransferred: {
                          type: "boolean",
                          example: true,
                        },
                        previousOwner: {
                          type: "string",
                          example: "owner-user-uuid",
                        },
                        newOwner: {
                          type: "string",
                          example: "requester-user-uuid",
                        },
                        pointsTransferred: {
                          type: "integer",
                          example: 285,
                        },
                        cancelledExchanges: {
                          type: "integer",
                          example: 2,
                          description: "Number of other requests cancelled",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid status or deadline passed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized - only requester can confirm",
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
    "/api/reports": {
      post: {
        tags: ["Reports"],
        summary: "Create a report",
        description:
          "Report book condition mismatch, fraud, abuse, or suspicious behavior. Automatically runs anti-abuse checks.",
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
                required: ["type", "reason"],
                properties: {
                  type: {
                    type: "string",
                    enum: [
                      "book_condition",
                      "fraud",
                      "abuse",
                      "fake_exchange",
                      "repeated_exchange",
                    ],
                    example: "book_condition",
                    description: "Type of report",
                  },
                  exchangeId: {
                    type: "string",
                    example: "exchange-uuid",
                    description: "Required for book_condition reports",
                  },
                  bookId: {
                    type: "string",
                    example: "book-uuid",
                    description: "Optional book ID",
                  },
                  reportedUserId: {
                    type: "string",
                    example: "user-uuid",
                    description:
                      "User being reported (auto-filled for exchange reports)",
                  },
                  reason: {
                    type: "string",
                    example: "Book condition does not match description",
                    description: "Main reason for report",
                  },
                  description: {
                    type: "string",
                    example:
                      "Book was described as 'excellent' but has torn pages and water damage",
                    description: "Detailed description",
                  },
                  evidence: {
                    type: "object",
                    description: "Evidence object (URLs, data, etc.)",
                  },
                  expectedCondition: {
                    type: "string",
                    example: "excellent",
                    description: "For book_condition reports",
                  },
                  actualCondition: {
                    type: "string",
                    example: "poor",
                    description: "For book_condition reports",
                  },
                  conditionPhotos: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: ["https://example.com/photo1.jpg"],
                    description: "Photo URLs showing condition",
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
                    autoFlags: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      example: [
                        "5 exchanges detected between these users in the last 30 days",
                      ],
                      description: "Automatic fraud detection flags",
                    },
                    priorityReason: {
                      type: "string",
                      example:
                        "Report flagged for immediate review due to suspicious patterns",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error",
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
            description: "Forbidden - not authorized",
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
      get: {
        tags: ["Reports"],
        summary: "Get reports",
        description:
          "Get reports based on role (reporter, reported, or admin view)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "query",
            name: "role",
            schema: {
              type: "string",
              enum: ["reporter", "reported", "admin"],
              default: "reporter",
            },
            description: "View reports as reporter, reported user, or admin",
          },
          {
            in: "query",
            name: "status",
            schema: {
              type: "string",
              enum: ["pending", "investigating", "resolved", "dismissed"],
            },
            description: "Filter by status",
          },
          {
            in: "query",
            name: "type",
            schema: {
              type: "string",
              enum: [
                "book_condition",
                "fraud",
                "abuse",
                "fake_exchange",
                "repeated_exchange",
              ],
            },
            description: "Filter by type",
          },
          {
            in: "query",
            name: "priority",
            schema: {
              type: "string",
              enum: ["low", "medium", "high", "critical"],
            },
            description: "Filter by priority",
          },
          {
            in: "query",
            name: "page",
            schema: {
              type: "integer",
              default: 1,
            },
            description: "Page number",
          },
          {
            in: "query",
            name: "limit",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Items per page",
          },
        ],
        responses: {
          200: {
            description: "Reports retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    reports: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Report",
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
                          example: 10,
                        },
                        total: {
                          type: "integer",
                          example: 25,
                        },
                        totalPages: {
                          type: "integer",
                          example: 3,
                        },
                        hasMore: {
                          type: "boolean",
                          example: true,
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
    "/api/reports/{id}/resolve": {
      put: {
        tags: ["Reports"],
        summary: "Resolve a report",
        description:
          "Resolve a report with actions: refund points, reverse exchange, warn/suspend user. Admin endpoint.",
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
                required: ["resolution"],
                properties: {
                  resolution: {
                    type: "string",
                    enum: [
                      "valid",
                      "invalid",
                      "partial_refund",
                      "full_refund",
                      "exchange_reversed",
                      "user_warned",
                      "user_suspended",
                      "dismissed",
                    ],
                    example: "partial_refund",
                  },
                  resolutionNotes: {
                    type: "string",
                    example:
                      "Condition mismatch verified. Partial refund issued.",
                  },
                  pointsAdjusted: {
                    type: "integer",
                    example: 150,
                    description: "Points to refund to reporter",
                  },
                  exchangeReversed: {
                    type: "boolean",
                    example: false,
                    description:
                      "Reverse the exchange (restore book ownership and points)",
                  },
                  userWarned: {
                    type: "boolean",
                    example: true,
                    description: "Send warning to reported user",
                  },
                  userSuspended: {
                    type: "boolean",
                    example: false,
                    description: "Suspend reported user's account",
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
                    actions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      example: [
                        "Refunded 150 points to reporter",
                        "Deducted 150 points from reported user",
                      ],
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or already resolved",
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
    "/api/books/{id}/forums": {
      get: {
        tags: ["Forums"],
        summary: "Get forum threads for a book",
        description:
          "Get all discussion threads for a specific book with filtering and pagination",
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
            required: false,
            description: "Filter by chapter (e.g., 'Chapter 1', 'General')",
            schema: {
              type: "string",
              example: "Chapter 3",
            },
          },
          {
            name: "sortBy",
            in: "query",
            required: false,
            description: "Sort order",
            schema: {
              type: "string",
              enum: ["latest", "popular", "pinned"],
              default: "latest",
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
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
            required: false,
            description: "Results per page",
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
                          example: 45,
                        },
                        totalPages: {
                          type: "integer",
                          example: 3,
                        },
                      },
                    },
                    book: {
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
                      },
                    },
                    filters: {
                      type: "object",
                      properties: {
                        availableChapters: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: [
                            "Chapter 1",
                            "Chapter 2",
                            "Chapter 3",
                            "General",
                          ],
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
        summary: "Create a new forum thread",
        description:
          "Create a new discussion thread for a book. Content is automatically analyzed by AI for toxicity.",
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
                    minLength: 5,
                    maxLength: 200,
                    example: "What did you think of Chapter 3?",
                  },
                  content: {
                    type: "string",
                    minLength: 10,
                    maxLength: 10000,
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
                    id: {
                      type: "string",
                      example: "thread-uuid",
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
                    viewCount: {
                      type: "integer",
                      example: 0,
                    },
                    commentCount: {
                      type: "integer",
                      example: 0,
                    },
                    likeCount: {
                      type: "integer",
                      example: 0,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2026-01-10T15:30:00.000Z",
                    },
                    author: {
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
                        isAnonymous: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                    moderation: {
                      type: "object",
                      properties: {
                        toxicityScore: {
                          type: "number",
                          example: 0.05,
                        },
                        flaggedByAI: {
                          type: "boolean",
                          example: false,
                        },
                        flags: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: [],
                        },
                        method: {
                          type: "string",
                          example: "gemini-ai",
                        },
                        isModerated: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or content violates guidelines",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Content violates community guidelines",
                    },
                    reason: {
                      type: "string",
                      example: "Content contains spam keywords",
                    },
                    flags: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                      example: ["spam"],
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Account restricted from posting",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Account restricted from posting",
                    },
                    reason: {
                      type: "string",
                      example: "User has 5 flagged posts in the last 30 days",
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
    },
    "/api/forums/{id}/comments": {
      get: {
        tags: ["Forums"],
        summary: "Get comments for a thread",
        description:
          "Get all comments for a specific thread with threaded structure",
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
            required: false,
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
            required: false,
            description: "Results per page",
            schema: {
              type: "integer",
              default: 50,
              example: 50,
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
                    comments: {
                      type: "array",
                      description: "Root-level comments with nested replies",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "comment-uuid-1",
                          },
                          content: {
                            type: "string",
                            example: "Great observation! I noticed that too.",
                          },
                          parentId: {
                            type: "string",
                            nullable: true,
                            example: null,
                          },
                          likeCount: {
                            type: "integer",
                            example: 5,
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
                          author: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                                example: "user-uuid",
                              },
                              name: {
                                type: "string",
                                example: "Jane Smith",
                              },
                              isAnonymous: {
                                type: "boolean",
                                example: false,
                              },
                            },
                          },
                          replies: {
                            type: "array",
                            description: "Nested replies to this comment",
                            items: {
                              $ref: "#/components/schemas/ForumComment",
                            },
                          },
                        },
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
                          example: 50,
                        },
                        total: {
                          type: "integer",
                          example: 23,
                        },
                        totalPages: {
                          type: "integer",
                          example: 1,
                        },
                      },
                    },
                    thread: {
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
                        isLocked: {
                          type: "boolean",
                          example: false,
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
          410: {
            description: "Thread has been removed by moderators",
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
        summary: "Add a comment or reply",
        description:
          "Add a comment to a thread or reply to an existing comment. Content is automatically analyzed by AI.",
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
                    minLength: 1,
                    maxLength: 5000,
                    example: "Great observation! I noticed that too.",
                  },
                  parentId: {
                    type: "string",
                    nullable: true,
                    description: "Parent comment ID for threaded replies",
                    example: "parent-comment-uuid",
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
            description: "Comment created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "comment-uuid",
                    },
                    content: {
                      type: "string",
                      example: "Great observation! I noticed that too.",
                    },
                    parentId: {
                      type: "string",
                      nullable: true,
                      example: null,
                    },
                    likeCount: {
                      type: "integer",
                      example: 0,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2026-01-10T15:45:00.000Z",
                    },
                    author: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          example: "user-uuid",
                        },
                        name: {
                          type: "string",
                          example: "Jane Smith",
                        },
                        isAnonymous: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                    moderation: {
                      type: "object",
                      properties: {
                        toxicityScore: {
                          type: "number",
                          example: 0.02,
                        },
                        flaggedByAI: {
                          type: "boolean",
                          example: false,
                        },
                        flags: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                          example: [],
                        },
                        method: {
                          type: "string",
                          example: "gemini-ai",
                        },
                        isModerated: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or content violates guidelines",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          401: {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Thread is locked or account restricted",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Thread or parent comment not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          410: {
            description: "Thread has been removed by moderators",
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
        summary: "Get thread or comment details",
        description: "Get details of a specific thread or comment by ID",
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
            description: "Item retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["thread", "comment"],
                      example: "thread",
                    },
                    data: {
                      oneOf: [
                        {
                          $ref: "#/components/schemas/ForumThread",
                        },
                        {
                          $ref: "#/components/schemas/ForumComment",
                        },
                      ],
                    },
                  },
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
        summary: "Update thread or comment",
        description:
          "Update a thread or comment (author or admin only). Content is re-analyzed by AI.",
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
            description: "Thread or Comment ID",
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
                    minLength: 5,
                    maxLength: 200,
                    description: "For threads only",
                    example: "Updated title",
                  },
                  content: {
                    type: "string",
                    minLength: 1,
                    maxLength: 10000,
                    example: "Updated content",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["thread", "comment"],
                      example: "thread",
                    },
                    data: {
                      oneOf: [
                        {
                          $ref: "#/components/schemas/ForumThread",
                        },
                        {
                          $ref: "#/components/schemas/ForumComment",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or content violates guidelines",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          401: {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized, thread locked, or content moderated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
      delete: {
        tags: ["Forums"],
        summary: "Delete thread or comment",
        description:
          "Delete a thread or comment (author or admin only). CASCADE deletes apply.",
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
            description: "Thread or Comment ID",
            schema: {
              type: "string",
              example: "thread-uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Thread deleted successfully",
                    },
                    deletedComments: {
                      type: "integer",
                      description: "For threads: number of comments deleted",
                      example: 23,
                    },
                    deletedReplies: {
                      type: "integer",
                      description: "For comments: number of replies deleted",
                      example: 3,
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized or thread locked",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
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
    },
    "/api/stalls": {
      get: {
        tags: ["Stalls"],
        summary: "Get nearby exchange stalls",
        description:
          "Get physical exchange stalls within a specified radius. Returns stalls sorted by distance.",
        parameters: [
          {
            name: "lat",
            in: "query",
            required: true,
            description: "Latitude of user's location",
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
            description: "Longitude of user's location",
            schema: {
              type: "number",
              format: "float",
              example: -74.006,
            },
          },
          {
            name: "radius",
            in: "query",
            required: false,
            description:
              "Search radius in kilometers (default: 10km, max: 50km)",
            schema: {
              type: "number",
              format: "float",
              default: 10,
              example: 10,
            },
          },
          {
            name: "isActive",
            in: "query",
            required: false,
            description: "Filter by active status",
            schema: {
              type: "boolean",
              example: true,
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
                        allOf: [
                          {
                            $ref: "#/components/schemas/Stall",
                          },
                          {
                            type: "object",
                            properties: {
                              distance: {
                                type: "number",
                                format: "float",
                                example: 2.5,
                                description: "Distance in kilometers",
                              },
                            },
                          },
                        ],
                      },
                    },
                    count: {
                      type: "integer",
                      example: 5,
                    },
                    searchParams: {
                      type: "object",
                      properties: {
                        lat: {
                          type: "number",
                          example: 40.7128,
                        },
                        lng: {
                          type: "number",
                          example: -74.006,
                        },
                        radius: {
                          type: "number",
                          example: 10,
                        },
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  stalls: [
                    {
                      id: "stall-uuid-1",
                      name: "Central Library Book Exchange",
                      description:
                        "Weekly book exchange every Saturday 10am-4pm",
                      locationAddress: "476 5th Ave, New York, NY 10018",
                      locationLat: 40.7539,
                      locationLng: -73.9832,
                      contactPhone: "+1234567890",
                      contactEmail: "exchange@library.com",
                      operatingHours: "Saturday 10:00 AM - 4:00 PM",
                      availableGenres: ["Fiction", "Non-Fiction", "Mystery"],
                      photos: ["https://res.cloudinary.com/.../stall1.jpg"],
                      isActive: true,
                      userId: "user-uuid",
                      user: {
                        id: "user-uuid",
                        name: "John Doe",
                        profileImage:
                          "https://res.cloudinary.com/.../profile.jpg",
                      },
                      createdAt: "2026-01-05T10:00:00.000Z",
                      updatedAt: "2026-01-08T15:00:00.000Z",
                      distance: 2.5,
                    },
                    {
                      id: "stall-uuid-2",
                      name: "Brooklyn Book Hub",
                      description: "Community book exchange and reading space",
                      locationAddress: "123 Main St, Brooklyn, NY 11201",
                      locationLat: 40.7061,
                      locationLng: -73.9969,
                      contactPhone: "+1987654321",
                      contactEmail: "info@brooklynhub.com",
                      operatingHours: "Mon-Fri 9:00 AM - 6:00 PM",
                      availableGenres: ["Romance", "Sci-Fi", "History"],
                      photos: [],
                      isActive: true,
                      userId: "user-uuid-2",
                      user: {
                        id: "user-uuid-2",
                        name: "Jane Smith",
                        profileImage: null,
                      },
                      createdAt: "2026-01-03T12:00:00.000Z",
                      updatedAt: "2026-01-03T12:00:00.000Z",
                      distance: 5.8,
                    },
                  ],
                  count: 2,
                  searchParams: {
                    lat: 40.7128,
                    lng: -74.006,
                    radius: 10,
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "Latitude and longitude are required",
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
        summary: "Create a new exchange stall",
        description:
          "Add a new physical exchange point/stall. Only authenticated users can create stalls.",
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
                required: [
                  "name",
                  "locationAddress",
                  "locationLat",
                  "locationLng",
                ],
                properties: {
                  name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 200,
                    example: "Central Library Book Exchange",
                  },
                  description: {
                    type: "string",
                    nullable: true,
                    maxLength: 1000,
                    example: "Weekly book exchange every Saturday 10am-4pm",
                  },
                  locationAddress: {
                    type: "string",
                    example: "476 5th Ave, New York, NY 10018",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    example: 40.7539,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    example: -73.9832,
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
                    example: "exchange@library.com",
                  },
                  operatingHours: {
                    type: "string",
                    nullable: true,
                    example: "Saturday 10:00 AM - 4:00 PM",
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
                    stall: {
                      $ref: "#/components/schemas/Stall",
                    },
                  },
                },
                example: {
                  success: true,
                  stall: {
                    id: "stall-uuid",
                    name: "Central Library Book Exchange",
                    description: "Weekly book exchange every Saturday 10am-4pm",
                    locationAddress: "476 5th Ave, New York, NY 10018",
                    locationLat: 40.7539,
                    locationLng: -73.9832,
                    contactPhone: "+1234567890",
                    contactEmail: "exchange@library.com",
                    operatingHours: "Saturday 10:00 AM - 4:00 PM",
                    availableGenres: ["Fiction", "Non-Fiction", "Mystery"],
                    photos: ["https://res.cloudinary.com/.../stall1.jpg"],
                    isActive: true,
                    userId: "user-uuid",
                    createdAt: "2026-01-10T16:00:00.000Z",
                    updatedAt: "2026-01-10T16:00:00.000Z",
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error:
                    "Name is required and must be between 3-200 characters",
                },
              },
            },
          },
          401: {
            description: "Authentication required",
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
        summary: "Get stall details",
        description: "Get detailed information about a specific exchange stall",
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
                example: {
                  success: true,
                  stall: {
                    id: "stall-uuid",
                    name: "Central Library Book Exchange",
                    description: "Weekly book exchange every Saturday 10am-4pm",
                    locationAddress: "476 5th Ave, New York, NY 10018",
                    locationLat: 40.7539,
                    locationLng: -73.9832,
                    contactPhone: "+1234567890",
                    contactEmail: "exchange@library.com",
                    operatingHours: "Saturday 10:00 AM - 4:00 PM",
                    availableGenres: ["Fiction", "Non-Fiction", "Mystery"],
                    photos: ["https://res.cloudinary.com/.../stall1.jpg"],
                    isActive: true,
                    userId: "user-uuid",
                    user: {
                      id: "user-uuid",
                      name: "John Doe",
                      email: "john@example.com",
                      phone: "+1234567890",
                      profileImage:
                        "https://res.cloudinary.com/.../profile.jpg",
                    },
                    createdAt: "2026-01-05T10:00:00.000Z",
                    updatedAt: "2026-01-08T15:00:00.000Z",
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
                example: {
                  error: "Stall not found",
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
        summary: "Update stall details",
        description:
          "Update an exchange stall. Only the owner can update their stall.",
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
                    minLength: 3,
                    maxLength: 200,
                    example: "Central Library Book Exchange",
                  },
                  description: {
                    type: "string",
                    nullable: true,
                    maxLength: 1000,
                    example: "Weekly book exchange every Saturday 10am-4pm",
                  },
                  locationAddress: {
                    type: "string",
                    example: "476 5th Ave, New York, NY 10018",
                  },
                  locationLat: {
                    type: "number",
                    format: "float",
                    example: 40.7539,
                  },
                  locationLng: {
                    type: "number",
                    format: "float",
                    example: -73.9832,
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
                    example: "exchange@library.com",
                  },
                  operatingHours: {
                    type: "string",
                    nullable: true,
                    example: "Saturday 10:00 AM - 4:00 PM",
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
                    stall: {
                      $ref: "#/components/schemas/Stall",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          401: {
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized to update this stall",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "You can only update your own stalls",
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
        summary: "Delete a stall",
        description:
          "Delete an exchange stall. Only the owner can delete their stall.",
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
            description: "Authentication required",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          403: {
            description: "Not authorized to delete this stall",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  error: "You can only delete your own stalls",
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
    "/api/admin/seed-packages": {
      post: {
        tags: ["Admin"],
        summary: "Seed point packages",
        description:
          "Seed the database with the 3 default point packages (Starter, Popular, Bulk). This will delete existing packages and create new ones. ⚠️ Use with caution in production!",
        security: [],
        responses: {
          201: {
            description: "Packages seeded successfully",
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
                      example: "Point packages seeded successfully",
                    },
                    packagesCreated: {
                      type: "number",
                      example: 3,
                    },
                    packages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "pkg-uuid-123",
                          },
                          name: {
                            type: "string",
                            example: "Popular Pack",
                          },
                          price: {
                            type: "number",
                            example: 19.99,
                          },
                          totalPoints: {
                            type: "number",
                            example: 1200,
                          },
                        },
                      },
                    },
                  },
                },
                example: {
                  success: true,
                  message: "Point packages seeded successfully",
                  packagesCreated: 3,
                  packages: [
                    {
                      id: "pkg-uuid-1",
                      name: "Starter Pack",
                      price: 9.99,
                      totalPoints: 500,
                    },
                    {
                      id: "pkg-uuid-2",
                      name: "Popular Pack",
                      price: 19.99,
                      totalPoints: 1200,
                    },
                    {
                      id: "pkg-uuid-3",
                      name: "Bulk Pack",
                      price: 44.99,
                      totalPoints: 3000,
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: "Failed to seed packages",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Failed to seed packages",
                    },
                    details: {
                      type: "string",
                      example: "Database connection error",
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Admin"],
        summary: "Check seeded packages",
        description:
          "Get a list of all seeded point packages to verify if seeding was successful",
        security: [],
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
                    packagesCount: {
                      type: "number",
                      example: 3,
                    },
                    packages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "pkg-uuid-123",
                          },
                          name: {
                            type: "string",
                            example: "Popular Pack",
                          },
                          price: {
                            type: "number",
                            example: 19.99,
                          },
                          points: {
                            type: "number",
                            example: 1000,
                          },
                          bonusPoints: {
                            type: "number",
                            example: 200,
                          },
                          totalPoints: {
                            type: "number",
                            example: 1200,
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
                example: {
                  success: true,
                  packagesCount: 3,
                  packages: [
                    {
                      id: "pkg-uuid-1",
                      name: "Starter Pack",
                      price: 9.99,
                      points: 500,
                      bonusPoints: 0,
                      totalPoints: 500,
                      isActive: true,
                    },
                    {
                      id: "pkg-uuid-2",
                      name: "Popular Pack",
                      price: 19.99,
                      points: 1000,
                      bonusPoints: 200,
                      totalPoints: 1200,
                      isActive: true,
                    },
                    {
                      id: "pkg-uuid-3",
                      name: "Bulk Pack",
                      price: 44.99,
                      points: 2500,
                      bonusPoints: 500,
                      totalPoints: 3000,
                      isActive: true,
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: "Failed to fetch packages",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Failed to fetch packages",
                    },
                    details: {
                      type: "string",
                      example: "Database connection error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
