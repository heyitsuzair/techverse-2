/**
 * String utility functions
 */

/**
 * Capitalize first letter of a string
 */
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str, length = 50, suffix = "...") {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html) {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Generate random string
 */
export function randomString(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Slugify a string (convert to URL-friendly format)
 */
export function slugify(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract email from string
 */
export function extractEmail(str) {
  if (!str) return null;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const match = str.match(emailRegex);
  return match ? match[0] : null;
}

/**
 * Extract URLs from string
 */
export function extractUrls(str) {
  if (!str) return [];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return str.match(urlRegex) || [];
}

/**
 * Mask email address (e.g., j***@example.com)
 */
export function maskEmail(email) {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  const maskedLocal =
    localPart.charAt(0) + "*".repeat(Math.min(localPart.length - 1, 3));
  return `${maskedLocal}@${domain}`;
}

/**
 * Mask phone number (e.g., +1 *** *** 1234)
 */
export function maskPhone(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length <= 4) return phone;
  const lastFour = cleaned.slice(-4);
  const masked = "*".repeat(cleaned.length - 4);
  return `${masked}${lastFour}`;
}
