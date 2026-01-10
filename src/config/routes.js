export default {
  home: "/",
  auth: {
    signin: "/signin",
    signup: "/signup",
    forgotPassword: "/forgot-password",
  },
  dashboard: {
    index: "/dashboard",
  },
  marketplace: "/marketplace",
  book: {
    detail: (id) => `/book/${id}`,
  },
  forums: {
    index: "/forums",
    book: (bookId) => `/forums/${bookId}`,
  },
  exchangePoints: "/exchange-points",
  qrScan: (bookId) => `/qr-scan/${bookId}`,
};
