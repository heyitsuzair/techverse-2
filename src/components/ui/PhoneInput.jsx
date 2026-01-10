"use client";

import { useState, useMemo } from "react";
import { allCountries, getCountryByCode } from "@/lib/countries";

export function PhoneInput({
  label,
  error,
  helperText,
  className = "",
  required = false,
  countryCode,
  phoneNumber,
  onCountryChange,
  onPhoneChange,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCountry = useMemo(
    () => getCountryByCode(countryCode),
    [countryCode]
  );

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return allCountries;
    const query = searchQuery.toLowerCase();
    return allCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.includes(query) ||
        country.iso.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {/* Country Dropdown */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              h-[42px] w-[100px] px-2 rounded-lg border
              bg-white
              text-zinc-900
              border-zinc-300
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-colors
              flex items-center justify-between gap-1
              ${error ? "border-red-500 focus:ring-red-500" : ""}
            `}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base flex-shrink-0">
                {selectedCountry.flag}
              </span>
              <span className="text-sm font-medium truncate">
                {selectedCountry.code}
              </span>
            </div>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery("");
                }}
              />
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-zinc-200 rounded-lg shadow-xl z-20 max-h-[400px] flex flex-col">
                {/* Search Input */}
                <div className="p-2 border-b border-zinc-200">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {/* Countries List */}
                <div className="overflow-y-auto max-h-[340px]">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          onCountryChange?.(country.code);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                        className="w-full px-3 py-2.5 text-left hover:bg-zinc-100 flex items-center gap-3 transition-colors"
                      >
                        <span className="text-lg flex-shrink-0">
                          {country.flag}
                        </span>
                        <span className="text-sm font-medium text-zinc-900 flex-shrink-0 w-16">
                          {country.code}
                        </span>
                        <span className="text-sm text-zinc-700 truncate">
                          {country.name}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-sm text-zinc-500 text-center">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onPhoneChange?.(e.target.value)}
          className={`
            flex-1 h-[42px] px-4 rounded-lg border
            bg-white
            text-zinc-900
            border-zinc-300
            placeholder:text-zinc-400
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${error ? "border-red-500 focus:ring-red-500" : ""}
          `}
          placeholder="Enter phone number"
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
