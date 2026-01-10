export default {
  auth: {
    signup: '/api/auth/signup',
    signin: '/api/auth/signin',
    google: '/api/auth/google',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
  },
  books: {
    list: '/api/books',
    details: (id) => `/api/books/${id}`,
    add: '/api/books',
    update: (id) => `/api/books/${id}`,
    delete: (id) => `/api/books/${id}`,
  },
  users: {
    profile: '/api/users/profile',
    update: '/api/users/update',
  },
  exchange: {
    request: '/api/exchange/request',
    tracking: '/api/exchange/tracking',
  },
  forums: {
    list: '/api/forums',
    book: (bookId) => `/api/forums/${bookId}`,
    posts: '/api/forums/posts',
  },
  qr: {
    scan: (bookId) => `/api/qr/scan/${bookId}`,
    history: '/api/qr/history',
  },
};
