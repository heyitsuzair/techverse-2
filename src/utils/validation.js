/**
 * Validation utility functions
 */

/**
 * Validate email address
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const cleaned = phone.replace(/\D/g, "");
  return phoneRegex.test(phone) && cleaned.length >= 10;
}

/**
 * Validate URL
 */
export function isValidUrl(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  if (!password) {
    return {
      valid: false,
      errors: ["Password is required"],
    };
  }

  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmpty(str) {
  return !str || str.trim().length === 0;
}

/**
 * Validate required field
 */
export function isRequired(value) {
  if (typeof value === "string") {
    return !isEmpty(value);
  }
  return value !== null && value !== undefined;
}

/**
 * Validate number range
 */
export function isInRange(value, min, max) {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
}

/**
 * Validate minimum length
 */
export function minLength(str, min) {
  if (!str) return false;
  return str.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(str, max) {
  if (!str) return true;
  return str.length <= max;
}
