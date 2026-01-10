"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Star, User } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";

export default function TimelineEntry({ entry, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-slate-200" />
      )}

      {/* Timeline Dot */}
      <div className="relative shrink-0 z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
          {index + 1}
        </div>
        {/* Pulse Effect */}
        {index === 0 && (
          <span className="absolute inset-0 w-12 h-12 rounded-full bg-primary opacity-50 animate-ping" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <Card className="border-slate-200 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Reader Photo */}
              {entry.photoUrl && (
                <div className="shrink-0">
                  <img
                    src={entry.photoUrl}
                    alt={entry.readerName}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-slate-900">
                        {entry.readerName}
                      </h3>
                      {entry.isVerified && (
                        <Badge variant="primary" size="sm">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < entry.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-slate-600 ml-1">
                        ({entry.rating}/5)
                      </span>
                    </div>
                  </div>
                  {entry.currentReader && (
                    <Badge variant="success" size="sm">
                      Current Reader
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-slate-700 mb-3 italic">
                  "{entry.review}"
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{entry.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{entry.date}</span>
                  </div>
                  {entry.daysWithBook && (
                    <div>
                      <Badge variant="secondary" size="sm">
                        {entry.daysWithBook} days
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
