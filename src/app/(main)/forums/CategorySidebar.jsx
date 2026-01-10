"use client";

import { motion } from "framer-motion";
import { Hash, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui";

const CATEGORIES = [
  { id: "all", name: "All Discussions", count: 248, icon: "💬" },
  { id: "classics", name: "Classic Literature", count: 87, icon: "📚" },
  { id: "fiction", name: "Modern Fiction", count: 95, icon: "✨" },
  { id: "non-fiction", name: "Non-Fiction", count: 42, icon: "📖" },
  { id: "sci-fi", name: "Sci-Fi & Fantasy", count: 58, icon: "🚀" },
  { id: "mystery", name: "Mystery & Thriller", count: 34, icon: "🔍" },
  {
    id: "trending",
    name: "Trending Now",
    count: 24,
    icon: "🔥",
    trending: true,
  },
];

export default function CategorySidebar({ activeCategory, onCategoryChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-2"
    >
      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider px-3 mb-4">
        Categories
      </h3>
      {CATEGORIES.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onCategoryChange(category.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
            activeCategory === category.id
              ? "bg-primary/10 text-primary font-semibold shadow-sm"
              : "hover:bg-slate-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {category.trending && (
              <TrendingUp className="w-4 h-4 text-orange-500" />
            )}
            <Badge
              variant={activeCategory === category.id ? "primary" : "default"}
              size="sm"
            >
              {category.count}
            </Badge>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
