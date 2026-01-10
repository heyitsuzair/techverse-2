"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Select,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    condition: "Good",
    points: 85,
    location: "New York, NY",
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    condition: "Excellent",
    points: 95,
    location: "Los Angeles, CA",
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    condition: "Fair",
    points: 75,
    location: "Chicago, IL",
    available: false,
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    condition: "Good",
    points: 80,
    location: "Boston, MA",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic Fiction",
    condition: "Fair",
    points: 70,
    location: "Seattle, WA",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    id: 6,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    condition: "Excellent",
    points: 90,
    location: "Austin, TX",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    condition: "Good",
    points: 85,
    location: "Portland, OR",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
  },
  {
    id: 8,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    condition: "Fair",
    points: 65,
    location: "Denver, CO",
    available: false,
    imageUrl:
      "https://images.unsplash.com/photo-1621351183012-e2f3db0e8a5e?w=400",
  },
];

const GENRES = [
  "All",
  "Classic Fiction",
  "Dystopian",
  "Romance",
  "Fantasy",
  "Science Fiction",
  "Mystery",
];
const CONDITIONS = ["All", "Excellent", "Good", "Fair"];
const LOCATIONS = [
  "All",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Seattle, WA",
];

export default function MarketplacePage() {
  const router = useRouterWithProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;
    const matchesCondition =
      selectedCondition === "All" || book.condition === selectedCondition;
    const matchesLocation =
      selectedLocation === "All" || book.location === selectedLocation;

    return matchesSearch && matchesGenre && matchesCondition && matchesLocation;
  });

  const handleRequestBook = (e) => {
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

      {/* Hero Banner */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            Discover Books from Our Community
          </h2>
          <p className="text-lg text-zinc-600 mb-6">
            Browse thousands of books available for exchange. Login to start
            requesting!
          </p>
          <Badge variant="warning" size="lg">
            👋 Sign up to request books and join discussions
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Input
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg"
              />
              <div className="grid md:grid-cols-3 gap-4">
                <Select
                  label="Genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Condition"
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                >
                  {CONDITIONS.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-600">
            Found <span className="font-semibold">{filteredBooks.length}</span>{" "}
            books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(routes.book.detail(book.id))}
            >
              <div className="relative">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                {!book.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="danger">Currently Unavailable</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="primary" size="sm">
                    {book.points} Points
                  </Badge>
                  <Badge
                    variant={
                      book.condition === "Excellent"
                        ? "success"
                        : book.condition === "Good"
                        ? "warning"
                        : "default"
                    }
                    size="sm"
                  >
                    {book.condition}
                  </Badge>
                </div>
                <h4 className="font-semibold text-zinc-900 mb-1 line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-sm text-zinc-600 mb-2">{book.author}</p>
                <p className="text-xs text-zinc-500 mb-3">
                  <span className="font-medium">{book.genre}</span>
                </p>
                <p className="text-xs text-zinc-500 mb-4">📍 {book.location}</p>

                <Button
                  size="sm"
                  className="w-full"
                  disabled={!book.available}
                  onClick={handleRequestBook}
                >
                  {book.available ? "Request Book" : "Unavailable"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-zinc-600 mb-4">
              No books found matching your filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
                setSelectedCondition("All");
                setSelectedLocation("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
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
                You need to be logged in to request books and participate in
                exchanges.
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
