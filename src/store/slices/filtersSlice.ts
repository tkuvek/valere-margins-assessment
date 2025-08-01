import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieFilterState {
  year: string;
  genre: string;
  minScore: number;
}

interface FiltersState {
  mostWatched: MovieFilterState;
}

const initialState: FiltersState = {
  mostWatched: {
    year: '',
    genre: '',
    minScore: 0,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMostWatchedFilters: (state, action: PayloadAction<Partial<MovieFilterState>>) => {
      state.mostWatched = { ...state.mostWatched, ...action.payload };
    },
    setMostWatchedYear: (state, action: PayloadAction<string>) => {
      state.mostWatched.year = action.payload;
    },
    setMostWatchedGenre: (state, action: PayloadAction<string>) => {
      state.mostWatched.genre = action.payload;
    },
    setMostWatchedMinScore: (state, action: PayloadAction<number>) => {
      state.mostWatched.minScore = action.payload;
    },
    resetMostWatchedFilters: (state) => {
      state.mostWatched = {
        year: '',
        genre: '',
        minScore: 0,
      };
    },
  },
});

export const {
  setMostWatchedFilters,
  setMostWatchedYear,
  setMostWatchedGenre,
  setMostWatchedMinScore,
  resetMostWatchedFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer; 