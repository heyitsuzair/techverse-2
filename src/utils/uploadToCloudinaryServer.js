/**
 * Server-side upload to Cloudinary
 * This file should only be used in API routes (server-side)
 */
import cloudinary from "../config/cloudinary";

/**
 * Upload buffer to Cloudinary (server-side only)
 * @param {Object} file - Object with buffer property
 * @param {Object} options - Upload options with folder and transformation
 * @returns {Promise<{url: string}>} - Object with url property
 */
const uploadToCloudinaryServer = async (file, options = {}) => {
  try {
    // Validate file
    if (!file || !file.buffer || !Buffer.isBuffer(file.buffer)) {
      throw new Error("Invalid buffer provided");
    }

    const buffer = file.buffer;

    // Build upload options
    const uploadOptions = {
      folder: options.folder || "general",
      resource_type: "image",
    };

    // Add transformations if provided
    if (options.transformation && Array.isArray(options.transformation)) {
      uploadOptions.transformation = options.transformation;
    }

    // Upload buffer using upload_stream for better performance
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Return object with url property to match expected format
            resolve({ url: result.secure_url });
          }
        }
      );

      // Write buffer to the upload stream
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary server upload error:", error);
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

export default uploadToCloudinaryServer;
