/**
 * Formatting utility functions
 */

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return "";
  return Number(num).toLocaleString();
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  if (amount === null || amount === undefined) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value, decimals = 2) {
  if (value === null || value === undefined) return "";
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Format file size (bytes to human readable)
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Format duration in seconds to human readable (e.g., 3661 -> "1h 1m 1s")
 */
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return "0s";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(" ") || "0s";
}

/**
 * Format phone number (e.g., 1234567890 -> (123) 456-7890)
 */
export function formatPhoneNumber(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }
  return phone;
}

/**
 * Format credit card number (mask all but last 4 digits)
 */
export function formatCreditCard(cardNumber) {
  if (!cardNumber) return "";
  const cleaned = cardNumber.replace(/\D/g, "");
  if (cleaned.length >= 4) {
    const lastFour = cleaned.slice(-4);
    const masked = "*".repeat(cleaned.length - 4);
    return `${masked}${lastFour}`.match(/.{1,4}/g)?.join(" ") || cardNumber;
  }
  return cardNumber;
}

/**
 * Format initials from name
 */
export function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}
