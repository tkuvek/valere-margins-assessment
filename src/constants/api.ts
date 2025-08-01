export const API_CONFIG = { 
  SCROLL_THRESHOLD: 1000,
  DEBOUNCE_DELAY: 300,
  
  IMAGE_SIZES: {
    POSTER_SMALL: 'w92',
    POSTER_MEDIUM: 'w185',
    POSTER_LARGE: 'w500',
    BACKDROP_SMALL: 'w780',
    BACKDROP_LARGE: 'w1280',
  },
  
  STORAGE_KEYS: {
    FAVORITES: 'movieFavorites',
    SEARCH_HISTORY: 'movieSearchHistory',
  }
} as const;

export const TMDB_CONFIG = {
  BASE_IMAGE_URL: 'https://image.tmdb.org/t/p',
  REGION: 'HR',
} as const; 