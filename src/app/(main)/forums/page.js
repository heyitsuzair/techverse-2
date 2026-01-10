"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Input,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_FORUM_THREADS = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    threadTitle: "The symbolism of the green light",
    excerpt:
      "What are your thoughts on the green light symbolism throughout the novel?",
    author: "BookLover42",
    replies: 23,
    lastActive: "2 hours ago",
    category: "Analysis",
  },
  {
    id: 2,
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    threadTitle: "Atticus as a moral compass",
    excerpt:
      "Let's discuss Atticus Finch's role as a moral guide in the story...",
    author: "ClassicReader",
    replies: 45,
    lastActive: "5 hours ago",
    category: "Characters",
  },
  {
    id: 3,
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    threadTitle: "Parallels to modern society",
    excerpt: "How does Orwell's vision relate to today's world?",
    author: "ThoughtfulMind",
    replies: 67,
    lastActive: "1 day ago",
    category: "Discussion",
  },
  {
    id: 4,
    bookTitle: "Pride and Prejudice",
    bookAuthor: "Jane Austen",
    threadTitle: "Elizabeth's character development",
    excerpt: "Tracking Elizabeth Bennet's growth throughout the novel...",
    author: "AustenFan",
    replies: 31,
    lastActive: "3 days ago",
    category: "Characters",
  },
  {
    id: 5,
    bookTitle: "The Catcher in the Rye",
    bookAuthor: "J.D. Salinger",
    threadTitle: "Understanding Holden's perspective",
    excerpt: "What makes Holden such a compelling narrator?",
    author: "LiteraryExplorer",
    replies: 19,
    lastActive: "1 week ago",
    category: "Analysis",
  },
];

const CATEGORIES = ["All", "Analysis", "Characters", "Discussion", "Questions"];

export default function ForumsIndexPage() {
  const router = useRouterWithProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredThreads = MOCK_FORUM_THREADS.filter((thread) => {
    const matchesSearch =
      thread.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.threadTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || thread.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

      {/* Hero Banner */}
      <div className="bg-secondary/5 border-b border-secondary/10">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            💬 Community Forums
          </h2>
          <p className="text-lg text-zinc-600 mb-6">
            Join discussions about your favorite books. Share insights and
            connect with readers.
          </p>
          <Badge variant="warning" size="lg">
            👋 Login to post, comment, and join discussions
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Forum Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Total Threads:</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Active Users:</span>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Total Posts:</span>
                    <span className="font-semibold">8,901</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAction}>+ New Thread</Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div>
              <p className="text-zinc-600">
                Found{" "}
                <span className="font-semibold">{filteredThreads.length}</span>{" "}
                discussions
              </p>
            </div>

            {/* Threads List */}
            <div className="space-y-4">
              {filteredThreads.map((thread) => (
                <Card
                  key={thread.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(routes.forums.book(thread.id))}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                          {thread.author.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-zinc-900 mb-1">
                              {thread.threadTitle}
                            </h3>
                            <p className="text-sm text-zinc-600 mb-2">
                              in{" "}
                              <span className="font-medium">
                                {thread.bookTitle}
                              </span>{" "}
                              by {thread.bookAuthor}
                            </p>
                          </div>
                          <Badge variant="secondary" size="sm">
                            {thread.category}
                          </Badge>
                        </div>
                        <p className="text-zinc-700 mb-3 line-clamp-2">
                          {thread.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-zinc-500">
                          <span>👤 {thread.author}</span>
                          <span>💬 {thread.replies} replies</span>
                          <span>🕐 {thread.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredThreads.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-zinc-600 mb-4">
                  No discussions found
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
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
                You need to be logged in to create threads or post comments.
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
