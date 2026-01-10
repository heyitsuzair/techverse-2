"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Button,
  Spinner,
  AddressAutocomplete,
} from "@/components/ui";
import uploadToCloudinary from "@/utils/uploadToCloudinary";
import deleteFromCloudinary from "@/utils/deleteFromCloudinary";
import { getFromCookie } from "@/utils/cookies";

export default function AddStallModal({
  isOpen,
  onClose,
  onSuccess,
  editStall = null,
}) {
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locationAddress: "",
    locationLat: null,
    locationLng: null,
    contactPhone: "",
    contactEmail: "",
    operatingHours: "",
    availableGenres: [],
    photos: [],
    isActive: true,
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editStall) {
      setFormData({
        name: editStall.name || "",
        description: editStall.description || "",
        locationAddress: editStall.locationAddress || "",
        locationLat: editStall.locationLat,
        locationLng: editStall.locationLng,
        contactPhone: editStall.contactPhone || "",
        contactEmail: editStall.contactEmail || "",
        operatingHours: editStall.operatingHours || "",
        availableGenres: editStall.availableGenres || [],
        photos: editStall.photos || [],
        isActive: editStall.isActive !== false,
      });
      if (editStall.photos && editStall.photos.length > 0) {
        setPhotoPreview(editStall.photos[0]);
      }
    }
  }, [editStall]);

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Children",
    "Young Adult",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreToggle = (genre) => {
    setFormData((prev) => ({
      ...prev,
      availableGenres: prev.availableGenres.includes(genre)
        ? prev.availableGenres.filter((g) => g !== genre)
        : [...prev.availableGenres, genre],
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingPhoto(true);
      setError("");

      // Delete old photo if exists
      if (formData.photos.length > 0) {
        await deleteFromCloudinary(formData.photos[0]);
      }

      // Upload new photo
      const photoUrl = await uploadToCloudinary(file, "stalls");

      setFormData((prev) => ({
        ...prev,
        photos: [photoUrl],
      }));
      setPhotoPreview(photoUrl);
    } catch (err) {
      console.error("Photo upload error:", err);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      if (formData.photos.length > 0) {
        await deleteFromCloudinary(formData.photos[0]);
      }
      setFormData((prev) => ({ ...prev, photos: [] }));
      setPhotoPreview("");
    } catch (err) {
      console.error("Photo delete error:", err);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);
      const { lat, lng } = await getCurrentLocation();

      // Reverse geocode to get address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setFormData((prev) => ({
          ...prev,
          locationAddress: data.results[0].formatted_address,
          locationLat: lat,
          locationLng: lng,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          locationLat: lat,
          locationLng: lng,
        }));
      }
    } catch (err) {
      console.error("Location error:", err);
      setError("Failed to get current location. Please enter manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validation
      if (!formData.name || formData.name.length < 3) {
        throw new Error("Stall name must be at least 3 characters");
      }
      if (!formData.locationAddress) {
        throw new Error("Location address is required");
      }
      if (!formData.locationLat || !formData.locationLng) {
        throw new Error("Location coordinates are required");
      }

      // Get token from cookies
      const token = getFromCookie("accessToken");
      if (!token) {
        throw new Error("Please login to continue");
      }

      const url = editStall ? `/api/stalls/${editStall.id}` : "/api/stalls";

      const method = editStall ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save stall");
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        locationAddress: "",
        locationLat: null,
        locationLng: null,
        contactPhone: "",
        contactEmail: "",
        operatingHours: "",
        availableGenres: [],
        photos: [],
        isActive: true,
      });
      setPhotoPreview("");

      onSuccess(data.stall);
      onClose();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editStall ? "Edit Exchange Stall" : "Add Exchange Stall"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Stall Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stall Name <span className="text-red-500">*</span>
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Central Library Book Exchange"
              required
              minLength={3}
              maxLength={200}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your exchange stall..."
              rows={3}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Address <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <AddressAutocomplete
                value={formData.locationAddress}
                onChange={(address, lat, lng) => {
                  setFormData((prev) => ({
                    ...prev,
                    locationAddress: address,
                    locationLat: lat,
                    locationLng: lng,
                  }));
                }}
                placeholder="Start typing your address..."
              />
              <Button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                📍 Use My Current Location
              </Button>
            </div>
          </div>

          {/* Coordinates (Read-only display) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <Input
                name="locationLat"
                type="number"
                step="any"
                value={formData.locationLat || ""}
                onChange={handleChange}
                placeholder="Auto-filled"
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <Input
                name="locationLng"
                type="number"
                step="any"
                value={formData.locationLng || ""}
                onChange={handleChange}
                placeholder="Auto-filled"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <Input
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <Input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="contact@example.com"
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Hours
            </label>
            <Input
              name="operatingHours"
              value={formData.operatingHours}
              onChange={handleChange}
              placeholder="e.g., Monday-Friday 9AM-5PM"
            />
          </div>

          {/* Available Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.availableGenres.includes(genre)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stall Photo
            </label>
            {photoPreview ? (
              <div className="relative inline-block">
                <img
                  src={photoPreview}
                  alt="Stall"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  disabled={uploadingPhoto}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadingPhoto}
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {uploadingPhoto ? (
                    <>
                      <Spinner size="lg" />
                      <p className="mt-2 text-sm text-gray-600">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload stall photo
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Stall is currently active
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || uploadingPhoto}
              className="flex-1"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  {editStall ? "Updating..." : "Adding..."}
                </span>
              ) : editStall ? (
                "Update Stall"
              ) : (
                "Add Stall"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
