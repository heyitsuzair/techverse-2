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
import { 
  BookOpen,
  Upload,
  MapPin,
  QrCode,
  CheckCircle2,
  Image as ImageIcon,
  X
} from "lucide-react";

// Mock Data
const BOOK_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Children's Books",
  "Poetry",
  "Thriller"
];

const BOOK_CONDITIONS = [
  { value: "new", label: "Like New", description: "Perfect condition, no wear" },
  { value: "excellent", label: "Excellent", description: "Minor signs of use" },
  { value: "good", label: "Good", description: "Used but well maintained" },
  { value: "fair", label: "Fair", description: "Visible wear but fully readable" },
  { value: "poor", label: "Poor", description: "Significant wear, pages intact" }
];

export default function AddBook() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    condition: "",
    description: "",
    location: "",
    images: []
  });
  const [generatedQR, setGeneratedQR] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (e) => {
    // Mock image upload
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, images: [...formData.images, ...files.map(f => f.name)] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneratedQR(true);
  };

  if (generatedQR) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
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
                <QrCode className="w-32 h-32 mx-auto text-zinc-400" />
                <Text variant="caption" className="text-zinc-600 mt-4">
                  QR Code Generated
                </Text>
              </div>

              <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
                <Text variant="caption" className="text-zinc-600 mb-2">Book Details</Text>
                <Text variant="h4" className="mb-1">{formData.title}</Text>
                <Text variant="body" className="text-zinc-600">by {formData.author}</Text>
                <div className="flex gap-2 mt-3">
                  <Badge variant="primary">{formData.genre}</Badge>
                  <Badge variant="success">{formData.condition}</Badge>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => {
                  setGeneratedQR(false);
                  setFormData({
                    title: "",
                    author: "",
                    isbn: "",
                    genre: "",
                    condition: "",
                    description: "",
                    location: "",
                    images: []
                  });
                }}>
                  Add Another Book
                </Button>
                <Button variant="primary" className="flex-1">
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
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Add a New Book
          </Text>
          <Text variant="body" className="text-zinc-600">
            Fill in the details below to list your book on the marketplace
          </Text>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: "Book Details" },
            { num: 2, label: "Upload Images" },
            { num: 3, label: "Location" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num ? "bg-blue-600 text-white" : "bg-zinc-200 text-zinc-600"
                }`}>
                  {s.num}
                </div>
                <Text variant="caption" className={step >= s.num ? "text-blue-600 font-semibold" : "text-zinc-600"}>
                  {s.label}
                </Text>
              </div>
              {idx < 2 && <div className={`w-12 h-0.5 ${step > s.num ? "bg-blue-600" : "bg-zinc-200"}`} />}
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
                        required
                      >
                        <option value="">Select genre</option>
                        {BOOK_GENRES.map((genre) => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Book Condition *</Text>
                    <div className="grid md:grid-cols-2 gap-3">
                      {BOOK_CONDITIONS.map((condition) => (
                        <label
                          key={condition.value}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            formData.condition === condition.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <Radio
                            name="condition"
                            value={condition.value}
                            checked={formData.condition === condition.value}
                            onChange={(e) => handleChange("condition", e.target.value)}
                            className="mr-3"
                            required
                          />
                          <span className="font-semibold">{condition.label}</span>
                          <Text variant="caption" className="block text-zinc-600 mt-1 ml-6">
                            {condition.description}
                          </Text>
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
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" as="span">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Select Images
                        </Button>
                      </label>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <Text variant="caption" className="mb-3">Uploaded Images ({formData.images.length})</Text>
                      <div className="grid grid-cols-3 gap-4">
                        {formData.images.map((image, idx) => (
                          <div key={idx} className="relative aspect-square bg-zinc-100 rounded-lg flex items-center justify-center group">
                            <ImageIcon className="w-8 h-8 text-zinc-400" />
                            <Button
                              type="button"
                              onClick={() => removeImage(idx)}
                              variant="ghost"
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Text variant="caption" className="absolute bottom-2 left-2 right-2 text-xs truncate">
                              {image}
                            </Text>
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
                    <Input
                      placeholder="Enter city or location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      required
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
                    <Button type="submit" variant="primary">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR & List Book
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
