"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

const CHAPTERS = [
  { id: "all", name: "All Chapters", posts: 127 },
  { id: "1", name: "Chapter 1", posts: 23 },
  { id: "2", name: "Chapter 2", posts: 19 },
  { id: "3", name: "Chapter 3", posts: 15 },
  { id: "4", name: "Chapter 4", posts: 18 },
  { id: "5", name: "Chapter 5", posts: 12 },
  { id: "6", name: "Chapter 6", posts: 14 },
  { id: "7", name: "Chapter 7", posts: 16 },
  { id: "8", name: "Chapter 8", posts: 10 },
];

export default function ChapterNavigation({ activeChapter, onChapterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
    >
      {CHAPTERS.map((chapter, index) => (
        <motion.button
          key={chapter.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onChapterChange(chapter.id)}
          className={`shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            activeChapter === chapter.id
              ? "bg-primary text-white shadow-md"
              : "bg-white border border-slate-200 text-slate-700 hover:border-primary hover:text-primary"
          }`}
        >
          {chapter.name}
          <Badge
            variant={activeChapter === chapter.id ? "default" : "secondary"}
            size="sm"
            className={activeChapter === chapter.id ? "bg-white/20" : ""}
          >
            {chapter.posts}
          </Badge>
        </motion.button>
      ))}
    </motion.div>
  );
}
