"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Clock, Navigation } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";

export default function StallCard({ stall, index, onSelectStall }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all border-slate-200"
        onClick={onSelectStall}
      >
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-3 sm:gap-4">
            {/* Image */}
            <div className="shrink-0">
              <img
                src={stall.imageUrl}
                alt={stall.name}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-900 line-clamp-1">
                  {stall.name}
                </h3>
                {stall.isOpen && (
                  <Badge variant="success" size="sm" className="shrink-0">
                    Open
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-slate-900">
                  {stall.rating}
                </span>
                <span className="text-sm text-slate-500">
                  ({stall.reviews} reviews)
                </span>
              </div>

              <div className="flex items-start gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 line-clamp-2">
                  {stall.address}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{stall.hours}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  <span>{stall.distance} mi away</span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {stall.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
