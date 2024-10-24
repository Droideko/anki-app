export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/refresh',
    USER_PROFILE: '/users/profile',
  },
  CATEGORIES: {
    BASE: '/categories',
    DETAIL: (id: number) => `/categories/${id}`,
  },
  DECKS: {
    BASE: '/decks',
    DETAIL: (id: number) => `/decks/${id}`,
  },
};
