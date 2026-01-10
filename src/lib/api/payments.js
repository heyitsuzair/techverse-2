import { get, post } from '@/config/network';
import endpoints from '@/config/endpoints';

/**
 * Get all available point packages and user's current points
 * @returns {Promise<{currentPoints: number|null, packages: Array}>}
 */
export async function getPackages() {
  return get(endpoints.payments.packages);
}

/**
 * Create a Stripe checkout session for purchasing a package
 * @param {string} packageId - The ID of the package to purchase
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{sessionId: string, sessionUrl: string, package: object}>}
 */
export async function createCheckoutSession(packageId, accessToken) {
  return post(endpoints.payments.createSession, { packageId }, {
    Authorization: `Bearer ${accessToken}`,
  });
}
