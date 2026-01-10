import apiClient from './apiClient';
import endpoints from '@/config/endpoints';

/**
 * Get all available point packages and user's current points
 * @returns {Promise<{currentPoints: number|null, packages: Array}>}
 */
export const getPackages = async () => {
  const response = await apiClient.get(endpoints.payments.packages);
  return response.data;
};

/**
 * Create a Stripe checkout session for purchasing a package
 * @param {string} packageId - The ID of the package to purchase
 * @returns {Promise<{sessionId: string, sessionUrl: string, package: object}>}
 */
export const createCheckoutSession = async (packageId) => {
  const response = await apiClient.post(endpoints.payments.createSession, {
    packageId,
  });
  return response.data;
};
