import { Middleware, UnknownAction } from '@reduxjs/toolkit';
import { initializeFavorites } from '../slices/favoritesSlice';
import type { RootState } from '../index';
import { API_CONFIG } from '@/constants/api';


export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const typedAction = action as UnknownAction;
  if (typedAction.type === '@@INIT' || typedAction.type === 'favorites/initializeFavorites') {
    try {
      const storedFavorites = localStorage.getItem(API_CONFIG.STORAGE_KEYS.FAVORITES);
      if (storedFavorites && typedAction.type === '@@INIT') {
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          store.dispatch(initializeFavorites(parsedFavorites));
        }
      }

      const storedSearchHistory = localStorage.getItem(API_CONFIG.STORAGE_KEYS.SEARCH_HISTORY);
      if (storedSearchHistory && typedAction.type === '@@INIT') {
        const parsedHistory = JSON.parse(storedSearchHistory);
        if (Array.isArray(parsedHistory)) {
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  const result = next(action);
  const state = store.getState() as RootState;

  if (typedAction.type?.startsWith('favorites/') && state.favorites?.isInitialized) {
    try {
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites.favoriteIds));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  if (typedAction.type?.startsWith('search/addRecentSearch') || typedAction.type?.startsWith('search/clearRecentSearches')) {
    try {
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(state.search.recentSearches));
    } catch (error) {
      console.error('Error saving search history to localStorage:', error);
    }
  }

  return result;
};

export const loadPersistedState = () => {
  if (typeof window === 'undefined') return {};

  try {
    const favorites = localStorage.getItem(API_CONFIG.STORAGE_KEYS.FAVORITES);
    const searchHistory = localStorage.getItem(API_CONFIG.STORAGE_KEYS.SEARCH_HISTORY);

    return {
      favorites: favorites ? JSON.parse(favorites) : [],
      searchHistory: searchHistory ? JSON.parse(searchHistory) : [],
    };
  } catch (error) {
    console.error('Error loading persisted state:', error);
    return {};
  }
}; 