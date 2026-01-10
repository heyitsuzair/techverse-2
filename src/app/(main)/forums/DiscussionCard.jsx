"use client";

import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Clock, User, ArrowRight } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { useRouterWithProgress } from "@/hooks";
import routes from "@/config/routes";

export default function DiscussionCard({ discussion, index }) {
  const router = useRouterWithProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all border-slate-200"
        onClick={() => router.push(routes.forums.book(discussion.bookId))}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Book Cover Thumbnail */}
            <div className="shrink-0">
              <img
                src={discussion.bookImage}
                alt={discussion.bookTitle}
                className="w-16 h-20 object-cover rounded-md shadow-sm"
              />
            </div>

            {/* Discussion Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
                    {discussion.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    📚 {discussion.bookTitle}
                  </p>
                </div>
                {discussion.isPinned && (
                  <Badge variant="warning" size="sm" className="shrink-0">
                    📌 Pinned
                  </Badge>
                )}
              </div>

              <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                {discussion.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {discussion.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="font-medium text-slate-700">
                    {discussion.author}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{discussion.timeAgo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="font-medium text-slate-700">
                    {discussion.replies}
                  </span>
                  <span>replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span className="font-medium text-slate-700">
                    {discussion.likes}
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-2" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
