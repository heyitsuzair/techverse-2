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
} from "@/components/ui";
import routes from "@/config/routes";
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

// Mock data - Replace with actual API call
const MOCK_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    condition: "Excellent",
    status: "Available",
    requests: 3,
    addedDate: "2025-12-01",
    location: "New York, NY",
    description:
      "Set in the Jazz Age on Long Island, this novel tells the story of Jay Gatsby, a mysterious millionaire who throws extravagant parties in hopes of reuniting with his lost love, Daisy Buchanan. Through the eyes of narrator Nick Carraway, we witness the tragic tale of obsession, wealth, and the American Dream. Fitzgerald's masterpiece captures the essence of the Roaring Twenties with its vivid portrayal of excess, moral decay, and impossible dreams.",
    isbn: "978-0743273565",
    publishYear: "1925",
    language: "English",
    pages: 180,
    publisher: "Scribner",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    condition: "Good",
    status: "Available",
    requests: 5,
    addedDate: "2025-11-20",
    location: "New York, NY",
    description:
      "This Pulitzer Prize-winning novel is narrated by Scout Finch, a young girl growing up in the fictional town of Maycomb, Alabama, during the Great Depression. Her father, Atticus Finch, a principled lawyer, defends a black man falsely accused of rape, exposing the deep-seated racism and prejudice of the American South. Through Scout's innocent eyes, we learn powerful lessons about morality, compassion, and courage in the face of injustice.",
    isbn: "978-0061120084",
    publishYear: "1960",
    language: "English",
    pages: 324,
    publisher: "J.B. Lippincott & Co.",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    condition: "Like New",
    status: "Available",
    requests: 7,
    addedDate: "2025-11-15",
    location: "Los Angeles, CA",
    description:
      "In a totalitarian future society ruled by the Party and its leader Big Brother, Winston Smith works at the Ministry of Truth, rewriting history to fit the Party's narrative. As he begins to question the oppressive regime and falls in love with Julia, Winston risks everything for freedom and truth. Orwell's chilling dystopian masterpiece explores themes of surveillance, propaganda, and the manipulation of truth.",
    isbn: "978-0451524935",
    publishYear: "1949",
    language: "English",
    pages: 328,
    publisher: "Signet Classic",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    condition: "Good",
    status: "Available",
    requests: 4,
    addedDate: "2025-10-28",
    location: "Boston, MA",
    description:
      "Elizabeth Bennet, a witty and independent young woman, navigates the complex social landscape of Regency-era England. When she meets the wealthy but seemingly arrogant Mr. Darcy, their initial mutual dislike slowly transforms into deep affection. Austen's beloved novel is a timeless exploration of love, class, reputation, and the importance of looking beyond first impressions.",
    isbn: "978-0141439518",
    publishYear: "1813",
    language: "English",
    pages: 432,
    publisher: "Penguin Classics",
    coverImage:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    condition: "Excellent",
    status: "Available",
    requests: 8,
    addedDate: "2025-10-10",
    location: "Seattle, WA",
    description:
      "Bilbo Baggins, a comfort-loving hobbit, is swept into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Accompanied by the wizard Gandalf and thirteen dwarves, Bilbo embarks on a journey filled with trolls, goblins, giant spiders, and a mysterious creature named Gollum. This enchanting tale of adventure and self-discovery is the beloved prelude to The Lord of the Rings.",
    isbn: "978-0547928227",
    publishYear: "1937",
    language: "English",
    pages: 366,
    publisher: "Houghton Mifflin Harcourt",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
  },
];

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

    // Simulate API call
    const fetchBook = async () => {
      try {
        // Replace with actual API call
        const foundBook = MOCK_BOOKS.find((b) => b.id === parseInt(bookId));
        setBook(foundBook || null);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleDelete = async (bookIdToDelete) => {
    // Implement delete logic here
    console.log("Deleting book:", bookIdToDelete);
    // After successful deletion, redirect to my-books page
    router.push(routes.dashboard.books.myBooks);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "Pending":
      case "In Transit":
        return "warning";
      case "Exchanged":
        return "primary";
      default:
        return "default";
    }
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
              <Badge variant={getStatusColor(book.status)} className="text-sm">
                {book.status}
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
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Published
                          </Text>
                          <Text variant="body" className="font-medium">
                            {book.publishYear}
                          </Text>
                        </div>
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Pages
                          </Text>
                          <Text variant="body" className="font-medium">
                            {book.pages}
                          </Text>
                        </div>
                        <div>
                          <Text
                            variant="caption"
                            className="text-zinc-500 mb-1"
                          >
                            Language
                          </Text>
                          <Text variant="body" className="font-medium">
                            {book.language}
                          </Text>
                        </div>
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

              {/* Publisher Info */}
              <Card>
                <CardContent className="pt-6">
                  <Text variant="h4" className="mb-4">
                    Publication Details
                  </Text>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-zinc-500" />
                      <div>
                        <Text variant="caption" className="text-zinc-500">
                          Publisher
                        </Text>
                        <Text variant="body" className="font-medium">
                          {book.publisher}
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-zinc-500" />
                      <div>
                        <Text variant="caption" className="text-zinc-500">
                          Publication Year
                        </Text>
                        <Text variant="body" className="font-medium">
                          {book.publishYear}
                        </Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                        <Text variant="body">Exchange Requests</Text>
                      </div>
                      <Badge variant="primary">{book.requests}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-zinc-500" />
                        <Text variant="body">Added Date</Text>
                      </div>
                      <Text variant="caption" className="text-zinc-600">
                        {book.addedDate}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card>
                <CardContent className="pt-6">
                  <Text variant="h4" className="mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </Text>
                  <Text variant="body" className="text-zinc-700">
                    {book.location}
                  </Text>
                </CardContent>
              </Card>
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
