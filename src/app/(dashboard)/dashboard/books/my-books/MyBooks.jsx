"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Text,
  Badge,
  LinkWithProgress,
  Spinner,
} from "@/components/ui";
import routes from "@/config/routes";
import DeleteBookModal from "./DeleteBookModal";
import { getBooks, deleteBook } from "@/lib/api/books";
import { getFromCookie } from "@/utils/cookies";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  BookOpen,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  MapPin,
  Calendar,
} from "lucide-react";

export default function MyBooks() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("owned");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books
  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getBooks({ userId: user.id });
        // Map books to ensure id field exists (backend might return _id)
        const booksWithId = (response.books || []).map(book => ({
          ...book,
          id: book.id || book._id
        }));
        setBooks(booksWithId);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load your books");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, [user]);

  // Filter books by status
  const ownedBooks = books.filter((book) => book.isAvailable);
  const listedBooks = books.filter(
    (book) => !book.isAvailable && book._count?.exchanges > 0
  );
  const exchangedBooks = []; // This would come from exchange history API

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (bookId) => {
    try {
      const accessToken = getFromCookie("accessToken");
      
      if (!accessToken) {
        toast.error("Please login to delete books");
        return;
      }

      await deleteBook(bookId, accessToken);
      toast.success("Book deleted successfully");
      
      // Remove book from state
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.message || "Failed to delete book");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            My Books
          </Text>
          <Text variant="body" className="text-zinc-600">
            Manage your book collection and track exchanges
          </Text>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="caption" className="text-zinc-600 mb-1">
                        Total Books
                      </Text>
                      <Text variant="h2">{books.length}</Text>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="caption" className="text-zinc-600 mb-1">
                        Available Books
                      </Text>
                      <Text variant="h2">{ownedBooks.length}</Text>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="caption" className="text-zinc-600 mb-1">
                        Active Exchanges
                      </Text>
                      <Text variant="h2">{listedBooks.length}</Text>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-zinc-200">
              {[
                {
                  id: "owned",
                  label: "Available Books",
                  count: ownedBooks.length,
                },
                {
                  id: "listed",
                  label: "Active Exchanges",
                  count: listedBooks.length,
                },
                {
                  id: "exchanged",
                  label: "Exchange History",
                  count: exchangedBooks.length,
                },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {tab.label}
                  <Badge
                    variant={activeTab === tab.id ? "primary" : "default"}
                    className="text-xs"
                  >
                    {tab.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Owned Books Tab */}
            {activeTab === "owned" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownedBooks.length === 0 ? (
                  <div className="col-span-full">
                    <Card>
                      <CardContent className="pt-6 text-center py-8 sm:py-12">
                        <BookOpen className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                        <Text variant="h4" className="mb-2">
                          No Available Books
                        </Text>
                        <Text variant="body" className="text-zinc-600 mb-4">
                          You haven&apos;t added any books yet
                        </Text>
                        <LinkWithProgress href={routes.dashboard.books.add}>
                          <Button variant="primary">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Add Your First Book
                          </Button>
                        </LinkWithProgress>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <>
                    {ownedBooks.map((book) => (
                      <Card
                        key={book.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="pt-6">
                          {/* Cover Image */}
                          {book.coverImage && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}

                          <div className="flex items-start justify-between mb-4">
                            <Badge
                              variant={book.isAvailable ? "success" : "default"}
                            >
                              {book.isAvailable ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Available
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Not Available
                                </>
                              )}
                            </Badge>
                            <Badge variant="primary" className="text-xs">
                              {book.pointValue} pts
                            </Badge>
                          </div>

                          <Text variant="h4" className="mb-1">
                            {book.title}
                          </Text>
                          <Text variant="body" className="text-zinc-600 mb-4">
                            by {book.author}
                          </Text>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                              <Package className="w-4 h-4" />
                              <Text variant="caption">
                                {book.genre} • {book.condition}
                              </Text>
                            </div>
                            {book.locationAddress && (
                              <div className="flex items-center gap-2 text-sm text-zinc-600">
                                <MapPin className="w-4 h-4" />
                                <Text variant="caption" className="truncate">
                                  {book.locationAddress}
                                </Text>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                              <Calendar className="w-4 h-4" />
                              <Text variant="caption">
                                Added {formatDate(book.createdAt)}
                              </Text>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <LinkWithProgress
                              href={routes.dashboard.books.view(book.id)}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </LinkWithProgress>
                            <LinkWithProgress
                              href={routes.dashboard.books.edit(book.id)}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                            </LinkWithProgress>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteClick(book)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <LinkWithProgress href={routes.dashboard.books.add}>
                      <Card className="hover:shadow-lg transition-shadow border-2 border-dashed border-zinc-300 hover:border-primary cursor-pointer">
                        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <Text variant="h4" className="mb-2">
                            Add New Book
                          </Text>
                          <Text
                            variant="caption"
                            className="text-zinc-600 text-center"
                          >
                            List another book from your collection
                          </Text>
                        </CardContent>
                      </Card>
                    </LinkWithProgress>
                  </>
                )}
              </div>
            )}

            {/* Listed Books Tab */}
            {activeTab === "listed" && (
              <div className="space-y-4">
                {listedBooks.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-8 sm:py-12">
                      <Clock className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                      <Text variant="h4" className="mb-2">
                        No Active Exchanges
                      </Text>
                      <Text variant="body" className="text-zinc-600">
                        Books with pending or in-transit exchanges will appear
                        here
                      </Text>
                    </CardContent>
                  </Card>
                ) : (
                  listedBooks.map((book) => (
                    <Card key={book.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                            {book.coverImage ? (
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <BookOpen className="w-8 h-8 text-zinc-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Text variant="h4" className="mb-1">
                                  {book.title}
                                </Text>
                                <Text variant="body" className="text-zinc-600">
                                  by {book.author}
                                </Text>
                              </div>
                              <Badge variant="warning">
                                <Clock className="w-3 h-3 mr-1" />
                                {book._count?.exchanges || 0} exchange
                                {book._count?.exchanges === 1 ? "" : "s"}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <Text
                                  variant="caption"
                                  className="text-zinc-500"
                                >
                                  Condition
                                </Text>
                                <Text variant="body">{book.condition}</Text>
                              </div>
                              <div>
                                <Text
                                  variant="caption"
                                  className="text-zinc-500"
                                >
                                  Location
                                </Text>
                                <Text variant="body">
                                  {book.locationAddress || "N/A"}
                                </Text>
                              </div>
                              <div>
                                <Text
                                  variant="caption"
                                  className="text-zinc-500"
                                >
                                  Point Value
                                </Text>
                                <Text variant="body">
                                  {book.pointValue} points
                                </Text>
                              </div>
                              <div>
                                <Text
                                  variant="caption"
                                  className="text-zinc-500"
                                >
                                  Genre
                                </Text>
                                <Text variant="body">{book.genre}</Text>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <LinkWithProgress
                                href={routes.dashboard.books.view(book.id)}
                              >
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </LinkWithProgress>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Exchanged Books Tab */}
            {activeTab === "exchanged" && (
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6 text-center py-8 sm:py-12">
                    <Package className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                    <Text variant="h4" className="mb-2">
                      Exchange History Coming Soon
                    </Text>
                    <Text variant="body" className="text-zinc-600">
                      Your completed exchanges will appear here
                    </Text>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteBookModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        book={selectedBook}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
