"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, Plus, MessageCircle, Filter } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import ChapterNavigation from "./ChapterNavigation";
import PostCard from "./PostCard";
import LoginModal from "../../marketplace/LoginModal";

const MOCK_BOOK_DATA = {
  1: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
};

const MOCK_POSTS = [
  {
    id: 1,
    author: "BookLover42",
    timeAgo: "2 hours ago",
    chapter: "Chapter 1",
    title: "The green light symbolism - deeper meaning?",
    content:
      "I've read this book multiple times, and every time I notice something new about the green light. It's not just about Gatsby's dream of Daisy, but also about the American Dream itself. What are your thoughts on this dual symbolism?",
    replies: 23,
    likes: 45,
    tags: ["symbolism", "analysis", "themes"],
    isPinned: true,
    isVerified: true,
  },
  {
    id: 2,
    author: "ClassicReader",
    timeAgo: "4 hours ago",
    chapter: "Chapter 3",
    title: "The parties at Gatsby's mansion",
    content:
      "The parties are so lavish yet so hollow. Everyone comes but nobody really knows Gatsby. This contrast between appearance and reality is masterfully done. Has anyone else noticed the loneliness theme running through these scenes?",
    replies: 18,
    likes: 32,
    tags: ["parties", "themes", "loneliness"],
    isPinned: false,
    isVerified: false,
  },
  {
    id: 3,
    author: "LiteraryAnalyst",
    timeAgo: "6 hours ago",
    chapter: "Chapter 7",
    title: "The confrontation scene analysis",
    content:
      "The hotel room confrontation is the climax of the novel. The way Fitzgerald builds the tension with the heat, the cramped space, and the emotional revelations is brilliant. Tom's exposure of Gatsby's past feels devastating.",
    replies: 31,
    likes: 58,
    tags: ["climax", "tension", "character-development"],
    isPinned: false,
    isVerified: true,
  },
  {
    id: 4,
    author: "ModernReader",
    timeAgo: "8 hours ago",
    chapter: "Chapter 5",
    title: "Gatsby and Daisy's reunion",
    content:
      "The reunion scene is both beautiful and awkward. Gatsby's nervousness is so relatable, and Nick's role as the third wheel adds humor to an otherwise tense situation.",
    replies: 15,
    likes: 27,
    tags: ["reunion", "romance", "nick-carraway"],
    isPinned: false,
    isVerified: false,
  },
  {
    id: 5,
    author: "ThemeExplorer",
    timeAgo: "1 day ago",
    chapter: "Chapter 2",
    title: "The Valley of Ashes - social commentary",
    content:
      "The stark contrast between the Valley of Ashes and West Egg/East Egg represents the wealth inequality of the 1920s. The eyes of Dr. T.J. Eckleburg watching over this wasteland add an eerie, judgmental quality.",
    replies: 22,
    likes: 41,
    tags: ["social-commentary", "setting", "symbolism"],
    isPinned: false,
    isVerified: true,
  },
];

export default function BookForumClient({ params }) {
  const router = useRouterWithProgress();
  const [activeChapter, setActiveChapter] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [sortBy, setSortBy] = useState("recent"); // recent, popular, replies

  const bookId = params?.bookId || 1;
  const book = MOCK_BOOK_DATA[bookId] || MOCK_BOOK_DATA[1];

  // Filter posts by chapter
  const filteredPosts =
    activeChapter === "all"
      ? MOCK_POSTS
      : MOCK_POSTS.filter(
          (post) => post.chapter === `Chapter ${activeChapter}`
        );

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      default: // recent
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push(routes.home)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BooksExchange
              </h1>
            </motion.button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(routes.forums.index)}
                className="hidden sm:inline-flex"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Forums
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(routes.auth.signin)}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => router.push(routes.auth.signup)}
                className="shadow-md"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-slate-200 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4">
                    by {book.author}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-medium">
                        {MOCK_POSTS.length} discussions
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>•</span>
                      <span>
                        {MOCK_POSTS.reduce((sum, p) => sum + p.replies, 0)}{" "}
                        total replies
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  onClick={() => setShowLoginModal(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chapter Navigation */}
        <div className="mb-6">
          <ChapterNavigation
            activeChapter={activeChapter}
            onChapterChange={setActiveChapter}
          />
        </div>

        {/* Filter & Sort Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MessageCircle className="w-4 h-4" />
            <span>
              {sortedPosts.length} post{sortedPosts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <div className="flex gap-2">
              {["recent", "popular", "replies"].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    sortBy === sort
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-primary"
                  }`}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts List */}
        <AnimatePresence mode="wait">
          {sortedPosts.length > 0 ? (
            <div className="space-y-4">
              {sortedPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={index}
                  onViewPost={() => setShowLoginModal(true)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No posts in this chapter yet
              </h3>
              <p className="text-slate-500 mb-6">
                Be the first to start a discussion about this chapter!
              </p>
              <Button onClick={() => setShowLoginModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
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
