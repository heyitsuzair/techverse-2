"use client";

import { MapPin, Star, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui";

export default function MapView({ stalls, selectedStall, onSelectStall }) {
  // Note: Google Maps integration requires API key and proper setup
  // For now, showing placeholder with stall markers visualization

  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-100 rounded-lg overflow-hidden shadow-lg">
      {/* Map Placeholder with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148, 163, 184) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148, 163, 184) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Stall Markers */}
        <div className="relative w-full h-full">
          {stalls.map((stall, index) => {
            // Distribute markers across the map (mock positioning)
            const positions = [
              { top: "25%", left: "30%" },
              { top: "45%", left: "60%" },
              { top: "60%", left: "35%" },
              { top: "35%", left: "70%" },
              { top: "70%", left: "55%" },
              { top: "20%", left: "50%" },
            ];
            const position = positions[index % positions.length];

            return (
              <button
                key={stall.id}
                onClick={() => onSelectStall(stall)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: position.top, left: position.left }}
              >
                {/* Marker Pin */}
                <div
                  className={`relative transition-all ${
                    selectedStall?.id === stall.id
                      ? "scale-125 z-10"
                      : "hover:scale-110"
                  }`}
                >
                  <MapPin
                    className={`w-10 h-10 drop-shadow-lg ${
                      selectedStall?.id === stall.id
                        ? "fill-primary text-primary"
                        : "fill-red-500 text-red-500"
                    }`}
                  />

                  {/* Pulse Effect */}
                  {selectedStall?.id === stall.id && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary opacity-75 animate-ping" />
                  )}
                </div>

                {/* Info Popup on Hover/Select */}
                {selectedStall?.id === stall.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-4 pointer-events-none">
                    <div className="flex gap-3">
                      <img
                        src={stall.imageUrl}
                        alt={stall.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-sm mb-1">
                          {stall.name}
                        </h4>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold">
                            {stall.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Clock className="w-3 h-3" />
                          <span>{stall.hours}</span>
                        </div>
                        {stall.isOpen && (
                          <Badge variant="success" size="sm" className="mt-1">
                            Open Now
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs font-semibold text-slate-900">
                {stalls.length} Exchange Points
              </p>
              <p className="text-xs text-slate-500">In your area</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Map Legend
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="text-xs text-slate-600">Exchange Point</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 fill-primary text-primary" />
              <span className="text-xs text-slate-600">Selected</span>
            </div>
          </div>
        </div>

        {/* Center Note */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 text-center max-w-xs">
            <p className="text-sm font-semibold text-slate-700 mb-1">
              📍 Interactive Map View
            </p>
            <p className="text-xs text-slate-500">
              Click markers to view exchange point details
            </p>
            <p className="text-xs text-slate-400 mt-2">
              <em>Google Maps integration available with API key</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
