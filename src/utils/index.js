/**
 * Central export for all utility functions
 */

// LocalStorage utilities
export {
  setInLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
} from "./localStorage";

// Cookie utilities
export {
  setInCookie,
  getFromCookie,
  removeCookie,
  getAllCookies,
} from "./cookies";

// Date/Time utilities
export {
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  getTimeAgo,
  isToday,
  isYesterday,
  isThisWeek,
  startOfDay,
  endOfDay,
  addDays,
  subtractDays,
  getDaysDifference,
  getHoursDifference,
  formatDateSmart,
} from "./dateTime";

// String utilities
export {
  capitalize,
  capitalizeWords,
  truncate,
  stripHtml,
  randomString,
  slugify,
  extractEmail,
  extractUrls,
  maskEmail,
  maskPhone,
} from "./string";

// Validation utilities
export {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  validatePassword,
  isEmpty,
  isRequired,
  isInRange,
  minLength,
  maxLength,
} from "./validation";

// Format utilities
export {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatFileSize,
  formatDuration,
  formatPhoneNumber,
  formatCreditCard,
  getInitials,
} from "./format";

// Cloudinary utilities
export { uploadToCloudinary } from "./uploadToCloudinary";
export { deleteFromCloudinary } from "./deleteFromCloudinary";
