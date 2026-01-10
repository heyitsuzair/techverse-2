"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Button,
  Text,
  Input,
  Textarea,
  Select,
  LinkWithProgress,
  Alert,
  AlertDescription,
} from "@/components/ui";
import routes from "@/config/routes";
import {
  ArrowLeft,
  BookOpen,
  Save,
  Loader2,
  CheckCircle2,
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import DeleteImageModal from "./DeleteImageModal";

// Mock data - Replace with actual API call
const MOCK_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    condition: "Excellent",
    status: "Available",
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

const GENRE_OPTIONS = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Mystery", label: "Mystery" },
  { value: "Thriller", label: "Thriller" },
  { value: "Romance", label: "Romance" },
  { value: "Horror", label: "Horror" },
  { value: "Biography", label: "Biography" },
  { value: "History", label: "History" },
  { value: "Self-Help", label: "Self-Help" },
  { value: "Other", label: "Other" },
];

const CONDITION_OPTIONS = [
  { value: "Like New", label: "Like New" },
  { value: "Excellent", label: "Excellent" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
  { value: "Poor", label: "Poor" },
];

const LANGUAGE_OPTIONS = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Other", label: "Other" },
];

export default function EditBook({ params }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    condition: "",
    description: "",
    isbn: "",
    publishYear: "",
    language: "",
    pages: "",
    publisher: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
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

    // Simulate API call to fetch book data
    const fetchBook = async () => {
      try {
        const book = MOCK_BOOKS.find((b) => b.id === parseInt(bookId));
        if (book) {
          setFormData({
            title: book.title,
            author: book.author,
            genre: book.genre,
            condition: book.condition,
            description: book.description,
            isbn: book.isbn,
            publishYear: book.publishYear,
            language: book.language,
            pages: book.pages.toString(),
            publisher: book.publisher,
            location: book.location,
          });
          // Set the cover image if it exists
          if (book.coverImage) {
            setImagePreview(book.coverImage);
          }
        } else {
          setError("Book not found");
        }
      } catch (err) {
        setError("Failed to load book data");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setBookImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleDeleteImage = () => {
    setBookImage(null);
    setImagePreview(null);
    setShowDeleteImageModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.pages && isNaN(parseInt(formData.pages))) {
      newErrors.pages = "Pages must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Simulate API call to update book
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Updating book:", bookId, formData);

      setSuccess(true);

      // Redirect after a short delay
      setTimeout(() => {
        router.push(routes.dashboard.books.view(bookId));
      }, 1500);
    } catch (err) {
      setError("Failed to update book. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center py-12">
            <BookOpen className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
            <Text variant="h3" className="mb-2">
              Book Not Found
            </Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              The book you're trying to edit doesn't exist or has been removed.
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

  return (
    <div className="bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <LinkWithProgress
            href={
              bookId
                ? routes.dashboard.books.view(bookId)
                : routes.dashboard.books.myBooks
            }
          >
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Book Details
            </Button>
          </LinkWithProgress>

          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Edit Book
          </Text>
          <Text variant="body" className="text-zinc-600">
            Update your book information
          </Text>
        </div>

        {/* Success Alert */}
        {success && (
          <Alert variant="success" className="mb-6">
            <CheckCircle2 className="w-4 h-4" />
            <AlertDescription>
              Book updated successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="error" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Book Image Upload Section */}
                <div>
                  <Text variant="h4" className="mb-4">
                    Book Cover Image
                  </Text>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Preview */}
                    <div className="w-full md:w-48">
                      <div className="relative w-full h-64 md:h-72 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Book cover preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-zinc-400 mx-auto mb-2" />
                            <Text variant="caption" className="text-zinc-500">
                              No image uploaded
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Image Controls */}
                    <div className="flex-1">
                      <Text variant="body" className="text-zinc-700 mb-4">
                        Upload or change the book cover image. Recommended size:
                        400x600px
                      </Text>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleChangeImageClick}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </Button>

                        {imagePreview && (
                          <Button
                            type="button"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => setShowDeleteImageModal(true)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Image
                          </Button>
                        )}
                      </div>

                      <Text
                        variant="caption"
                        className="text-zinc-500 mt-3 block"
                      >
                        Supported formats: JPG, PNG, GIF (Max 5MB)
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div>
                  <Text variant="h4" className="mb-4">
                    Basic Information
                  </Text>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Book Title *
                        </Text>
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter book title"
                        error={errors.title}
                      />
                      {errors.title && (
                        <Text variant="caption" className="text-red-600 mt-1">
                          {errors.title}
                        </Text>
                      )}
                    </div>

                    <div>
                      <label htmlFor="author" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Author * (Cannot be changed)
                        </Text>
                      </label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        error={errors.author}
                        disabled
                        className="bg-zinc-100 cursor-not-allowed"
                      />
                      <Text variant="caption" className="text-zinc-500 mt-1">
                        Author name cannot be modified after creation
                      </Text>
                    </div>

                    <div>
                      <label htmlFor="genre" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Genre *
                        </Text>
                      </label>
                      <Select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        options={GENRE_OPTIONS}
                        error={errors.genre}
                      />
                      {errors.genre && (
                        <Text variant="caption" className="text-red-600 mt-1">
                          {errors.genre}
                        </Text>
                      )}
                    </div>

                    <div>
                      <label htmlFor="condition" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Condition *
                        </Text>
                      </label>
                      <Select
                        id="condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        options={CONDITION_OPTIONS}
                        error={errors.condition}
                      />
                      {errors.condition && (
                        <Text variant="caption" className="text-red-600 mt-1">
                          {errors.condition}
                        </Text>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Location
                        </Text>
                      </label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., New York, NY"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block mb-2">
                    <Text variant="body" className="font-medium">
                      Description *
                    </Text>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the book"
                    rows={5}
                    error={errors.description}
                  />
                  {errors.description && (
                    <Text variant="caption" className="text-red-600 mt-1">
                      {errors.description}
                    </Text>
                  )}
                </div>

                {/* Publication Details */}
                <div>
                  <Text variant="h4" className="mb-4">
                    Publication Details
                  </Text>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="isbn" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          ISBN
                        </Text>
                      </label>
                      <Input
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        placeholder="978-0000000000"
                      />
                    </div>

                    <div>
                      <label htmlFor="publishYear" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Publication Year
                        </Text>
                      </label>
                      <Input
                        id="publishYear"
                        name="publishYear"
                        value={formData.publishYear}
                        onChange={handleChange}
                        placeholder="2024"
                      />
                    </div>

                    <div>
                      <label htmlFor="publisher" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Publisher
                        </Text>
                      </label>
                      <Input
                        id="publisher"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        placeholder="Enter publisher name"
                      />
                    </div>

                    <div>
                      <label htmlFor="language" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Language
                        </Text>
                      </label>
                      <Select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        options={LANGUAGE_OPTIONS}
                      />
                    </div>

                    <div>
                      <label htmlFor="pages" className="block mb-2">
                        <Text variant="body" className="font-medium">
                          Number of Pages
                        </Text>
                      </label>
                      <Input
                        id="pages"
                        name="pages"
                        type="number"
                        value={formData.pages}
                        onChange={handleChange}
                        placeholder="300"
                        error={errors.pages}
                      />
                      {errors.pages && (
                        <Text variant="caption" className="text-red-600 mt-1">
                          {errors.pages}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-zinc-200">
                  <Button
                    type="submit"
                    disabled={saving || success}
                    className="flex-1 sm:flex-initial"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <LinkWithProgress
                    href={
                      bookId
                        ? routes.dashboard.books.view(bookId)
                        : routes.dashboard.books.myBooks
                    }
                  >
                    <Button type="button" variant="outline" disabled={saving}>
                      Cancel
                    </Button>
                  </LinkWithProgress>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Delete Image Modal */}
      <DeleteImageModal
        isOpen={showDeleteImageModal}
        onClose={() => setShowDeleteImageModal(false)}
        onConfirmDelete={handleDeleteImage}
        imageName={bookImage?.name || "Book cover image"}
      />
    </div>
  );
}
