'use client';

import { useState, useRef, useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritesButton } from './FavoritesButton';
import { FavoriteMovieItem } from './FavoriteMovieItem';
import { 
  FavoritesHeader, 
  LoadingFavoritesState, 
  EmptyFavoritesState, 
  ViewAllFavoritesLink 
} from './FavoritesDropdownStates';


export function FavoritesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { favorites, removeFromFavorites, isInitialized, favoriteMovies, fetchFavoriteMovies } = useFavorites();

  useEffect(() => {
    setIsMounted(true);
  }, []);  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      if (favoriteMovies.length === favorites.length && favoriteMovies.length > 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await fetchFavoriteMovies();
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted && isInitialized && favorites.length > 0 && favoriteMovies.length === 0) {
      loadFavoriteMovies();
    }
  }, [isMounted, isInitialized, favorites, favoriteMovies, fetchFavoriteMovies, isOpen]);

  const handleRemoveFavorite = (movieId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    removeFromFavorites(movieId);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Favorites Button */}
      <FavoritesButton
        onClick={toggleDropdown}
        isOpen={isOpen}
        favoritesCount={favorites.length}
        isInitialized={isMounted && isInitialized}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50 max-h-[32rem] overflow-hidden">
          <FavoritesHeader 
            favoritesCount={favorites.length}
            isInitialized={isMounted && isInitialized}
          />

          <div className="max-h-80 overflow-y-auto scrollbar-hide">
            {!isMounted || !isInitialized || loading ? (
              <LoadingFavoritesState />
            ) : favorites.length === 0 ? (
              <EmptyFavoritesState />
            ) : (
              <div className="py-2">
                {favoriteMovies.map((movie) => (
                  <FavoriteMovieItem
                    key={movie.id}
                    movie={movie}
                    onRemove={handleRemoveFavorite}
                    onCloseDropdown={closeDropdown}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {isMounted && isInitialized && favorites.length > 0 && (
            <ViewAllFavoritesLink 
              favoritesCount={favorites.length}
              onCloseDropdown={closeDropdown}
            />
          )}
        </div>
      )}
    </div>
  );
} 