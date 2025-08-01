'use client';

import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { initializeFavorites } from './slices/favoritesSlice';
import { initializeSearchHistory } from './slices/searchSlice';
import { loadPersistedState } from './middleware/persistenceMiddleware';

export function InitializeStore() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { favorites, searchHistory } = loadPersistedState();
    dispatch(initializeFavorites(favorites));
    dispatch(initializeSearchHistory(searchHistory));
  }, [dispatch]);

  return null;
} 