"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Text,
  Input,
  Select,
  Badge,
} from "@/components/ui";
import {
  Search,
  Filter,
  BookOpen,
  Heart,
  MessageCircle,
  MapPin,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

// Mock Data
const MOCK_BOOKS = [
  {
    id: 1,
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    condition: "Excellent",
    points: 180,
    location: "Boston, MA",
    distance: "2.5 miles",
    owner: "John Anderson",
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    condition: "Good",
    points: 150,
    location: "New York, NY",
    distance: "5 miles",
    owner: "Emily White",
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    condition: "Like New",
    points: 200,
    location: "Brooklyn, NY",
    distance: "8 miles",
    owner: "Mike Johnson",
    rating: 4.7,
    available: true,
  },
  {
    id: 4,
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic",
    condition: "Fair",
    points: 120,
    location: "Queens, NY",
    distance: "10 miles",
    owner: "Sarah Brown",
    rating: 4.6,
    available: false,
  },
  {
    id: 5,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological Fiction",
    condition: "Good",
    points: 170,
    location: "Manhattan, NY",
    distance: "3 miles",
    owner: "David Lee",
    rating: 4.9,
    available: true,
  },
  {
    id: 6,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic Fiction",
    condition: "Excellent",
    points: 160,
    location: "Staten Island, NY",
    distance: "12 miles",
    owner: "Lisa Garcia",
    rating: 4.5,
    available: true,
  },
];

const GENRES = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Adventure",
  "Dystopian",
];
const CONDITIONS = ["All Conditions", "Like New", "Excellent", "Good", "Fair"];
const SORT_OPTIONS = [
  "Nearest",
  "Lowest Points",
  "Highest Points",
  "Newest First",
  "Highest Rated",
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [sortBy, setSortBy] = useState("Nearest");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPoints, setMaxPoints] = useState("");
  const [maxDistance, setMaxDistance] = useState("");

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All Genres" || book.genre === selectedGenre;
    const matchesCondition =
      selectedCondition === "All Conditions" ||
      book.condition === selectedCondition;
    const matchesPoints = !maxPoints || book.points <= parseInt(maxPoints);
    const matchesDistance =
      !maxDistance || parseFloat(book.distance) <= parseFloat(maxDistance);

    return (
      matchesSearch &&
      matchesGenre &&
      matchesCondition &&
      matchesPoints &&
      matchesDistance
    );
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All Genres");
    setSelectedCondition("All Conditions");
    setMaxPoints("");
    setMaxDistance("");
    setSortBy("Nearest");
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Marketplace
          </Text>
          <Text variant="body" className="text-zinc-600">
            Discover and request books from our community
          </Text>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <Input
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant={showFilters ? "primary" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                <Select
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
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                {(searchQuery ||
                  selectedGenre !== "All Genres" ||
                  selectedCondition !== "All Conditions" ||
                  maxPoints ||
                  maxDistance) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-zinc-200">
                  <div>
                    <Text variant="caption" className="mb-2">
                      Max Points
                    </Text>
                    <Input
                      type="number"
                      placeholder="Enter maximum points"
                      value={maxPoints}
                      onChange={(e) => setMaxPoints(e.target.value)}
                    />
                  </div>
                  <div>
                    <Text variant="caption" className="mb-2">
                      Max Distance (miles)
                    </Text>
                    <Input
                      type="number"
                      placeholder="Enter maximum distance"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <Text variant="body" className="text-zinc-600">
            Found {filteredBooks.length} book
            {filteredBooks.length !== 1 ? "s" : ""}
          </Text>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-500" />
            <Text variant="caption" className="text-zinc-600">
              Sorted by: {sortBy}
            </Text>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                {/* Book Image Placeholder */}
                <div className="w-full h-48 bg-linear-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary opacity-50" />
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={book.available ? "success" : "default"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <Text variant="caption" className="font-semibold">
                      {book.rating}
                    </Text>
                  </div>
                </div>

                {/* Book Info */}
                <Text variant="h4" className="mb-1 line-clamp-1">
                  {book.title}
                </Text>
                <Text variant="body" className="text-zinc-600 mb-3 text-sm">
                  by {book.author}
                </Text>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="default" className="text-xs">
                      {book.genre}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      {book.condition}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MapPin className="w-4 h-4" />
                    <Text variant="caption">
                      {book.location} • {book.distance}
                    </Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text variant="caption" className="text-zinc-600">
                      Owner: {book.owner}
                    </Text>
                    <Text variant="body" className="font-bold text-amber-600">
                      {book.points} pts
                    </Text>
                  </div>
                </div>

                {/* Action Buttons */}
                {book.available ? (
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="primary" size="sm" className="col-span-3">
                      Request Book
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="col-span-2">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Unavailable
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-1" />
                      Wishlist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <Card>
            <CardContent className="py-8 sm:py-12 text-center">
              <Search className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <Text variant="h3" className="mb-2">
                No books found
              </Text>
              <Text variant="body" className="text-zinc-600 mb-4">
                Try adjusting your filters or search terms
              </Text>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
