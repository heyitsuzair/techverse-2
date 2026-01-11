"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  LogIn,
  Star,
  MapPin,
  Package,
  Calendar,
  Globe,
  Hash,
  CheckCircle2,
  XCircle,
} from "lucide-react";
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
import Navigation from "@/app/Navigation";
import Footer from "@/app/Footer";
import PointsChart from "./PointsChart";
import AIPointBreakdown from "./AIPointBreakdown";
import QRHistoryPreview from "./QRHistoryPreview";
import ForumPreview from "./ForumPreview";
import LoginModal from "../../marketplace/LoginModal";
import { getBookById, getBookHistory, getBookForums } from "@/lib/api/books";
import { Spinner } from "@/components/ui";
import { getFromCookie } from "@/utils/cookies";

// Dummy data for fallback
const DUMMY_QR_HISTORY = [
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
];

const DUMMY_FORUM_PREVIEW = [
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
];

const DUMMY_POINT_CHART_DATA = [
  { month: "Jan", points: 80 },
  { month: "Feb", points: 85 },
  { month: "Mar", points: 82 },
  { month: "Apr", points: 88 },
  { month: "May", points: 90 },
  { month: "Jun", points: 85 },
];

export default function BookDetailClient({ params }) {
  const router = useRouterWithProgress();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookHistory, setBookHistory] = useState([]);
  const [forums, setForums] = useState([]);
  const [bookId, setBookId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setBookId(resolvedParams.id);
    };
    getParams();

    // Check authentication status
    const checkAuth = () => {
      const accessToken = getFromCookie("accessToken");
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!(accessToken && user));
    };

    checkAuth();

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);

    // Listen for custom auth events (same tab login/logout)
    window.addEventListener("authStateChange", checkAuth);

    // Also check periodically to catch any changes
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authStateChange", checkAuth);
      clearInterval(interval);
    };
  }, [params]);

  useEffect(() => {
    if (!bookId) return;

    const fetchBookData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch book details
        const bookResponse = await getBookById(bookId);
        if (bookResponse.success && bookResponse.book) {
          const bookData = bookResponse.book;
          setBook({
            id: bookData.id,
            title: bookData.title,
            author: bookData.author || "Unknown Author",
            genre: bookData.genre,
            condition: bookData.condition,
            points: bookData.pointValue || 0,
            location: bookData.locationAddress || "Location not specified",
            available: bookData.isAvailable !== false,
            isbn: bookData.isbn || "N/A",
            publishYear: bookData.publishYear || "Unknown",
            pages: bookData.pages || "N/A",
            language: bookData.language || "English",
            description: bookData.description || "No description available.",
            imageUrl: bookData.coverImage,
            ownerName: bookData.user?.name || "Unknown",
            ownerRating: 4.5,
            valuation: bookResponse.valuation,
            analytics: bookResponse.analytics,
          });
        } else {
          setError("Book not found");
        }

        // Fetch book history
        try {
          const historyResponse = await getBookHistory(bookId);
          if (historyResponse.success && historyResponse.history) {
            setBookHistory(historyResponse.history);
          } else {
            setBookHistory(DUMMY_QR_HISTORY);
          }
        } catch (err) {
          console.error("Error fetching history:", err);
          setBookHistory(DUMMY_QR_HISTORY);
        }

        // Fetch forums
        try {
          const forumsResponse = await getBookForums(bookId);
          if (forumsResponse.success && forumsResponse.forums) {
            setForums(forumsResponse.forums);
          } else {
            setForums(DUMMY_FORUM_PREVIEW);
          }
        } catch (err) {
          console.error("Error fetching forums:", err);
          setForums(DUMMY_FORUM_PREVIEW);
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(err.message || "Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
          <Spinner size="lg" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
          <Card className="p-8 text-center">
            <CardContent>
              <Text className="text-red-600 mb-4">
                {error || "Book not found"}
              </Text>
              <Button onClick={() => router.push(routes.marketplace.index)}>
                Back to Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  // Use dummy data if not available
  const qrHistory = bookHistory.length > 0 ? bookHistory : DUMMY_QR_HISTORY;
  const forumPreview = forums.length > 0 ? forums : DUMMY_FORUM_PREVIEW;
  const pointChartData = book.analytics?.pointHistory || DUMMY_POINT_CHART_DATA;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Alert Banner - Only show when not authenticated */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/60 shadow-md">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-amber-800 flex-1">
                      <LogIn className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">
                        You're viewing as a guest. Login to request this book or
                        add to your history.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(routes.auth.signin)}
                      className="border-amber-300 hover:bg-amber-100 whitespace-nowrap flex justify-end"
                    >
                      Login Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Book Image & Primary Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-24"
              >
                <Card className="overflow-hidden shadow-xl border-slate-200">
                  <div className="relative">
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-96 object-cover"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </div>

                  <CardContent className="p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge
                        variant="primary"
                        size="lg"
                        className="font-bold shadow-md mt-2"
                      >
                        🏆 {book.points} Points
                      </Badge>
                      <Badge
                        variant={book.available ? "success" : "danger"}
                        size="lg"
                        className="font-semibold shadow-md mt-2"
                      >
                        {book.available ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Available
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1" /> Unavailable
                          </>
                        )}
                      </Badge>
                    </div>

                    <Button
                      className="w-full shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                      disabled={!book.available}
                      onClick={() => setShowLoginModal(true)}
                    >
                      {book.available
                        ? "Request Exchange"
                        : "Currently Unavailable"}
                    </Button>

                    <div className="border-t border-slate-200 pt-4 space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Owner:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-slate-900">
                            {book.ownerName}
                          </span>
                          <div className="flex items-center gap-0.5 ml-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">
                              {book.ownerRating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Location:</span>
                        <div className="flex items-center gap-1 font-semibold text-slate-900">
                          <MapPin className="w-4 h-4 text-primary" />
                          {book.location}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Condition:</span>
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Book Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-slate-200 shadow-lg">
                  <CardHeader className="border-b border-slate-100">
                    <div className="space-y-3">
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        {book.title}
                      </h2>
                      <p className="text-xl text-slate-600">by {book.author}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-medium">
                          <Hash className="w-3 h-3 mr-1" />
                          {book.genre}
                        </Badge>
                        <Badge variant="default" className="font-medium">
                          <Globe className="w-3 h-3 mr-1" />
                          {book.language}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-slate-700 leading-relaxed">
                      {book.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Book Details Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Card className="border-slate-200 shadow-lg">
                  <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-slate-900">
                      Book Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Hash className="w-4 h-4" />
                          ISBN
                        </div>
                        <p className="font-semibold text-slate-900">
                          {book.isbn}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          Published
                        </div>
                        <p className="font-semibold text-slate-900">
                          {book.publishYear}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Package className="w-4 h-4" />
                          Pages
                        </div>
                        <p className="font-semibold text-slate-900">
                          {book.pages}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Globe className="w-4 h-4" />
                          Language
                        </div>
                        <p className="font-semibold text-slate-900">
                          {book.language}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Points Chart */}
              <PointsChart data={pointChartData} />

              {/* AI Point Breakdown */}
              <AIPointBreakdown
                points={book.points}
                valuation={book.valuation}
              />

              {/* QR History Preview */}
              <QRHistoryPreview
                history={qrHistory}
                onViewFull={() => setShowLoginModal(true)}
              />

              {/* Forum Preview */}
              <ForumPreview
                forumPosts={forums.length || forumPreview.length}
                preview={forumPreview}
                onJoinForum={() => router.push(routes.forums.book(book.id))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => router.push(routes.auth.signin)}
        onSignup={() => router.push(routes.auth.signup)}
      />
      <Footer />
    </>
  );
}
