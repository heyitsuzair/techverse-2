/**
 * Payments API client functions
 */

import { get, post } from "@/config/network";
import endpoints from "@/config/endpoints";

/**
 * Get all available point packages and user's current points
 * @returns {Promise<{currentPoints: number|null, packages: Array}>}
 */
export const getPackages = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return get(endpoints.payments.packages, headers);
};

/**
 * Create a Stripe checkout session for purchasing a package
 * @param {string} packageId - The ID of the package to purchase
 * @returns {Promise<{sessionId: string, sessionUrl: string, package: object}>}
 */
export const createCheckoutSession = async (packageId) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Authentication required");
  }

  return post(
    endpoints.payments.createSession,
    { packageId },
    { Authorization: `Bearer ${token}` }
  );
};
