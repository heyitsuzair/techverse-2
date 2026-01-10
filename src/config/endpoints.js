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
    me: '/api/users/me',
    profile: (id) => `/api/users/${id}`,
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
  payments: {
    packages: '/api/payments/packages',
    createSession: '/api/payments/create-session',
  },
};
