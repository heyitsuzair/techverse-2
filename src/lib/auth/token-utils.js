/**
 * Token utility functions for authentication
 */

/**
 * Extract Bearer token from Authorization header
 * @param {Request} request - Next.js request object
 * @returns {string|null} - Extracted token or null
 */
export function extractBearerToken(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return null;
  }

  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return null;
  }

  return token;
}

/**
 * Validate and extract token with error response
 * @param {Request} request - Next.js request object
 * @returns {{ token: string|null, error: string|null }}
 */
export function validateAuthHeader(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return {
      token: null,
      error: "No authorization header provided",
    };
  }

  if (!authHeader.startsWith("Bearer ")) {
    return {
      token: null,
      error: "Invalid authorization header format. Expected: Bearer <token>",
    };
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return {
      token: null,
      error: "No token provided in authorization header",
    };
  }

  return {
    token,
    error: null,
  };
}
