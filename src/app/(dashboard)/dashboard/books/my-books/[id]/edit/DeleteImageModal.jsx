"use client";

import { useState } from "react";
import { Modal, Button, Text } from "@/components/ui";
import { AlertTriangle, Trash2, X, Image as ImageIcon } from "lucide-react";

export function DeleteImageModal({
  isOpen,
  onClose,
  onConfirmDelete,
  imageName,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirmDelete();
      onClose();
    } catch (error) {
      console.error("Failed to delete image:", error);
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
          Delete Book Image?
        </Text>

        {/* Description */}
        <Text variant="body" className="text-zinc-600 mb-6">
          Are you sure you want to delete this book cover image? This action
          cannot be undone.
        </Text>

        {/* Image Preview */}
        {imageName && (
          <div className="bg-zinc-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-zinc-700">
              <ImageIcon className="w-5 h-5" />
              <Text variant="caption" className="font-medium">
                {imageName}
              </Text>
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

export default DeleteImageModal;
