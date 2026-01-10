export default {
  home: "/",
  about: "/about",
  auth: {
    signin: "/signin",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  dashboard: {
    index: "/dashboard",
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
    books: {
      add: "/dashboard/books/add",
      myBooks: "/dashboard/books/my-books",
      qrHistory: "/dashboard/books/qr-history",
    },
    wishlist: "/dashboard/wishlist",
    exchange: {
      request: "/dashboard/exchange/request",
      tracking: "/dashboard/exchange/tracking",
    },
    points: {
      buy: "/dashboard/points/buy",
    },
    stalls: {
      add: "/dashboard/stalls/add",
    },
    forums: "/dashboard/forums",
    messages: "/dashboard/messages",
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
