"use client";

import { useState, useEffect } from "react";
import { Card, Button, Spinner, Badge } from "@/components/ui";
import AddStallModal from "@/app/(main)/exchange-points/AddStallModal";
import { getFromCookie } from "@/utils/cookies";

export default function MyStalls() {
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStall, setEditingStall] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMyStalls();
  }, []);

  const fetchMyStalls = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getFromCookie("accessToken");
      if (!token) {
        throw new Error("Please login to continue");
      }

      const response = await fetch("/api/stalls/my-stalls", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stalls");
      }

      setStalls(data.stalls || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stallId) => {
    if (
      !confirm(
        "Are you sure you want to delete this stall? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeletingId(stallId);

      const token = getFromCookie("accessToken");
      const response = await fetch(`/api/stalls/${stallId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete stall");
      }

      // Remove from list
      setStalls((prev) => prev.filter((s) => s.id !== stallId));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (stall) => {
    setEditingStall(stall);
    setIsAddModalOpen(true);
  };

  const handleSuccess = (updatedStall) => {
    if (editingStall) {
      // Update existing
      setStalls((prev) =>
        prev.map((s) => (s.id === updatedStall.id ? updatedStall : s))
      );
    } else {
      // Add new
      setStalls((prev) => [updatedStall, ...prev]);
    }
    setEditingStall(null);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setEditingStall(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Exchange Stalls
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your physical book exchange locations
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Add New Stall</Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-3xl font-bold text-blue-600">
            {stalls.length}
          </div>
          <div className="text-gray-600 mt-1">Total Stalls</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-green-600">
            {stalls.filter((s) => s.isActive).length}
          </div>
          <div className="text-gray-600 mt-1">Active Stalls</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold text-gray-600">
            {stalls.filter((s) => !s.isActive).length}
          </div>
          <div className="text-gray-600 mt-1">Inactive Stalls</div>
        </Card>
      </div>

      {/* Stalls List */}
      {stalls.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-20 h-20 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No stalls yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first exchange stall to start connecting with readers in
            your area
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            + Add Your First Stall
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stalls.map((stall) => (
            <Card key={stall.id} className="overflow-hidden">
              {/* Photo */}
              {stall.photos && stall.photos.length > 0 && (
                <img
                  src={stall.photos[0]}
                  alt={stall.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {stall.name}
                    </h3>
                    <Badge variant={stall.isActive ? "success" : "secondary"}>
                      {stall.isActive ? "✓ Active" : "✗ Inactive"}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                {stall.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {stall.description}
                  </p>
                )}

                {/* Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">{stall.locationAddress}</span>
                  </div>

                  {stall.operatingHours && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">{stall.operatingHours}</span>
                    </div>
                  )}

                  {stall.contactPhone && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm">{stall.contactPhone}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {stall.availableGenres && stall.availableGenres.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {stall.availableGenres.slice(0, 3).map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {genre}
                        </span>
                      ))}
                      {stall.availableGenres.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{stall.availableGenres.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleEdit(stall)}
                    variant="outline"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(stall.id)}
                    variant="outline"
                    disabled={deletingId === stall.id}
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    {deletingId === stall.id ? <Spinner size="sm" /> : "Delete"}
                  </Button>
                </div>

                {/* Metadata */}
                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  Created {new Date(stall.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddStallModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        editStall={editingStall}
      />
    </div>
  );
}
