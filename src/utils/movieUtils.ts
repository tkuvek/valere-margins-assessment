import { Movie } from '@/types/movie';

export function deduplicateMovies(existingMovies: Movie[], newMovies: Movie[]): Movie[] {
  const movieMap = new Map<number, Movie>();
  
  existingMovies.forEach(movie => {
    movieMap.set(movie.id, movie);
  });
  
  newMovies.forEach(movie => {
    movieMap.set(movie.id, movie);
  });
  
  return Array.from(movieMap.values());
} 