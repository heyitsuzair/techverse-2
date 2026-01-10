"use client";

import { useState } from "react";
import { Modal, Button, Text } from "@/components/ui";
import { AlertTriangle, Trash2, X } from "lucide-react";

export function DeleteBookModal({ isOpen, onClose, book, onConfirmDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirmDelete(book?.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete book:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} size="sm">
      <div className="text-center py-4">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <Text variant="h3" className="mb-2 text-zinc-900">
          Delete Book?
        </Text>

        {/* Description */}
        <Text variant="body" className="text-zinc-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-zinc-900">"{book?.title}"</span>?
          This action cannot be undone.
        </Text>

        {/* Book Details */}
        {book && (
          <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Text variant="caption" className="text-zinc-500">
                  Author:
                </Text>
                <Text variant="caption" className="text-zinc-900 font-medium">
                  {book.author}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text variant="caption" className="text-zinc-500">
                  Genre:
                </Text>
                <Text variant="caption" className="text-zinc-900 font-medium">
                  {book.genre}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text variant="caption" className="text-zinc-500">
                  Condition:
                </Text>
                <Text variant="caption" className="text-zinc-900 font-medium">
                  {book.condition}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Cancel Button - Transparent with border */}
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-zinc-300 bg-transparent hover:bg-zinc-50 text-zinc-700"
            disabled={isDeleting}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>

          {/* Delete Button - Red */}
          <Button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBookModal;
