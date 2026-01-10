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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-red-500" />
            My Wishlist
          </Text>
          <Text variant="body" className="text-zinc-600 text-sm sm:text-base">
            Books you're interested in and availability alerts
          </Text>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1 text-xs sm:text-sm">Total Wishlist</Text>
                  <Text variant="h2" className="text-2xl sm:text-3xl lg:text-4xl">{wishlist.length}</Text>
                </div>
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 fill-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1 text-xs sm:text-sm">Available Now</Text>
                  <Text variant="h2" className="text-green-600 text-2xl sm:text-3xl lg:text-4xl">{availableBooks.length}</Text>
                </div>
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="caption" className="text-zinc-600 mb-1 text-xs sm:text-sm">Alerts Active</Text>
                  <Text variant="h2" className="text-primary text-2xl sm:text-3xl lg:text-4xl">
                    {wishlist.filter(b => b.alertsEnabled).length}
                  </Text>
                </div>
                <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Books */}
        {availableBooks.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <Text variant="h3" className="text-green-600 text-base sm:text-lg lg:text-xl">Available Now ({availableBooks.length})</Text>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {availableBooks.map((book) => (
                <Card key={book.id} className="border-2 border-green-500">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-14 h-18 sm:w-16 sm:h-20 bg-linear-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-0 mb-2">
                          <div className="min-w-0">
                            <Text variant="h4" className="mb-1 text-sm sm:text-base truncate">{book.title}</Text>
                            <Text variant="body" className="text-zinc-600 text-xs sm:text-sm truncate">by {book.author}</Text>
                          </div>
                          <Badge variant="success" className="text-xs self-start">Available</Badge>
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="text-xs">{book.genre}</Badge>
                            <Text variant="body" className="text-amber-600 font-semibold text-xs sm:text-sm">{book.points} pts</Text>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-600">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <Text variant="caption" className="text-xs sm:text-sm truncate">{book.location}</Text>
                          </div>
                          <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm truncate">Owner: {book.owner}</Text>
                        </div>

                        <div className="flex gap-1.5 sm:gap-2">
                          <Button variant="primary" size="sm" className="flex-1 text-xs sm:text-sm">
                            Request Now
                          </Button>
                          <Button variant="outline" size="sm" className="px-2">
                            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeFromWishlist(book.id)} className="px-2">
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
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
            <Text variant="h3" className="mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl">Waiting for Availability ({unavailableBooks.length})</Text>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {unavailableBooks.map((book) => (
                <Card key={book.id}>
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-14 h-18 sm:w-16 sm:h-20 bg-zinc-200 rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-0 mb-2">
                          <div className="min-w-0">
                            <Text variant="h4" className="mb-1 text-sm sm:text-base truncate">{book.title}</Text>
                            <Text variant="body" className="text-zinc-600 text-xs sm:text-sm truncate">by {book.author}</Text>
                          </div>
                          <Badge variant="default" className="text-xs self-start">Unavailable</Badge>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                          <Badge variant="default" className="text-xs self-start">{book.genre}</Badge>
                          <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm">
                            {book.waitlistCount} people waiting
                          </Text>
                          <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm">
                            Est: {book.estimatedAvailability}
                          </Text>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <Button
                            onClick={() => toggleAlert(book.id)}
                            variant="ghost"
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${
                              book.alertsEnabled 
                                ? "bg-primary/10 text-primary" 
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {book.alertsEnabled ? (
                              <>
                                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <Text variant="caption" className="text-xs sm:text-sm">Alerts On</Text>
                              </>
                            ) : (
                              <>
                                <BellOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <Text variant="caption" className="text-xs sm:text-sm">Alerts Off</Text>
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFromWishlist(book.id)} 
                            className="text-xs sm:text-sm border-2 border-red-200 hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
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
