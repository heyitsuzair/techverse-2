"use client";

import { useState, useRef, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const libraries = ["places"];

export function AddressAutocomplete({ value, onChange, placeholder = "Enter address" }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address || place.name || "";
      const lat = place.geometry?.location?.lat() || null;
      const lng = place.geometry?.location?.lng() || null;
      
      // Call onChange with address, lat, lng
      onChange(address, lat, lng);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="relative">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            types: ["address"],
            fields: ["formatted_address", "name", "geometry"],
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 rounded-lg border bg-white text-foreground border-zinc-300 placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
        </Autocomplete>
      </div>
    </LoadScript>
  );
}
