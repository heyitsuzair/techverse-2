"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { Button, Badge, Spinner } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import Navigation from "@/app/Navigation";
import Footer from "@/app/Footer";
import SearchFilters from "./SearchFilters";
import BookCard from "./BookCard";
import LoginModal from "./LoginModal";
import { getBooks } from "@/lib/api/books";

// Mock data for fallback (if API fails)
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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Debounce search and refetch when filters change
    const timer = setTimeout(() => {
      if (!loading) {
        fetchBooks();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenre, selectedCondition]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const filters = {};
      if (selectedGenre !== "All") filters.genre = selectedGenre;
      if (selectedCondition !== "All") filters.condition = selectedCondition;
      if (searchQuery) filters.search = searchQuery;

      const response = await getBooks(filters);
      if (response.success && response.books) {
        // Map API response to expected format
        const mappedBooks = response.books.map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author || "Unknown Author",
          genre: book.genre,
          condition: book.condition,
          points: book.pointValue || 0,
          location: book.locationAddress || "Location not specified",
          available: book.isAvailable !== false,
          imageUrl: book.coverImage,
        }));
        setBooks(mappedBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err.message || "Failed to load books");
      // Fallback to empty array instead of mock data
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
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
    <>
      <Navigation />
      <div className="min-h-screen bg-linear-to-b from-muted/30 to-background">
        {/* Hero Banner */}
        <div className="bg-linear-to-r from-primary/10 via-secondary/5 to-accent/10 border-b border-primary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-card rounded-2xl shadow-lg mb-6">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Discover Books from Our Community
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                Browse thousands of books available for exchange. Login to start
                requesting!
              </p>
              <Badge
                variant="warning"
                size="lg"
                className="shadow-md bg-warning/10 text-warning border border-warning/20"
              >
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
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Available Books
              </h3>
              <p className="text-muted-foreground">
                {loading ? (
                  "Loading books..."
                ) : (
                  <>
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
                        className="ml-2 text-sm text-primary hover:underline cursor-pointer"
                      >
                        Clear filters
                      </button>
                    )}
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Error loading books
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button variant="outline" onClick={fetchBooks}>
                Retry
              </Button>
            </motion.div>
          )}

          {/* Books Grid */}
          {!loading && !error && filteredBooks.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-12"
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
            !loading &&
            !error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  No books found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="shadow-md border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )
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
      <Footer />
    </>
  );
}
