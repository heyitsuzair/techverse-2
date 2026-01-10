"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Badge,
  LinkWithProgress
} from "@/components/ui";
import routes from "@/config/routes";
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
  Calendar
} from "lucide-react";

// Mock Data
const MOCK_OWNED_BOOKS = [
  { 
    id: 1, 
    title: "The Great Gatsby", 
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    condition: "Excellent",
    status: "Available",
    requests: 3,
    addedDate: "2025-12-01",
    location: "New York, NY"
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
    location: "New York, NY"
  },
];

const MOCK_LISTED_BOOKS = [
  { 
    id: 3, 
    title: "1984", 
    author: "George Orwell",
    genre: "Dystopian",
    condition: "Like New",
    status: "Pending",
    requestedBy: "John Doe",
    requestDate: "2026-01-08",
    location: "New York, NY"
  },
  { 
    id: 4, 
    title: "Pride and Prejudice", 
    author: "Jane Austen",
    genre: "Romance",
    condition: "Good",
    status: "In Transit",
    requestedBy: "Sarah Smith",
    requestDate: "2026-01-05",
    location: "New York, NY"
  },
];

const MOCK_EXCHANGED_BOOKS = [
  { 
    id: 5, 
    title: "The Hobbit", 
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    condition: "Excellent",
    status: "Exchanged",
    exchangedWith: "Mike Johnson",
    exchangeDate: "2025-12-20",
    points: 200
  },
  { 
    id: 6, 
    title: "Animal Farm", 
    author: "George Orwell",
    genre: "Political Fiction",
    condition: "Good",
    status: "Exchanged",
    exchangedWith: "Emily Brown",
    exchangeDate: "2025-12-10",
    points: 150
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Available":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "Pending":
    case "In Transit":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "Exchanged":
      return <Package className="w-4 h-4 text-blue-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-zinc-500" />;
  }
};

const getStatusVariant = (status) => {
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

export default function MyBooks() {
  const [activeTab, setActiveTab] = useState("owned");

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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1">Total Books</Text>
                  <Text variant="h2">{MOCK_OWNED_BOOKS.length + MOCK_LISTED_BOOKS.length}</Text>
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
                  <Text variant="caption" className="text-zinc-600 mb-1">Active Requests</Text>
                  <Text variant="h2">{MOCK_OWNED_BOOKS.reduce((sum, book) => sum + book.requests, 0)}</Text>
                </div>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1">Total Exchanges</Text>
                  <Text variant="h2">{MOCK_EXCHANGED_BOOKS.length}</Text>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-200">
          {[
            { id: "owned", label: "Available Books", count: MOCK_OWNED_BOOKS.length },
            { id: "listed", label: "Active Exchanges", count: MOCK_LISTED_BOOKS.length },
            { id: "exchanged", label: "Exchange History", count: MOCK_EXCHANGED_BOOKS.length },
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
              <Badge variant={activeTab === tab.id ? "primary" : "default"} className="text-xs">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Owned Books Tab */}
        {activeTab === "owned" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_OWNED_BOOKS.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant={getStatusVariant(book.status)}>
                      {getStatusIcon(book.status)}
                      <span className="ml-1">{book.status}</span>
                    </Badge>
                    {book.requests > 0 && (
                      <Badge variant="warning" className="text-xs">
                        {book.requests} requests
                      </Badge>
                    )}
                  </div>

                  <Text variant="h4" className="mb-1">{book.title}</Text>
                  <Text variant="body" className="text-zinc-600 mb-4">by {book.author}</Text>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Package className="w-4 h-4" />
                      <Text variant="caption">{book.genre} • {book.condition}</Text>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <MapPin className="w-4 h-4" />
                      <Text variant="caption">{book.location}</Text>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-600">
                      <Calendar className="w-4 h-4" />
                      <Text variant="caption">Added {book.addedDate}</Text>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
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
                  <Text variant="h4" className="mb-2">Add New Book</Text>
                  <Text variant="caption" className="text-zinc-600 text-center">
                    List another book from your collection
                  </Text>
                </CardContent>
              </Card>
            </LinkWithProgress>
          </div>
        )}

        {/* Listed Books Tab */}
        {activeTab === "listed" && (
          <div className="space-y-4">
            {MOCK_LISTED_BOOKS.map((book) => (
              <Card key={book.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-zinc-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Text variant="h4" className="mb-1">{book.title}</Text>
                          <Text variant="body" className="text-zinc-600">by {book.author}</Text>
                        </div>
                        <Badge variant={getStatusVariant(book.status)}>
                          {getStatusIcon(book.status)}
                          <span className="ml-1">{book.status}</span>
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Text variant="caption" className="text-zinc-500">Requested By</Text>
                          <Text variant="body">{book.requestedBy}</Text>
                        </div>
                        <div>
                          <Text variant="caption" className="text-zinc-500">Request Date</Text>
                          <Text variant="body">{book.requestDate}</Text>
                        </div>
                        <div>
                          <Text variant="caption" className="text-zinc-500">Condition</Text>
                          <Text variant="body">{book.condition}</Text>
                        </div>
                        <div>
                          <Text variant="caption" className="text-zinc-500">Location</Text>
                          <Text variant="body">{book.location}</Text>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm">
                          Track Exchange
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact User
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {MOCK_LISTED_BOOKS.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Clock className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                  <Text variant="h4" className="mb-2">No Active Exchanges</Text>
                  <Text variant="body" className="text-zinc-600">
                    Books with pending or in-transit exchanges will appear here
                  </Text>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Exchanged Books Tab */}
        {activeTab === "exchanged" && (
          <div className="space-y-4">
            {MOCK_EXCHANGED_BOOKS.map((book) => (
              <Card key={book.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-zinc-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Text variant="h4" className="mb-1">{book.title}</Text>
                          <Text variant="body" className="text-zinc-600">by {book.author}</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="success">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                          <Badge variant="primary">+{book.points} pts</Badge>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Text variant="caption" className="text-zinc-500">Exchanged With</Text>
                          <Text variant="body">{book.exchangedWith}</Text>
                        </div>
                        <div>
                          <Text variant="caption" className="text-zinc-500">Exchange Date</Text>
                          <Text variant="body">{book.exchangeDate}</Text>
                        </div>
                        <div>
                          <Text variant="caption" className="text-zinc-500">Condition</Text>
                          <Text variant="body">{book.condition}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
