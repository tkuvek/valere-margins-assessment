import { MovieDetails } from '@/types/movie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: number[];
  favoriteMovies: MovieDetails[];
  isInitialized: boolean;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  favoriteMovies: [],
  isInitialized: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
      state.favoriteMovies = [];
      state.isInitialized = true;
    },
    setFavoriteMovies: (state, action: PayloadAction<MovieDetails[]>) => {
      state.favoriteMovies = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      if (!state.favoriteIds.includes(movieId)) {
        state.favoriteIds.push(movieId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      state.favoriteIds = state.favoriteIds.filter(id => id !== movieId);
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const {
  initializeFavorites,
  setFavoriteMovies,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer; 