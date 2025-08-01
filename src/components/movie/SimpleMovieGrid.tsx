'use client';

import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movie/MovieCard';

interface SimpleMovieGridProps {
  movies: Movie[];
  showFavoriteButton?: boolean;
  className?: string;
  cardClassName?: string;
}

export function SimpleMovieGrid({ 
  movies,
  showFavoriteButton = true,
  className = '',
  cardClassName = ''
}: SimpleMovieGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ${className}`}>
      {movies?.map((movie) => (
        <div key={movie.id} className={cardClassName}>
          <MovieCard 
            movie={movie} 
            showFavoriteButton={showFavoriteButton}
          />
        </div>
      ))}
    </div>
  );
} 