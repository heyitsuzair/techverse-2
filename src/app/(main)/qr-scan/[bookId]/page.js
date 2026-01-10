"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Textarea,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_BOOK_HISTORY = {
  bookTitle: "The Great Gatsby",
  bookAuthor: "F. Scott Fitzgerald",
  bookId: "BX-2024-001234",
  firstOwner: "Sarah M.",
  firstOwnedDate: "January 2024",
  totalReaders: 8,
  totalDistance: "2,450 miles",
  currentLocation: "New York, NY",
  journey: [
    {
      id: 1,
      reader: "Sarah M.",
      location: "San Francisco, CA",
      date: "Jan 2024",
      duration: "3 weeks",
      rating: 5,
      story:
        "First owner. Bought this at a local bookstore and fell in love with the Jazz Age. The prose is absolutely beautiful. Decided to pass it on so others could experience it.",
      photos: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200",
      ],
    },
    {
      id: 2,
      reader: "Michael T.",
      location: "Los Angeles, CA",
      date: "Feb 2024",
      duration: "2 weeks",
      rating: 5,
      story:
        "Received this from Sarah. The annotations in the margins added so much depth to my reading. Gatsby's tragedy hit differently knowing other readers connected with it too.",
      photos: [],
    },
    {
      id: 3,
      reader: "Emily R.",
      location: "Phoenix, AZ",
      date: "Mar 2024",
      duration: "4 weeks",
      rating: 4,
      story:
        "Third reader here! Loved seeing the previous notes. Added my own thoughts about Daisy's character. This book is building quite a conversation.",
      photos: [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200",
      ],
    },
    {
      id: 4,
      reader: "James K.",
      location: "Denver, CO",
      date: "Apr 2024",
      duration: "1 week",
      rating: 5,
      story:
        "Speed-read this during a cross-country trip. The community annotations made it feel like a book club. Excited to add my Denver stamp!",
      photos: [],
    },
    {
      id: 5,
      reader: "Lisa P.",
      location: "Chicago, IL",
      date: "May 2024",
      duration: "3 weeks",
      rating: 5,
      story:
        "Reading this in Chicago felt extra special given the Midwest connections. The wear on the pages tells the story of all of us who loved it.",
      photos: [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200",
      ],
    },
    {
      id: 6,
      reader: "David H.",
      location: "Boston, MA",
      date: "Jun 2024",
      duration: "2 weeks",
      rating: 4,
      story:
        "Boston reader checking in. The history of this book's journey is almost as interesting as the novel itself. Fitzgerald would be proud.",
      photos: [],
    },
    {
      id: 7,
      reader: "Rachel W.",
      location: "Philadelphia, PA",
      date: "Aug 2024",
      duration: "3 weeks",
      rating: 5,
      story:
        "Seventh reader! This book has traveled further than I have this year. Reading everyone's notes was like being in a nationwide book club.",
      photos: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200",
      ],
    },
    {
      id: 8,
      reader: "John D.",
      location: "New York, NY",
      date: "Dec 2024",
      duration: "Ongoing",
      rating: 5,
      story:
        "Current keeper in NYC! Reading it where it was set adds incredible depth. This book's journey across America mirrors Gatsby's dreams. Planning to pass it forward soon.",
      photos: [],
    },
  ],
};

export default function QRScanPage({ params }) {
  const router = useRouterWithProgress();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const bookId = params?.bookId || 1;

  const handleAction = () => {
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
              Marketplace
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
              <div className="text-6xl">📖</div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Book Reading Journey
          </h2>
          <p className="text-lg text-zinc-600 mb-2">
            {MOCK_BOOK_HISTORY.bookTitle}
          </p>
          <p className="text-zinc-500">by {MOCK_BOOK_HISTORY.bookAuthor}</p>
          <div className="mt-6">
            <Badge variant="primary" size="lg" className="mx-2">
              Book ID: {MOCK_BOOK_HISTORY.bookId}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <span>⚠️</span>
              <p className="text-sm font-medium">
                You're viewing as a guest. Login to add your story to this
                book's journey.
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
          {/* Sidebar - Stats */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 mb-6">
              <CardHeader>
                <CardTitle>Journey Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Total Readers</p>
                    <p className="text-2xl font-bold text-primary">
                      {MOCK_BOOK_HISTORY.totalReaders}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">
                      Distance Traveled
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {MOCK_BOOK_HISTORY.totalDistance}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">
                      Current Location
                    </p>
                    <p className="font-semibold">
                      📍 {MOCK_BOOK_HISTORY.currentLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">First Owner</p>
                    <p className="font-semibold">
                      {MOCK_BOOK_HISTORY.firstOwner}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {MOCK_BOOK_HISTORY.firstOwnedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 mb-1">Average Rating</p>
                    <p className="text-xl font-semibold">⭐⭐⭐⭐⭐</p>
                    <p className="text-xs text-zinc-500">4.9/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full mb-3"
                  onClick={() => router.push(routes.book.detail(bookId))}
                >
                  View Book Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(routes.forums.book(bookId))}
                >
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-zinc-900">
                Reading Journey Timeline
              </h3>
              <Button onClick={handleAction}>+ Add Your Story</Button>
            </div>

            {/* Add Story Card (Disabled) */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">
                  Have this book? Add your chapter!
                </h4>
                <Textarea
                  placeholder="Share your reading experience, favorite moments, or how this book impacted you..."
                  rows={3}
                  disabled
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-600">
                    Login to contribute to this book's story
                  </p>
                  <Button onClick={handleAction}>Add Story</Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="space-y-6 relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200"></div>

              {MOCK_BOOK_HISTORY.journey.map((entry, index) => (
                <div key={entry.id} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold shadow-lg z-10">
                    {index + 1}
                  </div>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {entry.reader}
                          </CardTitle>
                          <p className="text-sm text-zinc-600 mt-1">
                            📍 {entry.location} • {entry.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="warning" size="sm">
                            {"⭐".repeat(entry.rating)}
                          </Badge>
                          <p className="text-xs text-zinc-500 mt-1">
                            {entry.duration}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-700 leading-relaxed mb-4">
                        {entry.story}
                      </p>

                      {entry.photos.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {entry.photos.map((photo, photoIndex) => (
                            <img
                              key={photoIndex}
                              src={photo}
                              alt={`Photo by ${entry.reader}`}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      {index === MOCK_BOOK_HISTORY.journey.length - 1 && (
                        <Badge variant="success">📚 Current Keeper</Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Map Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Journey Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl mb-2">🗺️</p>
                    <p className="text-zinc-600 mb-2">
                      Interactive Journey Map
                    </p>
                    <p className="text-sm text-zinc-500">
                      Visualization of this book's journey across{" "}
                      {MOCK_BOOK_HISTORY.totalReaders} cities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-bold text-zinc-900 mb-3">
                  Want to be part of this journey?
                </h4>
                <p className="text-zinc-700 mb-6">
                  Join BooksExchange to request books, track their journeys, and
                  add your own stories to the community.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={() => router.push(routes.auth.signup)}
                  >
                    Sign Up Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => router.push(routes.marketplace)}
                  >
                    Browse Books
                  </Button>
                </div>
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
                You need to be logged in to add your story and contribute to
                this book's journey.
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
