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
  Spinner,
} from "@/components/ui";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import routes from "@/config/routes";
import { getBookById, updateBook } from "@/lib/api/books";
import { getFromCookie } from "@/utils/cookies";
import { toast } from "sonner";
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

const BOOK_GENRES = [
  "Classic Fiction",
  "Contemporary Fiction",
  "Literary Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Horror",
  "Romance",
  "Historical Fiction",
  "Dystopian",
  "Adventure",
  "Young Adult",
  "Children's Books",
  "Non-Fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "History",
  "Self-Help",
  "Business",
  "Psychology",
  "Philosophy",
  "Religion",
  "Science",
  "Technology",
  "Travel",
  "Cooking",
  "Art",
  "Poetry",
  "Drama",
  "Comics",
  "Graphic Novels",
  "Education",
  "Health & Wellness"
];

const BOOK_CONDITIONS = [
  { value: "new", label: "Like New", description: "Perfect condition, no wear" },
  { value: "excellent", label: "Excellent", description: "Minor signs of use" },
  { value: "good", label: "Good", description: "Used but well maintained" },
  { value: "fair", label: "Fair", description: "Visible wear but fully readable" },
  { value: "poor", label: "Poor", description: "Significant wear, pages intact" }
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
    locationAddress: "",
    locationLat: null,
    locationLng: null,
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

    const fetchBook = async () => {
      try {
        const response = await getBookById(bookId);
        if (response.success && response.book) {
          const book = response.book;
          setFormData({
            title: book.title || "",
            author: book.author || "",
            genre: book.genre || "",
            condition: book.condition || "",
            description: book.description || "",
            isbn: book.isbn || "",
            locationAddress: book.locationAddress || "",
            locationLat: book.locationLat || null,
            locationLng: book.locationLng || null,
          });
          if (book.coverImage) {
            setImagePreview(book.coverImage);
          }
        } else {
          setError("Book not found");
          toast.error("Book not found");
        }
      } catch (err) {
        console.error("Failed to load book:", err);
        setError("Failed to load book data");
        toast.error(err.message || "Failed to load book data");
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
      const accessToken = getFromCookie("accessToken");
      if (!accessToken) {
        toast.error("Please sign in to update book");
        setSaving(false);
        return;
      }

      const bookData = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        condition: formData.condition,
        description: formData.description || "",
        isbn: formData.isbn || "",
        locationAddress: formData.locationAddress || "",
        locationLat: formData.locationLat || null,
        locationLng: formData.locationLng || null,
      };

      if (bookImage) {
        bookData.coverImage = bookImage;
      }

      const response = await updateBook(bookId, bookData, accessToken);

      if (response.success) {
        setSuccess(true);
        toast.success(response.message || "Book updated successfully!");
        
        setTimeout(() => {
          router.push(routes.dashboard.books.view(bookId));
        }, 1500);
      }
    } catch (err) {
      console.error("Failed to update book:", err);
      setError(err.message || "Failed to update book. Please try again.");
      toast.error(err.message || "Failed to update book");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
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
                  </div>

                  {/* Location Field */}
                  <div>
                    <Text variant="caption" className="mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Book Location
                    </Text>
                    <AddressAutocomplete
                      value={formData.locationAddress}
                      onChange={(address, lat, lng) => {
                        setFormData({
                          ...formData,
                          locationAddress: address,
                          locationLat: lat,
                          locationLng: lng
                        });
                      }}
                      placeholder="Search for book location"
                    />
                    <Text variant="caption" className="text-zinc-600 mt-2">
                      This helps match you with nearby readers
                    </Text>
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
