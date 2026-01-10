"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  List,
  Search,
  Filter,
  MapPin as MapPinIcon,
  Loader2,
} from "lucide-react";
import { Button, Input } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import Navigation from "@/app/Navigation";
import Footer from "@/app/Footer";
import MapView from "./MapView";
import StallCard from "./StallCard";
import LoginModal from "../marketplace/LoginModal";

export default function ExchangePointsClient() {
  const router = useRouterWithProgress();
  const [viewMode, setViewMode] = useState("map"); // map or list
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStall, setSelectedStall] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState("all"); // all, open, closed

  // New states for API integration
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(10); // Default 10km radius

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to New York City if location access denied
          setUserLocation({
            lat: 40.7128,
            lng: -74.006,
          });
        }
      );
    } else {
      // Geolocation not supported - use default location
      setUserLocation({
        lat: 40.7128,
        lng: -74.006,
      });
    }
  }, []);

  // Fetch stalls when user location is available
  useEffect(() => {
    if (userLocation) {
      fetchStalls();
    }
  }, [userLocation, radius]);

  const fetchStalls = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        lat: userLocation.lat.toString(),
        lng: userLocation.lng.toString(),
        radius: radius.toString(),
        isActive: "true",
      });

      const response = await fetch(`/api/stalls?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stalls");
      }

      setStalls(data.stalls || []);
    } catch (err) {
      console.error("Error fetching stalls:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter stalls
  const filteredStalls = stalls.filter((stall) => {
    const matchesSearch =
      stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stall.locationAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterOpen === "all" ||
      (filterOpen === "open" && stall.isActive) ||
      (filterOpen === "closed" && !stall.isActive);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-background">
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
                  {userLocation
                    ? `Found ${filteredStalls.length} exchange points within ${radius}km`
                    : "Finding nearby locations to exchange books in person..."}
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all cursor-pointer ${
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all cursor-pointer ${
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

              {/* Radius Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:border-primary transition-all cursor-pointer"
                >
                  <option value={5}>Within 5km</option>
                  <option value={10}>Within 10km</option>
                  <option value={20}>Within 20km</option>
                  <option value={50}>Within 50km</option>
                </select>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <div className="flex gap-2">
                  {["all", "open", "closed"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterOpen(filter)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading exchange points...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 sm:py-16">
              <MapPinIcon className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Failed to Load Exchange Points
              </h3>
              <p className="text-slate-500 mb-4">{error}</p>
              <Button onClick={fetchStalls} variant="primary">
                Try Again
              </Button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
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
                    userLocation={userLocation}
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
                        onSelectStall={() => setSelectedStall(stall)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <MapPinIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">
                        No exchange points found
                      </h3>
                      <p className="text-slate-500">
                        Try adjusting your search radius or filters
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Login Modal */}
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={() => router.push(routes.auth.signin)}
            onSignup={() => router.push(routes.auth.signup)}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
