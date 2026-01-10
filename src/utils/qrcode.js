import cloudinary from "../config/cloudinary";

/**
 * Generate QR code and upload to Cloudinary
 * @param {string} bookId - Book ID to encode in QR
 * @param {string} bookTitle - Book title for filename
 * @returns {Promise<string>} - Cloudinary URL of QR code
 */
export async function generateAndUploadQRCode(bookId, bookTitle) {
  try {
    // QR Code API from goqr.me (free service)
    const qrData = `${process.env.NEXT_PUBLIC_APP_URL}/qr-scan/${bookId}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
      qrData
    )}`;

    // Upload QR code to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(qrCodeUrl, {
      folder: "book-qr-codes",
      public_id: `qr_${bookId}`,
      overwrite: true,
      resource_type: "image",
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("QR code generation error:", error);
    throw new Error("Failed to generate QR code");
  }
}

/**
 * Delete QR code from Cloudinary
 * @param {string} bookId - Book ID
 */
export async function deleteQRCode(bookId) {
  try {
    const publicId = `book-qr-codes/qr_${bookId}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("QR code deletion error:", error);
    // Don't throw error, just log it
  }
}
