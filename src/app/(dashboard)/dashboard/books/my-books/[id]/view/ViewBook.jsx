"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Button,
  Text,
  Badge,
  LinkWithProgress,
  Spinner,
} from "@/components/ui";
import routes from "@/config/routes";
import { getBookById, deleteBook } from "@/lib/api/books";
import { getFromCookie } from "@/utils/cookies";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  Package,
  MapPin,
  Calendar,
  User,
  Clock,
  Edit2,
  Trash2,
  Star,
  MessageSquare,
} from "lucide-react";
import DeleteBookModal from "../../DeleteBookModal";

export default function ViewBook({ params }) {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    // Extract bookId from params
    const getParams = async () => {
      const resolvedParams = await params;
      setBookId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!bookId) return;

    // Fetch book from API
    const fetchBook = async () => {
      try {
        const response = await getBookById(bookId);
        if (response.success && response.book) {
          setBook(response.book);
        } else {
          setBook(null);
          toast.error("Book not found");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error(error.message || "Failed to load book");
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleDelete = async (bookIdToDelete) => {
    try {
      const accessToken = getFromCookie("accessToken");
      
      if (!accessToken) {
        toast.error("Please login to delete books");
        return;
      }

      await deleteBook(bookIdToDelete, accessToken);
      toast.success("Book deleted successfully");
      
      // Redirect to my-books page after successful deletion
      router.push(routes.dashboard.books.myBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.message || "Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center py-12">
            <BookOpen className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
            <Text variant="h3" className="mb-2">
              Book Not Found
            </Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              The book you're looking for doesn't exist or has been removed.
            </Text>
            <LinkWithProgress href={routes.dashboard.books.myBooks}>
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Books
              </Button>
            </LinkWithProgress>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (isAvailable) => {
    return isAvailable ? "success" : "default";
  };

  return (
    <>
      <div className="bg-zinc-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <LinkWithProgress href={routes.dashboard.books.myBooks}>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Books
              </Button>
            </LinkWithProgress>

            <div className="flex items-start justify-between">
              <div>
                <Text variant="h1" className="mb-2">
                  {book.title}
                </Text>
                <Text variant="h4" className="text-zinc-600">
                  by {book.author}
                </Text>
              </div>
              <Badge variant={getStatusColor(book.isAvailable)} className="text-sm">
                {book.isAvailable ? "Available" : "Not Available"}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Book Cover and Quick Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Book Cover */}
                    <div className="w-full sm:w-40 h-56 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-lg flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <BookOpen className="w-16 h-16 text-zinc-400 mx-auto mb-2" />
                          <Text variant="caption" className="text-zinc-500">
                            No cover image
                          </Text>
                        </div>
                      )}
                    </div>

                    {/* Quick Info */}
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Genre
                          </Text>
                          <Text variant="body" className="font-medium">
                            {book.genre}
                          </Text>
                        </div>
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Condition
                          </Text>
                          <Text variant="body" className="font-medium">
                            {book.condition}
                          </Text>
                        </div>
                        {book.isbn && (
                          <div>
                            <Text
                              variant="caption"
                              className="text-zinc-500 mb-1"
                            >
                              ISBN
                            </Text>
                            <Text
                              variant="caption"
                              className="font-mono text-zinc-700"
                            >
                              {book.isbn}
                            </Text>
                          </div>
                        )}
                        {book.pointValue && (
                          <div>
                            <Text
                              variant="caption"
                              className="text-zinc-500 mb-1"
                            >
                              Point Value
                            </Text>
                            <Text variant="body" className="font-medium text-primary">
                              {book.pointValue} points
                            </Text>
                          </div>
                        )}
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Added On
                          </Text>
                          <Text variant="caption" className="text-zinc-700">
                            {new Date(book.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <Text variant="h4" className="mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Description
                  </Text>
                  <Text
                    variant="body"
                    className="text-zinc-700 leading-relaxed"
                  >
                    {book.description}
                  </Text>
                </CardContent>
              </Card>

              {/* QR Code */}
              {book.qrCodeUrl && (
                <Card>
                  <CardContent className="pt-6">
                    <Text variant="h4" className="mb-4">
                      QR Code
                    </Text>
                    <div className="flex justify-center">
                      <img 
                        src={book.qrCodeUrl} 
                        alt="Book QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <Text variant="caption" className="text-center text-zinc-600 mt-3 block">
                      Scan to view book details
                    </Text>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions Card */}
              <Card>
                <CardContent className="pt-6">
                  <Text variant="h4" className="mb-4">
                    Actions
                  </Text>
                  <div className="flex flex-col gap-3">
                    <LinkWithProgress
                      href={
                        bookId
                          ? routes.dashboard.books.edit(bookId)
                          : routes.dashboard.books.myBooks
                      }
                    >
                      <Button variant="outline" className="w-full">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Book
                      </Button>
                    </LinkWithProgress>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Book
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card>
                <CardContent className="pt-6">
                  <Text variant="h4" className="mb-4">
                    Book Statistics
                  </Text>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-zinc-500" />
                        <Text variant="body">Exchanges</Text>
                      </div>
                      <Badge variant="primary">{book._count?.exchanges || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-zinc-500" />
                        <Text variant="body">Added Date</Text>
                      </div>
                      <Text variant="caption" className="text-zinc-600">
                        {new Date(book.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </Text>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-zinc-500" />
                        <Text variant="body">Status</Text>
                      </div>
                      <Badge variant={book.isAvailable ? "success" : "default"}>
                        {book.isAvailable ? "Available" : "Not Available"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              {book.locationAddress && (
                <Card>
                  <CardContent className="pt-6">
                    <Text variant="h4" className="mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location
                    </Text>
                    <Text variant="body" className="text-zinc-700">
                      {book.locationAddress}
                    </Text>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteBookModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        book={book}
        onConfirmDelete={handleDelete}
      />
    </>
  );
}
