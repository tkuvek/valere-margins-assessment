'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { getMovieDetails } from '@/tmdb/tmdb';
import { setFavoriteMovies } from '@/store/slices/favoritesSlice';
import { useAppDispatch } from '@/store/hooks';

interface FavoriteButtonProps {
  movieId: number;
  className?: string;
}

export function FavoriteButton({ movieId, className = '' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const { isFavorite, addToFavorites, removeFromFavorites, isInitialized, favoriteMovies } = useFavorites();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(movieId)) {
      removeFromFavorites(movieId);
      dispatch(setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== movieId)));
    } else {
      addToFavorites(movieId);
      const movie = await getMovieDetails(movieId);
      dispatch(setFavoriteMovies([...favoriteMovies, movie]));
    }
  };

  const isMovieFavorited = isMounted && isInitialized && isFavorite(movieId);
  const isDisabled = !isMounted || !isInitialized;

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        isMovieFavorited
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      } ${className}`}
      aria-label={isMovieFavorited ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isDisabled}
    >
      <svg
        className="w-5 h-5"
        fill={isMovieFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
