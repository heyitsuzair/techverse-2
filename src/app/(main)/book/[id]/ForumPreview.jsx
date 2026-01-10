"use client";

import { motion } from "framer-motion";
import { MessageSquare, User, Hash } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@/components/ui";

export default function ForumPreview({
  forumPosts = 0,
  preview = [],
  onJoinForum,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-slate-100">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MessageSquare className="w-5 h-5 text-primary" />
              Community Discussions
            </CardTitle>
            <Badge variant="primary" className="font-semibold">
              {forumPosts} Posts
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {preview.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {post.user.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm text-slate-900">
                    {post.user}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <Badge variant="secondary" size="sm" className="text-xs">
                    <Hash className="w-3 h-3 mr-1" />
                    {post.chapter}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pl-10">
                  {post.excerpt}
                </p>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={onJoinForum}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Join Discussion Forum
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
