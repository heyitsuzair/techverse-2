"use client";

import { useCallback, useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MapPin, Star, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "600px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 40.7128, // New York City default
  lng: -74.006,
};

const mapOptions = {
  disableDefaultUI: false,
  clickableIcons: false,
  scrollwheel: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function MapView({ stalls, selectedStall, onSelectStall }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Convert stalls to map markers with coordinates
  const markers = useMemo(() => {
    return stalls.map((stall, index) => {
      // Mock coordinates around NYC - in production, these would come from your database
      const baseCoordinates = [
        { lat: 40.7128, lng: -74.006 },
        { lat: 40.7489, lng: -73.9681 },
        { lat: 40.6782, lng: -73.9442 },
        { lat: 40.7282, lng: -73.7949 },
        { lat: 40.7614, lng: -73.9776 },
        { lat: 40.6413, lng: -74.0822 },
      ];

      return {
        ...stall,
        position: baseCoordinates[index % baseCoordinates.length],
      };
    });
  }, [stalls]);

  const onMapClick = useCallback(() => {
    setActiveMarker(null);
  }, []);

  const onMarkerClick = useCallback(
    (stall) => {
      setActiveMarker(stall.id);
      onSelectStall(stall);
    },
    [onSelectStall]
  );

  if (loadError) {
    return (
      <div className="relative w-full h-full min-h-[600px] bg-slate-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center p-8">
          <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Failed to Load Map
          </h3>
          <p className="text-sm text-slate-600 max-w-md">
            Please check your Google Maps API key in environment variables
            (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-full min-h-[600px] bg-slate-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={defaultCenter}
        options={mapOptions}
        onClick={onMapClick}
      >
        {markers.map((stall) => (
          <Marker
            key={stall.id}
            position={stall.position}
            onClick={() => onMarkerClick(stall)}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
              fillColor: selectedStall?.id === stall.id ? "#2563eb" : "#ef4444",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 2,
              anchor: new window.google.maps.Point(12, 24),
            }}
            animation={
              selectedStall?.id === stall.id
                ? window.google.maps.Animation.BOUNCE
                : null
            }
          >
            {activeMarker === stall.id && (
              <InfoWindow
                position={stall.position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="p-2 max-w-xs">
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
                        <span className="text-xs text-slate-500">
                          ({stall.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{stall.hours}</span>
                      </div>
                      {stall.isOpen && (
                        <Badge variant="success" size="sm">
                          Open Now
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">{stall.address}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>

      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
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
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <p className="text-xs font-semibold text-slate-700 mb-2">Map Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-xs text-slate-600">Exchange Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-xs text-slate-600">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
