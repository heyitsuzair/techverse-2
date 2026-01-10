"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui";

export default function ForumSearch({ value, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search discussions, books, or topics..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-3 w-full shadow-sm"
        />
      </div>
    </motion.div>
  );
}
