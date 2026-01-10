"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_BOOK_DETAILS = {
  1: {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    condition: "Good",
    points: 85,
    location: "New York, NY",
    available: true,
    isbn: "978-0743273565",
    publishYear: 1925,
    pages: 180,
    language: "English",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    ownerName: "John D.",
    ownerRating: 4.8,
    qrHistory: [
      {
        reader: "Sarah M.",
        date: "Dec 2025",
        location: "New York, NY",
        rating: 5,
      },
      {
        reader: "Michael B.",
        date: "Oct 2025",
        location: "Brooklyn, NY",
        rating: 4,
      },
      {
        reader: "Emma W.",
        date: "Aug 2025",
        location: "Manhattan, NY",
        rating: 5,
      },
    ],
    forumPosts: 12,
    forumPreview: [
      {
        user: "BookLover42",
        chapter: "Chapter 1",
        excerpt: "The opening sets such a mysterious tone...",
      },
      {
        user: "ClassicReader",
        chapter: "Chapter 7",
        excerpt: "The confrontation scene is brilliantly written!",
      },
    ],
  },
};

export default function BookDetailPage({ params }) {
  const router = useRouterWithProgress();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const bookId = params?.id || 1;

  const book = MOCK_BOOK_DETAILS[bookId] || MOCK_BOOK_DETAILS[1];

  const handleAction = (e) => {
    e.stopPropagation();
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push(routes.home)}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold text-zinc-900">BooksExchange</h1>
          </button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push(routes.marketplace)}
            >
              ← Back to Marketplace
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push(routes.auth.signin)}
            >
              Login
            </Button>
            <Button onClick={() => router.push(routes.auth.signup)}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <span>⚠️</span>
              <p className="text-sm font-medium">
                You're viewing as a guest. Login to request this book or add to
                your history.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(routes.auth.signin)}
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Book Image & Primary Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-96 object-cover rounded-t-xl"
                />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="primary" size="lg">
                      🏆 {book.points} Points
                    </Badge>
                    <Badge
                      variant={book.available ? "success" : "danger"}
                      size="lg"
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!book.available}
                    onClick={handleAction}
                  >
                    {book.available
                      ? "Request Exchange"
                      : "Currently Unavailable"}
                  </Button>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Owner:</span>
                      <span className="font-medium">
                        {book.ownerName} ⭐ {book.ownerRating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Location:</span>
                      <span className="font-medium">📍 {book.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Condition:</span>
                      <Badge
                        variant={
                          book.condition === "Excellent" ? "success" : "warning"
                        }
                        size="sm"
                      >
                        {book.condition}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Description */}
            <Card>
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{book.title}</CardTitle>
                  <p className="text-xl text-zinc-600">by {book.author}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{book.genre}</Badge>
                    <Badge variant="default">{book.language}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 leading-relaxed">
                  {book.description}
                </p>
              </CardContent>
            </Card>

            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-600">ISBN</p>
                    <p className="font-medium">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Published</p>
                    <p className="font-medium">{book.publishYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Pages</p>
                    <p className="font-medium">{book.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600">Language</p>
                    <p className="font-medium">{book.language}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Point Calculation */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🤖 AI Point Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-700">
                      Base Value (Rarity & Demand)
                    </span>
                    <span className="font-semibold">+45 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-700">Condition Factor</span>
                    <span className="font-semibold">+25 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-700">Edition & Year</span>
                    <span className="font-semibold">+15 pts</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg">
                      Total Exchange Points
                    </span>
                    <span className="font-bold text-2xl text-primary">
                      {book.points} pts
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 mt-4">
                  💡 Points are calculated using AI based on book rarity,
                  condition, edition, and market demand.
                </p>
              </CardContent>
            </Card>

            {/* QR History Preview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    📖 Reading Journey
                  </CardTitle>
                  <Badge variant="primary">
                    {book.qrHistory.length} Readers
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {book.qrHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-zinc-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {entry.reader.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold">{entry.reader}</p>
                          <Badge variant="warning" size="sm">
                            {"⭐".repeat(entry.rating)}
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-600">
                          {entry.date} • 📍 {entry.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={handleAction}
                >
                  View Full History & Add Your Story →
                </Button>
              </CardContent>
            </Card>

            {/* Forum Preview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    💬 Community Discussions
                  </CardTitle>
                  <Badge variant="primary">{book.forumPosts} Posts</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {book.forumPreview.map((post, index) => (
                    <div key={index} className="p-4 bg-zinc-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">
                          {post.user}
                        </span>
                        <span className="text-xs text-zinc-500">•</span>
                        <Badge variant="secondary" size="sm">
                          {post.chapter}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-700">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => router.push(routes.forums.book(book.id))}
                >
                  Join Discussion Forum →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                Login Required
              </h3>
              <p className="text-zinc-600 mb-6">
                You need to be logged in to request books, add to history, or
                participate in discussions.
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => router.push(routes.auth.signin)}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(routes.auth.signup)}
                >
                  Sign Up
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
