"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import TimelineEntry from "./TimelineEntry";
import JourneyStats from "./JourneyStats";

const MOCK_BOOK_DATA = {
  1: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    currentLocation: "New York, NY",
  },
};

const MOCK_JOURNEY_DATA = {
  timeline: [
    {
      id: 1,
      readerName: "Emma Wilson",
      location: "New York, NY",
      date: "January 15, 2026",
      rating: 5,
      review:
        "A masterpiece! The symbolism and themes are timeless. I couldn't put it down.",
      photoUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      isVerified: true,
      currentReader: true,
      daysWithBook: 12,
      tags: ["Jazz Age", "American Dream", "Symbolism"],
      distanceFromPrevious: 0,
    },
    {
      id: 2,
      readerName: "Michael Chen",
      location: "Brooklyn, NY",
      date: "December 28, 2025",
      rating: 4,
      review:
        "Fitzgerald's prose is beautiful. The green light symbolism hit differently this time.",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      isVerified: true,
      currentReader: false,
      daysWithBook: 18,
      tags: ["Classic Literature", "Romance"],
      distanceFromPrevious: 5.2,
    },
    {
      id: 3,
      readerName: "Sarah Thompson",
      location: "Philadelphia, PA",
      date: "November 22, 2025",
      rating: 5,
      review:
        "Every re-read reveals new layers. The parties, the loneliness, the tragedy.",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      isVerified: false,
      currentReader: false,
      daysWithBook: 14,
      tags: ["Tragedy", "Social Commentary"],
      distanceFromPrevious: 95.3,
    },
    {
      id: 4,
      readerName: "James Rodriguez",
      location: "Boston, MA",
      date: "October 10, 2025",
      rating: 4,
      review:
        "Great classic. Nick's perspective makes the story compelling and relatable.",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      isVerified: true,
      currentReader: false,
      daysWithBook: 21,
      tags: ["Narration", "Character Study"],
      distanceFromPrevious: 304.5,
    },
    {
      id: 5,
      readerName: "Olivia Martinez",
      location: "Washington, DC",
      date: "September 5, 2025",
      rating: 5,
      review: "The ending still gives me chills. A perfect American novel.",
      photoUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      isVerified: false,
      currentReader: false,
      daysWithBook: 16,
      tags: ["Ending", "Literature"],
      distanceFromPrevious: 441.2,
    },
  ],
  totalReaders: 5,
  totalDistance: 846.2, // miles
  averageRating: 4.6,
  averageDaysPerReader: 16.2,
};

export default function QRScanClient({ params }) {
  const router = useRouterWithProgress();
  const bookId = params?.bookId || 1;
  const book = MOCK_BOOK_DATA[bookId] || MOCK_BOOK_DATA[1];
  const journey = MOCK_JOURNEY_DATA;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push(routes.home)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                BooksExchange
              </h1>
            </motion.button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(routes.marketplace)}
                className="hidden sm:inline-flex"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Marketplace
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(routes.auth.signin)}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => router.push(routes.auth.signup)}
                className="shadow-md"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Book Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Card className="border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <Badge variant="primary" size="lg" className="mb-3">
                    📍 Reading Journey
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4">
                    by {book.author}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>
                        Current: <strong>{book.currentLocation}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        <strong>{journey.totalReaders}</strong> readers
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>
                        <strong>{journey.totalDistance}</strong> miles traveled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Journey Stats Charts */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            Journey Statistics
          </motion.h2>
          <JourneyStats stats={journey} />
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <Card className="border-slate-200 shadow-md">
            <CardContent className="p-5 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">
                {journey.totalReaders}
              </p>
              <p className="text-xs text-slate-600">Total Readers</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-md">
            <CardContent className="p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">
                {journey.totalDistance}
              </p>
              <p className="text-xs text-slate-600">Miles Traveled</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-md">
            <CardContent className="p-5 text-center">
              <span className="text-3xl mb-2 block">⭐</span>
              <p className="text-2xl font-bold text-slate-900">
                {journey.averageRating}
              </p>
              <p className="text-xs text-slate-600">Avg Rating</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-md">
            <CardContent className="p-5 text-center">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">
                {journey.averageDaysPerReader}
              </p>
              <p className="text-xs text-slate-600">Avg Days/Reader</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            Reading Timeline
          </motion.h2>

          <div className="space-y-0">
            {journey.timeline.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                index={index}
                isLast={index === journey.timeline.length - 1}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-primary/30 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Want to add your story?
              </h3>
              <p className="text-slate-600 mb-6">
                Login to scan QR codes, track your reading journey, and connect
                with other readers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push(routes.auth.signin)}
                >
                  Login to Continue
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push(routes.auth.signup)}
                >
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
