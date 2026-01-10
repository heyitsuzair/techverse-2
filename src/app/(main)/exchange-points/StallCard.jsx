"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Phone, Mail } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";

export default function StallCard({ stall, index, onSelectStall }) {
  const handleCall = (e) => {
    e.stopPropagation();
    if (stall.contactPhone) {
      window.location.href = `tel:${stall.contactPhone}`;
    }
  };

  const handleEmail = (e) => {
    e.stopPropagation();
    if (stall.contactEmail) {
      window.location.href = `mailto:${stall.contactEmail}`;
    }
  };

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
              {stall.photos && stall.photos.length > 0 ? (
                <img
                  src={stall.photos[0]}
                  alt={stall.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-slate-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-900 line-clamp-1">
                  {stall.name}
                </h3>
                {stall.isActive && (
                  <Badge variant="success" size="sm" className="shrink-0">
                    Open
                  </Badge>
                )}
              </div>

              {stall.description && (
                <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                  {stall.description}
                </p>
              )}

              <div className="flex items-start gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 line-clamp-2">
                  {stall.locationAddress}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                {stall.operatingHours && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{stall.operatingHours}</span>
                  </div>
                )}
                {stall.distance !== undefined && (
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>{stall.distance.toFixed(1)} km away</span>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2 mt-3">
                {stall.contactPhone && (
                  <button
                    onClick={handleCall}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    Call
                  </button>
                )}
                {stall.contactEmail && (
                  <button
                    onClick={handleEmail}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    Email
                  </button>
                )}
              </div>

              {stall.availableGenres && stall.availableGenres.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {stall.availableGenres.slice(0, 3).map((genre) => (
                    <Badge key={genre} variant="secondary" size="sm">
                      {genre}
                    </Badge>
                  ))}
                  {stall.availableGenres.length > 3 && (
                    <Badge variant="secondary" size="sm">
                      +{stall.availableGenres.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
