"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input, Select } from "@/components/ui";

const GENRES = [
  "All",
  "Classic Fiction",
  "Dystopian",
  "Romance",
  "Fantasy",
  "Science Fiction",
  "Mystery",
];
const CONDITIONS = ["All", "Excellent", "Good", "Fair"];
const LOCATIONS = [
  "All",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Seattle, WA",
];

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  selectedCondition,
  setSelectedCondition,
  selectedLocation,
  setSelectedLocation,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-slate-900">
          Search & Filters
        </h3>
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 text-base h-12 border-slate-300 focus:border-primary"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Select
            label="Genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border-slate-300 focus:border-primary"
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Select>

          <Select
            label="Condition"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="border-slate-300 focus:border-primary"
          >
            {CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </Select>

          <Select
            label="Location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border-slate-300 focus:border-primary"
          >
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
