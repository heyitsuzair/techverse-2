"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Input,
  Textarea,
  Select,
  Badge,
  Radio
} from "@/components/ui";
import { AddressAutocomplete } from "@/components/ui/AddressAutocomplete";
import { 
  BookOpen,
  Upload,
  MapPin,
  QrCode,
  CheckCircle2,
  Image as ImageIcon,
  X
} from "lucide-react";
import { createBook } from '@/lib/api/books';
import { getFromCookie } from '@/utils/cookies';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';

// Book Genres
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

export default function AddBook() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    condition: "",
    description: "",
    locationAddress: "",
    locationLat: null,
    locationLng: null,
    images: [] // Will store { file: File, preview: string }
  });
  const [createdBook, setCreatedBook] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index) => {
    const imageToRemove = formData.images[index];
    // Revoke the object URL to free memory
    URL.revokeObjectURL(imageToRemove.preview);
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Get access token
      const accessToken = getFromCookie('accessToken');
      if (!accessToken) {
        toast.error('Please sign in to add a book');
        return;
      }
      
      // Prepare book data
      const bookData = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        genre: formData.genre,
        condition: formData.condition,
        description: formData.description,
        locationAddress: formData.locationAddress,
        locationLat: formData.locationLat,
        locationLng: formData.locationLng,
      };
      
      // Add first image as cover image if available
      if (formData.images.length > 0) {
        bookData.coverImage = formData.images[0].file;
      }
      
      // Call API
      const response = await createBook(bookData, accessToken);
      
      if (response.success) {
        setCreatedBook(response.book);
        toast.success(response.message || 'Book added successfully!');
      }
    } catch (error) {
      console.error('Failed to create book:', error);
      toast.error(error.message || 'Failed to add book');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createdBook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <Text variant="h2" className="mb-2">Book Added Successfully!</Text>
              <Text variant="body" className="text-zinc-600 mb-6">
                Your book has been listed on the marketplace
              </Text>
              
              <div className="bg-white border-2 border-zinc-200 rounded-lg p-6 mb-6">
                {createdBook.qrCodeUrl ? (
                  <img 
                    src={createdBook.qrCodeUrl} 
                    alt="QR Code"
                    className="w-48 h-48 mx-auto object-contain"
                  />
                ) : (
                  <QrCode className="w-32 h-32 mx-auto text-zinc-400" />
                )}
                <Text variant="caption" className="text-zinc-600 mt-4 block">
                  {createdBook.qrCodeUrl ? 'QR Code Generated Successfully' : 'QR Code Generation Pending'}
                </Text>
              </div>

              <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
                <Text variant="caption" className="text-zinc-600 mb-3 block">Book Details</Text>
                
                {/* Cover Image */}
                {createdBook.coverImage && (
                  <div className="mb-4">
                    <img 
                      src={createdBook.coverImage} 
                      alt={createdBook.title}
                      className="w-32 h-48 object-cover rounded-lg mx-auto"
                    />
                  </div>
                )}
                
                <Text variant="h4" className="mb-1">{createdBook.title}</Text>
                <Text variant="body" className="text-zinc-600 mb-3">by {createdBook.author || 'Unknown Author'}</Text>
                
                <div className="space-y-2 mb-3">
                  {createdBook.isbn && (
                    <div className="flex justify-between">
                      <Text variant="caption" className="text-zinc-600">ISBN:</Text>
                      <Text variant="caption">{createdBook.isbn}</Text>
                    </div>
                  )}
                  {createdBook.pointValue && (
                    <div className="flex justify-between">
                      <Text variant="caption" className="text-zinc-600">Point Value:</Text>
                      <Text variant="caption" className="font-semibold text-primary">{createdBook.pointValue} points</Text>
                    </div>
                  )}
                  {createdBook.locationAddress && (
                    <div className="flex justify-between">
                      <Text variant="caption" className="text-zinc-600">Location:</Text>
                      <Text variant="caption">{createdBook.locationAddress}</Text>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="primary">{createdBook.genre}</Badge>
                  <Badge variant="success">{createdBook.condition}</Badge>
                  {createdBook.isAvailable && <Badge>Available</Badge>}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => {
                  setCreatedBook(null);
                  setFormData({
                    title: "",
                    author: "",
                    isbn: "",
                    genre: "",
                    condition: "",
                    description: "",
                    locationAddress: "",
                    locationLat: null,
                    locationLng: null,
                    images: []
                  });
                  setStep(1);
                }}>
                  Add Another Book
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => router.push(routes.dashboard.books.myBooks)}
                >
                  View My Books
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
            Add a New Book
          </Text>
          <Text variant="body" className="text-zinc-600 text-sm sm:text-base">
            Fill in the details below to list your book on the marketplace
          </Text>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {[
            { num: 1, label: "Book Details" },
            { num: 2, label: "Upload Images" },
            { num: 3, label: "Location" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                  step >= s.num ? "bg-blue-600 text-white" : "bg-zinc-200 text-zinc-600"
                }`}>
                  {s.num}
                </div>
                <Text variant="caption" className={`text-xs sm:text-sm whitespace-nowrap ${step >= s.num ? "text-blue-600 font-semibold" : "text-zinc-600"}`}>
                  {s.label}
                </Text>
              </div>
              {idx < 2 && <div className={`w-6 sm:w-12 h-0.5 ${step > s.num ? "bg-blue-600" : "bg-zinc-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6">
              {/* Step 1: Book Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text variant="caption" className="mb-2">Book Title *</Text>
                      <Input
                        placeholder="Enter book title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Text variant="caption" className="mb-2">Author *</Text>
                      <Input
                        placeholder="Enter author name"
                        value={formData.author}
                        onChange={(e) => handleChange("author", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text variant="caption" className="mb-2">ISBN (Optional)</Text>
                      <Input
                        placeholder="Enter ISBN number"
                        value={formData.isbn}
                        onChange={(e) => handleChange("isbn", e.target.value)}
                      />
                    </div>
                    <div>
                      <Text variant="caption" className="mb-2">Genre *</Text>
                      <Select
                        value={formData.genre}
                        onChange={(e) => handleChange("genre", e.target.value)}
                        placeholder="Select genre"
                        options={BOOK_GENRES.map(genre => ({
                          value: genre,
                          label: genre
                        }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Book Condition *</Text>
                    <div className="grid md:grid-cols-2 gap-3">
                      {BOOK_CONDITIONS.map((condition) => (
                        <label
                          key={condition.value}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-start ${
                            formData.condition === condition.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={condition.value}
                            checked={formData.condition === condition.value}
                            onChange={(e) => handleChange("condition", e.target.value)}
                            className="w-4 h-4 mt-1 text-primary border-zinc-300 focus:outline-none focus:ring-0 cursor-pointer accent-primary flex-shrink-0"
                            required
                          />
                          <div className="ml-3 flex-1">
                            <span className="font-semibold block">{condition.label}</span>
                            <Text variant="caption" className="block text-zinc-600 mt-1">
                              {condition.description}
                            </Text>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Description</Text>
                    <Textarea
                      placeholder="Add any additional details about the book..."
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setStep(2)}>
                      Next: Upload Images
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Upload Images */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Text variant="caption" className="mb-2">Book Images</Text>
                    <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                      <Upload className="w-12 h-12 mx-auto text-zinc-400 mb-4" />
                      <Text variant="body" className="mb-2">
                        Click to upload or drag and drop
                      </Text>
                      <Text variant="caption" className="text-zinc-600 mb-4">
                        PNG, JPG or WEBP (max. 5MB each)
                      </Text>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload"
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:ring-primary h-10 px-4 text-base"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Select Images
                      </label>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <Text variant="caption" className="mb-3">Uploaded Images ({formData.images.length})</Text>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.images.map((image, idx) => (
                          <div key={idx} className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden group">
                            <img 
                              src={image.preview} 
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => setStep(3)}>
                      Next: Location
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <Text variant="caption" className="mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Book Location *
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

                  <div className="bg-zinc-100 rounded-lg p-4">
                    <Text variant="h4" className="mb-4">Summary</Text>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Text variant="caption" className="text-zinc-600">Title:</Text>
                        <Text variant="body">{formData.title || "-"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="caption" className="text-zinc-600">Author:</Text>
                        <Text variant="body">{formData.author || "-"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="caption" className="text-zinc-600">Genre:</Text>
                        <Text variant="body">{formData.genre || "-"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="caption" className="text-zinc-600">Condition:</Text>
                        <Text variant="body">{formData.condition || "-"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text variant="caption" className="text-zinc-600">Images:</Text>
                        <Text variant="body">{formData.images.length} uploaded</Text>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Creating...' : 'Generate QR & List Book'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
