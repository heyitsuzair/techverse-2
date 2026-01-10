/**
 * Delete file from Cloudinary via API route
 * This works in client components by calling a secure backend endpoint
 */
const deleteFromCloudinary = async (imageUrl) => {
  try {
    // If no URL provided, just return
    if (!imageUrl) {
      return { success: true };
    }

    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/[cloud-name]/image/upload/v[version]/[folder]/[public_id].[format]
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");

    if (uploadIndex === -1) {
      throw new Error("Invalid Cloudinary URL");
    }

    // Get everything after 'upload/v[version]/'
    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join("/");
    // Remove file extension
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, "");

    // Call API route to delete (this needs to be created)
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Delete failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    // Don't throw error for delete failures, just log them
    return { success: false, error: error.message };
  }
};

export default deleteFromCloudinary;
