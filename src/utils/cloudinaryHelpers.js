/**
 * Extract public_id from Cloudinary URL
 * @param {string} url - Cloudinary image URL
 * @returns {string|null} - Public ID or null
 */
export function extractPublicId(url) {
  if (!url || typeof url !== "string") return null;

  try {
    // Match pattern: /upload/v{version}/{public_id}.{extension}
    // or /upload/{public_id}.{extension}
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    if (matches && matches[1]) {
      return matches[1];
    }

    // If URL doesn't match expected pattern, return null
    return null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
}

/**
 * Check if URL is a Cloudinary URL
 * @param {string} url - Image URL
 * @returns {boolean}
 */
export function isCloudinaryUrl(url) {
  if (!url || typeof url !== "string") return false;
  return url.includes("cloudinary.com");
}
