import { get, post, put, del } from '@/config/network';
import endpoints from '@/config/endpoints';

/**
 * Get all books (marketplace) with filters
 * @param {Object} filters - Optional filters
 * @param {string} [filters.genre] - Filter by genre
 * @param {string} [filters.condition] - Filter by condition
 * @param {string} [filters.location] - Search in location address
 * @param {string} [filters.search] - Search in title, author, description
 * @param {string} [filters.userId] - Filter by book owner
 * @param {number} [filters.page] - Page number (default: 1)
 * @param {number} [filters.limit] - Items per page (default: 20)
 * @returns {Promise<{books: Array, pagination: Object}>}
 */
export async function getBooks(filters = {}) {
  const queryParams = new URLSearchParams();
  
  if (filters.genre) queryParams.append('genre', filters.genre);
  if (filters.condition) queryParams.append('condition', filters.condition);
  if (filters.location) queryParams.append('location', filters.location);
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.userId) queryParams.append('userId', filters.userId);
  if (filters.page) queryParams.append('page', filters.page.toString());
  if (filters.limit) queryParams.append('limit', filters.limit.toString());
  
  const url = queryParams.toString() 
    ? `${endpoints.books.list}?${queryParams.toString()}`
    : endpoints.books.list;
    
  return get(url);
}

/**
 * Create a new book listing
 * @param {Object} bookData - Book data
 * @param {string} bookData.title - Book title (required)
 * @param {string} [bookData.author] - Author name
 * @param {string} [bookData.isbn] - ISBN number
 * @param {string} [bookData.description] - Book description
 * @param {string} bookData.genre - Book genre (required)
 * @param {string} bookData.condition - Book condition (required)
 * @param {string} [bookData.language] - Language (default: English)
 * @param {number} [bookData.pointValue] - Points value (default: 10)
 * @param {string} [bookData.locationAddress] - Book location address
 * @param {number} [bookData.locationLat] - Latitude
 * @param {number} [bookData.locationLng] - Longitude
 * @param {File} [bookData.coverImage] - Cover image file
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{book: Object}>}
 */
export async function createBook(bookData, accessToken) {
  // Create FormData for multipart/form-data upload
  const formData = new FormData();
  
  Object.keys(bookData).forEach(key => {
    const value = bookData[key];
    // Only skip undefined and null, allow empty strings to be sent
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const response = await fetch(endpoints.books.add, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create book');
  }

  return response.json();
}

/**
 * Get book details by ID
 * @param {string} id - Book ID
 * @returns {Promise<{book: Object, valuation: Object, analytics: Object}>}
 */
export async function getBookById(id) {
  return get(endpoints.books.details(id));
}

/**
 * Update book details
 * @param {string} id - Book ID
 * @param {Object} bookData - Book data to update (same fields as createBook)
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{book: Object}>}
 */
export async function updateBook(id, bookData, accessToken) {
  // Create FormData for multipart/form-data upload
  const formData = new FormData();
  
  Object.keys(bookData).forEach(key => {
    const value = bookData[key];
    // Only skip undefined and null, allow empty strings to be sent
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const response = await fetch(endpoints.books.update(id), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update book');
  }

  return response.json();
}

/**
 * Delete a book
 * @param {string} id - Book ID
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function deleteBook(id, accessToken) {
  const response = await fetch(endpoints.books.delete(id), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete book');
  }

  return response.json();
}

/**
 * Add book history entry (QR scan, notes, etc.)
 * @param {string} bookId - Book ID
 * @param {Object} historyData - History data
 * @param {string} historyData.action - Action type (scanned, noted, exchanged, read, reviewed)
 * @param {string} [historyData.notes] - Notes
 * @param {string} [historyData.locationAddress] - Location address
 * @param {number} [historyData.locationLat] - Latitude
 * @param {number} [historyData.locationLng] - Longitude
 * @param {string} [historyData.startDate] - Start date (ISO string)
 * @param {string} [historyData.endDate] - End date (ISO string)
 * @param {string} accessToken - JWT access token
 * @returns {Promise<{history: Object}>}
 */
export async function addBookHistory(bookId, historyData, accessToken) {
  const response = await fetch(`${endpoints.books.details(bookId)}/history`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(historyData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add book history');
  }

  return response.json();
}

/**
 * Get book history
 * @param {string} bookId - Book ID
 * @returns {Promise<{history: Array, total: number}>}
 */
export async function getBookHistory(bookId) {
  const response = await fetch(`${endpoints.books.details(bookId)}/history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get book history');
  }

  return response.json();
}

/**
 * Get book forums/discussions
 * @param {string} bookId - Book ID
 * @returns {Promise<{forums: Array}>}
 */
export async function getBookForums(bookId) {
  const response = await fetch(`${endpoints.books.details(bookId)}/forums`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get book forums');
  }

  return response.json();
}
