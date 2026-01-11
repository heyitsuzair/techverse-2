/**
 * Upload file to Cloudinary from browser
 * This works in client components (browser environment)
 * For server-side uploads, use uploadToCloudinaryServer instead
 */
const uploadToCloudinary = async (file, folderOrOptions = "general") => {
  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    const options =
      typeof folderOrOptions === "object"
        ? folderOrOptions
        : { folder: folderOrOptions };

    // Client-side upload using FormData
    const folder =
      typeof folderOrOptions === "string"
        ? folderOrOptions
        : options.folder || "general";

    // Get Cloudinary config from environment
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

    if (!cloudName) {
      throw new Error("Cloudinary cloud name not configured");
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    // Add transformations if provided (client-side)
    if (options.transformation && Array.isArray(options.transformation)) {
      const transformationString = options.transformation
        .map((t) => {
          const parts = [];
          if (t.width) parts.push(`w_${t.width}`);
          if (t.height) parts.push(`h_${t.height}`);
          if (t.crop) parts.push(`c_${t.crop}`);
          if (t.gravity) parts.push(`g_${t.gravity}`);
          return parts.join(",");
        })
        .join("/");
      if (transformationString) {
        formData.append("transformation", transformationString);
      }
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Upload failed");
    }

    const result = await response.json();

    // Return the secure URL (client-side returns string directly)
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export default uploadToCloudinary;
