/**
 * Network utility for making API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Make an API request
 * @param {string} endpoint - API endpoint path (e.g., '/api/auth/signin')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Make a GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} headers - Optional headers
 * @returns {Promise<Object>}
 */
export async function get(endpoint, headers = {}) {
  return apiRequest(endpoint, {
    method: 'GET',
    headers,
  });
}

/**
 * Make a POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} headers - Optional headers
 * @returns {Promise<Object>}
 */
export async function post(endpoint, body, headers = {}) {
  return apiRequest(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

/**
 * Make a PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body
 * @param {Object} headers - Optional headers
 * @returns {Promise<Object>}
 */
export async function put(endpoint, body, headers = {}) {
  return apiRequest(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
}

/**
 * Make a DELETE request
 * @param {string} endpoint - API endpoint
 * @param {Object} headers - Optional headers
 * @returns {Promise<Object>}
 */
export async function del(endpoint, headers = {}) {
  return apiRequest(endpoint, {
    method: 'DELETE',
    headers,
  });
}
