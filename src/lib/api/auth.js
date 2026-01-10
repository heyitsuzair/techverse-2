/**
 * Authentication API client functions
 */

import { post, get } from '@/config/network';
import endpoints from '@/config/endpoints';

/**
 * Sign up a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User full name
 * @param {string} [userData.phone] - User phone number (optional)
 * @returns {Promise<Object>} Response with user data and tokens
 */
export async function signUp({ email, password, name, phone }) {
  return post(endpoints.auth.signup, { email, password, name, phone });
}

/**
 * Sign in an existing user
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Response with user data and tokens
 */
export async function signIn({ email, password }) {
  return post(endpoints.auth.signin, { email, password });
}

/**
 * Sign in with Google OAuth
 * @param {string} googleToken - Google OAuth token
 * @returns {Promise<Object>} Response with user data and tokens
 */
export async function signInWithGoogle(googleToken) {
  return post(endpoints.auth.google, { token: googleToken });
}

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<Object>} Response confirming email sent
 */
export async function forgotPassword(email) {
  return post(endpoints.auth.forgotPassword, { email });
}

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Response confirming password reset
 */
export async function resetPassword(token, newPassword) {
  return post(endpoints.auth.resetPassword, { token, newPassword });
}

/**
 * Get current authenticated user
 * @param {string} accessToken - JWT access token
 * @returns {Promise<Object>} Current user data
 */
export async function getCurrentUser(accessToken) {
  return get(endpoints.auth.me, {
    Authorization: `Bearer ${accessToken}`,
  });
}

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New access and refresh tokens
 */
export async function refreshAccessToken(refreshToken) {
  return post(endpoints.auth.refresh, { refreshToken });
}
