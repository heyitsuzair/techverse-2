"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ShoppingBag, AlertCircle } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import SearchFilters from "./SearchFilters";
import BookCard from "./BookCard";
import LoginModal from "./LoginModal";

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

export default function MarketplaceClient() {
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All");
    setSelectedCondition("All");
    setSelectedLocation("All");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push(routes.home)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BooksExchange
            </h1>
          </motion.button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push(routes.auth.signin)}
            >
              Login
            </Button>
            <Button
              onClick={() => router.push(routes.auth.signup)}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Discover Books from Our Community
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-6">
              Browse thousands of books available for exchange. Login to start
              requesting!
            </p>
            <Badge variant="warning" size="lg" className="shadow-md">
              <AlertCircle className="w-4 h-4 mr-2" />
              Sign up to request books and join discussions
            </Badge>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Available Books
            </h3>
            <p className="text-slate-600">
              Found{" "}
              <span className="font-semibold text-primary">
                {filteredBooks.length}
              </span>{" "}
              books
              {(searchQuery ||
                selectedGenre !== "All" ||
                selectedCondition !== "All" ||
                selectedLocation !== "All") && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>
        </motion.div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12"
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BookCard
                  book={book}
                  onCardClick={(id) => router.push(routes.book.detail(id))}
                  onRequestClick={() => setShowLoginModal(true)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No books found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="shadow-md"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => router.push(routes.auth.signin)}
        onSignup={() => router.push(routes.auth.signup)}
      />
    </div>
  );
}
