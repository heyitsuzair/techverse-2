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
  Badge
} from "@/components/ui";
import { 
  QrCode,
  MapPin,
  Clock,
  BookOpen,
  Plus,
  Calendar,
  Edit2,
  CheckCircle2
} from "lucide-react";

// Mock Data
const MOCK_BOOK_HISTORY = {
  book: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    qrCode: "BK-2024-001234"
  },
  readingLog: [
    {
      id: 1,
      city: "New York, NY",
      reader: "You",
      startDate: "2026-01-01",
      endDate: "2026-01-08",
      duration: "7 days",
      notes: "Absolutely loved the vivid descriptions of the 1920s. The symbolism is incredible!"
    },
    {
      id: 2,
      city: "Boston, MA",
      reader: "John Anderson",
      startDate: "2025-12-15",
      endDate: "2025-12-31",
      duration: "16 days",
      notes: "A timeless classic. The ending still gives me chills."
    },
    {
      id: 3,
      city: "Philadelphia, PA",
      reader: "Sarah Mitchell",
      startDate: "2025-11-28",
      endDate: "2025-12-10",
      duration: "12 days",
      notes: "Reading this for the third time. Each time I discover something new."
    }
  ]
};

export default function QRBookHistory() {
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    city: "",
    startDate: "",
    endDate: "",
    duration: 0,
    notes: ""
  });

  const handleAddEntry = (e) => {
    e.preventDefault();
    // Add entry logic here
    setIsAddingEntry(false);
    setNewEntry({ city: "", startDate: "", endDate: "", duration: 0, notes: "" });
  };

  const calculateDuration = () => {
    if (newEntry.startDate && newEntry.endDate) {
      const start = new Date(newEntry.startDate);
      const end = new Date(newEntry.endDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNewEntry({ ...newEntry, duration: diff });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <QrCode className="w-8 h-8" />
            Book Journey History
          </Text>
          <Text variant="body" className="text-zinc-600">
            Track where this book has traveled and add your reading experience
          </Text>
        </div>

        {/* Book Info Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-24 h-32 bg-linear-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1">
                <Text variant="h2" className="mb-1">{MOCK_BOOK_HISTORY.book.title}</Text>
                <Text variant="body" className="text-zinc-600 mb-4">
                  by {MOCK_BOOK_HISTORY.book.author}
                </Text>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-zinc-500" />
                    <Text variant="caption" className="text-zinc-600">
                      QR: {MOCK_BOOK_HISTORY.book.qrCode}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <Text variant="caption" className="text-zinc-600">
                      {MOCK_BOOK_HISTORY.readingLog.length} cities visited
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <Text variant="caption" className="text-zinc-600">
                      Total: {MOCK_BOOK_HISTORY.readingLog.reduce((sum, log) => {
                        return sum + parseInt(log.duration);
                      }, 0)} days read
                    </Text>
                  </div>
                </div>
              </div>
              {!isAddingEntry && (
                <Button variant="primary" onClick={() => setIsAddingEntry(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Entry
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add New Entry Form */}
        {isAddingEntry && (
          <Card className="mb-6 border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Add Your Reading Entry
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsAddingEntry(false)}>
                  Cancel
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEntry} className="space-y-4">
                <div>
                  <Text variant="caption" className="mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City *
                  </Text>
                  <Input
                    placeholder="Enter the city where you read this book"
                    value={newEntry.city}
                    onChange={(e) => setNewEntry({ ...newEntry, city: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Text variant="caption" className="mb-2">Start Date *</Text>
                    <Input
                      type="date"
                      value={newEntry.startDate}
                      onChange={(e) => {
                        setNewEntry({ ...newEntry, startDate: e.target.value });
                        setTimeout(calculateDuration, 100);
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Text variant="caption" className="mb-2">End Date *</Text>
                    <Input
                      type="date"
                      value={newEntry.endDate}
                      onChange={(e) => {
                        setNewEntry({ ...newEntry, endDate: e.target.value });
                        setTimeout(calculateDuration, 100);
                      }}
                      required
                    />
                  </div>
                </div>

                {newEntry.duration > 0 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                    <Text variant="body" className="text-primary">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Reading Duration: <span className="font-semibold">{newEntry.duration} days</span>
                    </Text>
                  </div>
                )}

                <div>
                  <Text variant="caption" className="mb-2">Your Notes & Tips</Text>
                  <Textarea
                    placeholder="Share your thoughts, favorite quotes, or tips for the next reader..."
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    rows={4}
                  />
                  <Text variant="caption" className="text-zinc-600 mt-1">
                    Help the next reader by sharing what you loved or found interesting
                  </Text>
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Add Reading Entry
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reading History Timeline */}
        <div>
          <Text variant="h3" className="mb-4">Reading Journey</Text>
          <div className="space-y-4">
            {MOCK_BOOK_HISTORY.readingLog.map((log, index) => (
              <Card key={log.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Timeline Marker */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-primary/10" : "bg-zinc-100"
                      }`}>
                        <MapPin className={`w-5 h-5 ${index === 0 ? "text-primary" : "text-zinc-500"}`} />
                      </div>
                      {index < MOCK_BOOK_HISTORY.readingLog.length - 1 && (
                        <div className="w-0.5 h-full min-h-[60px] bg-zinc-200 mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Text variant="h4" className="mb-1 flex items-center gap-2">
                            {log.city}
                            {index === 0 && <Badge variant="primary">Current</Badge>}
                          </Text>
                          <Text variant="caption" className="text-zinc-600">
                            Read by {log.reader}
                          </Text>
                        </div>
                        <Text variant="caption" className="text-zinc-600">
                          {log.duration}
                        </Text>
                      </div>

                      <div className="flex items-center gap-4 mb-3 text-sm text-zinc-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <Text variant="caption">{log.startDate}</Text>
                        </div>
                        <Text variant="caption">→</Text>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <Text variant="caption">{log.endDate}</Text>
                        </div>
                      </div>

                      {log.notes && (
                        <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-200">
                          <Text variant="body" className="text-sm italic text-zinc-700">
                            "{log.notes}"
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Book Journey Map (Placeholder) */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Journey Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-zinc-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
                <Text variant="body" className="text-zinc-600">
                  Interactive map showing all cities this book has visited
                </Text>
                <Text variant="caption" className="text-zinc-500">
                  Coming soon
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
