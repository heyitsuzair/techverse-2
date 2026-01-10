"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import Navigation from "@/app/Navigation";
import Footer from "@/app/Footer";
import ForumSearch from "./ForumSearch";
import CategorySidebar from "./CategorySidebar";
import DiscussionCard from "./DiscussionCard";
import LoginModal from "../marketplace/LoginModal";

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    bookId: 1,
    bookTitle: "The Great Gatsby",
    bookImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200",
    title: "What's your interpretation of the green light symbolism?",
    excerpt:
      "I've always found the green light at the end of Daisy's dock to be one of the most powerful symbols in literature...",
    author: "BookLover42",
    timeAgo: "2 hours ago",
    replies: 23,
    likes: 45,
    tags: ["symbolism", "discussion", "chapter-1"],
    isPinned: true,
    category: "classics",
  },
  {
    id: 2,
    bookId: 2,
    bookTitle: "1984",
    bookImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200",
    title: "How relevant is Orwell's vision in today's digital age?",
    excerpt:
      "With surveillance technology and data collection everywhere, 1984 feels more like a documentary than fiction...",
    author: "TechReader99",
    timeAgo: "5 hours ago",
    replies: 67,
    likes: 128,
    tags: ["dystopia", "modern-relevance", "debate"],
    isPinned: false,
    category: "classics",
  },
  {
    id: 3,
    bookId: 3,
    bookTitle: "To Kill a Mockingbird",
    bookImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200",
    title: "Atticus Finch: Hero or flawed character?",
    excerpt:
      "Recent discussions have challenged the traditional view of Atticus. What do you think?",
    author: "ClassicReader",
    timeAgo: "1 day ago",
    replies: 42,
    likes: 89,
    tags: ["character-analysis", "debate"],
    isPinned: false,
    category: "classics",
  },
  {
    id: 4,
    bookId: 4,
    bookTitle: "Dune",
    bookImage:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200",
    title: "The ecology themes in Dune resonate now more than ever",
    excerpt:
      "Herbert's environmental message was ahead of its time. Let's discuss the parallels with climate change...",
    author: "SciFiEnthusiast",
    timeAgo: "1 day ago",
    replies: 35,
    likes: 72,
    tags: ["ecology", "sci-fi", "themes"],
    isPinned: false,
    category: "sci-fi",
  },
  {
    id: 5,
    bookId: 5,
    bookTitle: "The Silent Patient",
    bookImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200",
    title: "Did anyone see the plot twist coming?",
    excerpt:
      "Just finished this thriller and my mind is blown! No spoilers but let's discuss the clues...",
    author: "MysteryFan",
    timeAgo: "2 days ago",
    replies: 56,
    likes: 103,
    tags: ["plot-twist", "thriller", "spoiler-free"],
    isPinned: false,
    category: "mystery",
  },
];

export default function ForumsClient() {
  const router = useRouterWithProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Filter discussions
  const filteredDiscussions = MOCK_DISCUSSIONS.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      discussion.category === activeCategory ||
      (activeCategory === "trending" && discussion.isPinned);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  Community Forums
                </h1>
                <p className="text-slate-600">
                  Join discussions, share insights, and connect with fellow
                  readers
                </p>
              </div>
              <Button
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                onClick={() => setShowLoginModal(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Start Discussion
              </Button>
            </div>

            <ForumSearch value={searchQuery} onChange={setSearchQuery} />
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <CategorySidebar
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
            </aside>

            {/* Discussion List */}
            <main className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {filteredDiscussions.length} discussion
                    {filteredDiscussions.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {filteredDiscussions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDiscussions.map((discussion, index) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12 sm:py-16"
                  >
                    <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      No discussions found
                    </h3>
                    <p className="text-slate-500 mb-6">
                      Try adjusting your search or category filter
                    </p>
                    <Button onClick={() => setShowLoginModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Start a New Discussion
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
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
