import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToFavorites, removeFromFavorites, setFavoriteMovies } from '@/store/slices/favoritesSlice';
import { getMovieDetails } from '@/tmdb/tmdb';
import { MovieDetails } from '@/types/movie';

export function useFavorites() {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(state => state.favorites.favoriteIds);
  const favoriteMovies = useAppSelector(state => state.favorites.favoriteMovies);
  const isInitialized = useAppSelector(state => state.favorites.isInitialized);
  
  const fetchFavoriteMovies = async () => {
    if (favoriteIds.length === 0) {
      return;
    }

    try {
      const moviePromises = favoriteIds.map((id: number) => 
        getMovieDetails(id).catch(error => {
          console.error(`Failed to fetch movie ${id}:`, error);
          return null;
        })
      );
      
      const movies = await Promise.all(moviePromises);
      dispatch(setFavoriteMovies(movies.filter((movie): movie is MovieDetails => movie !== null)));
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
      throw error;
    }
  };
  
  return {
    favorites: favoriteIds,
    favoriteIds,
    addToFavorites: (movieId: number) => dispatch(addToFavorites(movieId)),
    removeFromFavorites: (movieId: number) => dispatch(removeFromFavorites(movieId)),
    isFavorite: (movieId: number) => favoriteIds.includes(movieId),
    isInitialized,
    favoriteMovies,
    fetchFavoriteMovies,
  };
} 