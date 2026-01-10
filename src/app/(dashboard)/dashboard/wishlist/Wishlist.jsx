"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent,
  Button,
  Text,
  Badge
} from "@/components/ui";
import { 
  Heart,
  BookOpen,
  Bell,
  BellOff,
  Trash2,
  MessageCircle,
  MapPin,
  CheckCircle2
} from "lucide-react";

// Mock Data
const MOCK_WISHLIST = [
  { 
    id: 1, 
    title: "The Lord of the Rings", 
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    alertsEnabled: true,
    available: false,
    waitlistCount: 5,
    estimatedAvailability: "2-3 weeks"
  },
  { 
    id: 2, 
    title: "Harry Potter and the Sorcerer's Stone", 
    author: "J.K. Rowling",
    genre: "Fantasy",
    alertsEnabled: true,
    available: true,
    location: "Brooklyn, NY",
    points: 180,
    owner: "Mike Johnson"
  },
  { 
    id: 3, 
    title: "The Alchemist", 
    author: "Paulo Coelho",
    genre: "Fiction",
    alertsEnabled: false,
    available: false,
    waitlistCount: 12,
    estimatedAvailability: "4-6 weeks"
  },
  { 
    id: 4, 
    title: "Educated", 
    author: "Tara Westover",
    genre: "Biography",
    alertsEnabled: true,
    available: true,
    location: "Manhattan, NY",
    points: 200,
    owner: "Sarah White"
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

  const toggleAlert = (id) => {
    setWishlist(wishlist.map(book => 
      book.id === id ? { ...book, alertsEnabled: !book.alertsEnabled } : book
    ));
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(book => book.id !== id));
  };

  const availableBooks = wishlist.filter(book => book.available);
  const unavailableBooks = wishlist.filter(book => !book.available);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            My Wishlist
          </Text>
          <Text variant="body" className="text-zinc-600">
            Books you're interested in and availability alerts
          </Text>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1">Total Wishlist</Text>
                  <Text variant="h2">{wishlist.length}</Text>
                </div>
                <Heart className="w-10 h-10 text-red-500 fill-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1">Available Now</Text>
                  <Text variant="h2" className="text-green-600">{availableBooks.length}</Text>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1">Alerts Active</Text>
                  <Text variant="h2" className="text-primary">
                    {wishlist.filter(b => b.alertsEnabled).length}
                  </Text>
                </div>
                <Bell className="w-10 h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Books */}
        {availableBooks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <Text variant="h3" className="text-green-600">Available Now ({availableBooks.length})</Text>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {availableBooks.map((book) => (
                <Card key={book.id} className="border-2 border-green-500">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-linear-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Text variant="h4" className="mb-1">{book.title}</Text>
                            <Text variant="body" className="text-zinc-600 text-sm">by {book.author}</Text>
                          </div>
                          <Badge variant="success">Available</Badge>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-xs">{book.genre}</Badge>
                            <Text variant="body" className="text-amber-600 font-semibold">{book.points} pts</Text>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-600">
                            <MapPin className="w-4 h-4" />
                            <Text variant="caption">{book.location}</Text>
                          </div>
                          <Text variant="caption" className="text-zinc-600">Owner: {book.owner}</Text>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="primary" size="sm" className="flex-1">
                            Request Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeFromWishlist(book.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Unavailable Books */}
        {unavailableBooks.length > 0 && (
          <div>
            <Text variant="h3" className="mb-4">Waiting for Availability ({unavailableBooks.length})</Text>
            <div className="space-y-4">
              {unavailableBooks.map((book) => (
                <Card key={book.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-16 h-20 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Text variant="h4" className="mb-1">{book.title}</Text>
                            <Text variant="body" className="text-zinc-600 text-sm">by {book.author}</Text>
                          </div>
                          <Badge variant="default">Unavailable</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="default" className="text-xs">{book.genre}</Badge>
                          <Text variant="caption" className="text-zinc-600">
                            {book.waitlistCount} people waiting
                          </Text>
                          <Text variant="caption" className="text-zinc-600">
                            Est: {book.estimatedAvailability}
                          </Text>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => toggleAlert(book.id)}
                              variant="ghost"
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                                book.alertsEnabled 
                                  ? "bg-primary/10 text-primary" 
                                  : "bg-zinc-100 text-zinc-600"
                              }`}
                            >
                              {book.alertsEnabled ? (
                                <>
                                  <Bell className="w-4 h-4" />
                                  <Text variant="caption">Alerts On</Text>
                                </>
                              ) : (
                                <>
                                  <BellOff className="w-4 h-4" />
                                  <Text variant="caption">Alerts Off</Text>
                                </>
                              )}
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFromWishlist(book.id)}>
                            <Trash2 className="w-4 h-4 mr-1 text-red-500" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {wishlist.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <Text variant="h3" className="mb-2">Your wishlist is empty</Text>
              <Text variant="body" className="text-zinc-600 mb-4">
                Start adding books you're interested in to your wishlist
              </Text>
              <Button variant="primary">
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
