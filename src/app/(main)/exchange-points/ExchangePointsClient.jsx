"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Map, List, Search, Filter } from "lucide-react";
import { Button, Input } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import MapView from "./MapView";
import StallCard from "./StallCard";
import LoginModal from "../marketplace/LoginModal";

const MOCK_EXCHANGE_POINTS = [
  {
    id: 1,
    name: "Central Library Book Exchange",
    address: "123 Main Street, New York, NY 10001",
    rating: 4.8,
    reviews: 145,
    hours: "9 AM - 6 PM",
    distance: 0.5,
    isOpen: true,
    phone: "(555) 123-4567",
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400",
    tags: ["Library", "Indoor", "WiFi"],
    books: 450,
  },
  {
    id: 2,
    name: "Washington Park Stall",
    address: "456 Park Avenue, New York, NY 10002",
    rating: 4.5,
    reviews: 89,
    hours: "10 AM - 5 PM",
    distance: 1.2,
    isOpen: true,
    phone: "(555) 234-5678",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    tags: ["Outdoor", "Park", "Weekend"],
    books: 280,
  },
  {
    id: 3,
    name: "Brooklyn Community Center",
    address: "789 Brooklyn Street, Brooklyn, NY 11201",
    rating: 4.7,
    reviews: 112,
    hours: "11 AM - 7 PM",
    distance: 2.3,
    isOpen: false,
    phone: "(555) 345-6789",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
    tags: ["Community", "Indoor", "Events"],
    books: 520,
  },
  {
    id: 4,
    name: "Queens Village Exchange",
    address: "321 Queens Boulevard, Queens, NY 11375",
    rating: 4.6,
    reviews: 78,
    hours: "8 AM - 8 PM",
    distance: 3.1,
    isOpen: true,
    phone: "(555) 456-7890",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    tags: ["Village", "Morning", "Coffee"],
    books: 340,
  },
  {
    id: 5,
    name: "Manhattan Book Hub",
    address: "567 Manhattan Ave, Manhattan, NY 10025",
    rating: 4.9,
    reviews: 203,
    hours: "9 AM - 9 PM",
    distance: 1.8,
    isOpen: true,
    phone: "(555) 567-8901",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    tags: ["Popular", "Large", "Cafe"],
    books: 680,
  },
  {
    id: 6,
    name: "Staten Island Reader's Corner",
    address: "890 Staten Island Way, Staten Island, NY 10301",
    rating: 4.4,
    reviews: 56,
    hours: "10 AM - 4 PM",
    distance: 5.7,
    isOpen: false,
    phone: "(555) 678-9012",
    imageUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400",
    tags: ["Cozy", "Small", "Friendly"],
    books: 180,
  },
];

export default function ExchangePointsClient() {
  const router = useRouterWithProgress();
  const [viewMode, setViewMode] = useState("map"); // map or list
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState("all"); // all, open, closed

  // Filter stalls
  const filteredStalls = MOCK_EXCHANGE_POINTS.filter((stall) => {
    const matchesSearch =
      stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stall.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterOpen === "all" ||
      (filterOpen === "open" && stall.isOpen) ||
      (filterOpen === "closed" && !stall.isOpen);

    return matchesSearch && matchesFilter;
  });

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Exchange Points
              </h1>
              <p className="text-slate-600">
                Find nearby locations to exchange books in person
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  viewMode === "map"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  viewMode === "list"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 shadow-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <div className="flex gap-2">
                {["all", "open", "closed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterOpen(filter)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filterOpen === filter
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-primary"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <MapView
                stalls={filteredStalls}
                selectedStall={selectedStall}
                onSelectStall={(stall) => setSelectedStall(stall)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredStalls.length > 0 ? (
                filteredStalls.map((stall, index) => (
                  <StallCard
                    key={stall.id}
                    stall={stall}
                    index={index}
                    onSelectStall={() => setShowLoginModal(true)}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <Map className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    No exchange points found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => router.push(routes.auth.signin)}
        onSignup={() => router.push(routes.auth.signup)}
      />
    </div>
  );
}
