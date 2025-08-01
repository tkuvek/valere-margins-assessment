import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isOpen: boolean;
  selectedIndex: number;
  recentSearches: string[];
}

const initialState: SearchState = {
  query: '',
  isOpen: false,
  selectedIndex: -1,
  recentSearches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.selectedIndex = -1;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      if (!action.payload) {
        state.selectedIndex = -1;
      }
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    incrementSelectedIndex: (state, action: PayloadAction<number>) => {
      const maxIndex = action.payload - 1;
      if (state.selectedIndex < maxIndex) {
        state.selectedIndex += 1;
      }
    },
    decrementSelectedIndex: (state) => {
      if (state.selectedIndex > -1) {
        state.selectedIndex -= 1;
      }
    },
    initializeSearchHistory: (state, action: PayloadAction<string[]>) => {
      state.recentSearches = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query);
        if (state.recentSearches.length > 5) {
          state.recentSearches = state.recentSearches.slice(0, 5);
        }
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    resetSearch: (state) => {
      state.query = '';
      state.isOpen = false;
      state.selectedIndex = -1;
    },
  },
});

export const {
  setQuery,
  setIsOpen,
  setSelectedIndex,
  incrementSelectedIndex,
  decrementSelectedIndex,
  addRecentSearch,
  clearRecentSearches,
  resetSearch,
  initializeSearchHistory,
} = searchSlice.actions;

export default searchSlice.reducer; 