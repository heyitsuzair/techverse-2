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

const MOCK_BOOK_FORUM = {
  bookTitle: "The Great Gatsby",
  bookAuthor: "F. Scott Fitzgerald",
  totalPosts: 156,
  totalMembers: 89,
  chapters: [
    { id: 1, name: "Chapter 1", posts: 23 },
    { id: 2, name: "Chapter 2", posts: 18 },
    { id: 3, name: "Chapter 3", posts: 31 },
    { id: 4, name: "Chapter 4", posts: 19 },
    { id: 5, name: "Chapter 5", posts: 27 },
    { id: 6, name: "Chapter 6", posts: 15 },
    { id: 7, name: "Chapter 7", posts: 23 },
  ],
  discussions: [
    {
      id: 1,
      chapter: "Chapter 1",
      user: "BookLover42",
      time: "2 hours ago",
      content:
        "The opening sets such a mysterious tone. Nick's observations about reserving judgment really frame the entire narrative. What did you all think about the way Fitzgerald introduces the characters?",
      likes: 12,
      replies: 5,
    },
    {
      id: 2,
      chapter: "Chapter 1",
      user: "ClassicReader",
      time: "5 hours ago",
      content:
        "I love how the green light is introduced so subtly. It becomes such a powerful symbol later on.",
      likes: 8,
      replies: 3,
    },
    {
      id: 3,
      chapter: "Chapter 3",
      user: "LiteraryAnalyst",
      time: "1 day ago",
      content:
        "The party scenes are brilliantly written. The excess and superficiality of the Jazz Age come alive in these descriptions.",
      likes: 15,
      replies: 7,
    },
    {
      id: 4,
      chapter: "Chapter 7",
      user: "ThoughtfulReader",
      time: "2 days ago",
      content:
        "The confrontation scene in the hotel is one of the most intense moments. The way Gatsby's dream crumbles is heartbreaking.",
      likes: 20,
      replies: 9,
    },
  ],
};

export default function BookForumPage({ params }) {
  const router = useRouterWithProgress();
  const [selectedChapter, setSelectedChapter] = useState("All");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const bookId = params?.bookId || 1;

  const filteredDiscussions =
    selectedChapter === "All"
      ? MOCK_BOOK_FORUM.discussions
      : MOCK_BOOK_FORUM.discussions.filter(
          (d) => d.chapter === selectedChapter
        );

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
              onClick={() => router.push(routes.forums.index)}
            >
              ← Back to Forums
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

      {/* Book Header */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border-b border-zinc-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">
                {MOCK_BOOK_FORUM.bookTitle}
              </h2>
              <p className="text-lg text-zinc-600 mb-4">
                by {MOCK_BOOK_FORUM.bookAuthor}
              </p>
              <div className="flex gap-4 text-sm text-zinc-600">
                <span>💬 {MOCK_BOOK_FORUM.totalPosts} Posts</span>
                <span>👥 {MOCK_BOOK_FORUM.totalMembers} Members</span>
              </div>
            </div>
            <Button onClick={() => router.push(routes.book.detail(bookId))}>
              View Book Details
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-800">
              <span>⚠️</span>
              <p className="text-sm font-medium">
                You're viewing as a guest. Login to post comments and join the
                discussion.
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Chapter Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedChapter("All")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                      selectedChapter === "All"
                        ? "bg-primary text-white"
                        : "hover:bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    <span>All Chapters</span>
                    <Badge
                      variant={
                        selectedChapter === "All" ? "default" : "secondary"
                      }
                      size="sm"
                    >
                      {MOCK_BOOK_FORUM.discussions.length}
                    </Badge>
                  </button>
                  {MOCK_BOOK_FORUM.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setSelectedChapter(chapter.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex justify-between items-center ${
                        selectedChapter === chapter.name
                          ? "bg-primary text-white"
                          : "hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      <span>{chapter.name}</span>
                      <Badge
                        variant={
                          selectedChapter === chapter.name
                            ? "default"
                            : "secondary"
                        }
                        size="sm"
                      >
                        {chapter.posts}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Reader Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-zinc-600 mb-1">Most Discussed:</p>
                    <p className="font-semibold">Chapter 7</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 mb-1">Avg. Reading Time:</p>
                    <p className="font-semibold">3.5 hours</p>
                  </div>
                  <div>
                    <p className="text-zinc-600 mb-1">Community Rating:</p>
                    <p className="font-semibold">⭐⭐⭐⭐⭐ 4.8/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Post Input (Disabled) */}
            <Card>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Share your thoughts about this book..."
                  rows={3}
                  disabled
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-500">
                    Login to post in the forum
                  </p>
                  <Button onClick={handleAction}>Post Comment</Button>
                </div>
              </CardContent>
            </Card>

            {/* Filter Info */}
            <div className="flex justify-between items-center">
              <p className="text-zinc-600">
                {selectedChapter === "All" ? "All Chapters" : selectedChapter} •
                <span className="font-semibold ml-1">
                  {filteredDiscussions.length}
                </span>{" "}
                posts
              </p>
              <Button variant="outline" size="sm" onClick={handleAction}>
                + New Discussion
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card
                  key={discussion.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center font-bold text-lg">
                          {discussion.user.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <p className="font-semibold text-zinc-900">
                              {discussion.user}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                              <Badge variant="secondary" size="sm">
                                {discussion.chapter}
                              </Badge>
                              <span>•</span>
                              <span>{discussion.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-zinc-700 mb-4 leading-relaxed">
                          {discussion.content}
                        </p>
                        <div className="flex gap-4">
                          <button
                            onClick={handleAction}
                            className="flex items-center gap-1 text-sm text-zinc-600 hover:text-primary transition-colors"
                          >
                            ❤️ {discussion.likes} Likes
                          </button>
                          <button
                            onClick={handleAction}
                            className="flex items-center gap-1 text-sm text-zinc-600 hover:text-primary transition-colors"
                          >
                            💬 {discussion.replies} Replies
                          </button>
                          <button
                            onClick={handleAction}
                            className="flex items-center gap-1 text-sm text-zinc-600 hover:text-primary transition-colors"
                          >
                            🔗 Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDiscussions.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-zinc-600 mb-4">
                  No discussions yet for this chapter
                </p>
                <Button onClick={handleAction}>Start the Discussion</Button>
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
                You need to be logged in to post, comment, or interact with
                discussions.
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
