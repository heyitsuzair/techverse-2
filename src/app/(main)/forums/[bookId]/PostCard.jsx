"use client";

import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Clock, User, Pin } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";

export default function PostCard({ post, index, onViewPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.005 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all border-slate-200"
        onClick={onViewPost}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* User Avatar */}
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-md">
                {post.author.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Post Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">
                      {post.author}
                    </span>
                    {post.isVerified && (
                      <Badge variant="primary" size="sm">
                        ✓ Verified Reader
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{post.timeAgo}</span>
                    {post.chapter && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" size="sm">
                          {post.chapter}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                {post.isPinned && (
                  <Badge variant="warning" size="sm" className="shrink-0">
                    <Pin className="w-3 h-3 mr-1" />
                    Pinned
                  </Badge>
                )}
              </div>

              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-slate-700 line-clamp-3 mb-4">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 text-sm">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium">{post.replies}</span>
                  <span className="hidden sm:inline">replies</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-medium">{post.likes}</span>
                  <span className="hidden sm:inline">likes</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
