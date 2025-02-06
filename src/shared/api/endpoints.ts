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
    CARDS: (id: number) => `/decks/${id}/cards`,
  },
  CARDS: {
    BASE: '/cards',
    DETAIL: (id: number) => `/cards/${id}`,
  },
  PROGRESS: {
    BASE: '/progress',
    BATCH: '/progress/batch',
    DETAIL: (id: number) => `/progress/${id}`,
  },
};
