"use client";

import { useState } from "react";
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
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
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

export default function BookDetailClient({ params }) {
  const router = useRouterWithProgress();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const bookId = params?.id || 1;

  const book = MOCK_BOOK_DETAILS[bookId] || MOCK_BOOK_DETAILS[1];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Alert Banner */}
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
                    className="border-amber-300 hover:bg-amber-100 whitespace-nowrap"
                  >
                    Login Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </div>

                  <CardContent className="p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge
                        variant="primary"
                        size="lg"
                        className="font-bold shadow-md"
                      >
                        🏆 {book.points} Points
                      </Badge>
                      <Badge
                        variant={book.available ? "success" : "danger"}
                        size="lg"
                        className="font-semibold shadow-md"
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
              <PointsChart />

              {/* AI Point Breakdown */}
              <AIPointBreakdown points={book.points} />

              {/* QR History Preview */}
              <QRHistoryPreview
                history={book.qrHistory}
                onViewFull={() => setShowLoginModal(true)}
              />

              {/* Forum Preview */}
              <ForumPreview
                forumPosts={book.forumPosts}
                preview={book.forumPreview}
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
