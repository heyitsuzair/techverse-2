/**
 * Upload file to Cloudinary from browser
 * This works in client components (browser environment)
 */
const uploadToCloudinary = async (file, folder = "general") => {
  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

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

    // Return the secure URL
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export default uploadToCloudinary;
