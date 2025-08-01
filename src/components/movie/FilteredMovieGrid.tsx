'use client';

import { Movie } from '@/types/movie';
import { FilteredMovieGridContainer } from './FilteredMovieGridContainer';

interface FilteredMovieGridProps {
  initialMovies: Movie[];
  showFavoriteButton?: boolean;
  className?: string;
  cardClassName?: string;
}

export function FilteredMovieGrid({ 
  initialMovies,
  showFavoriteButton = true,
  className = '',
  cardClassName = ''
}: FilteredMovieGridProps) {
  return (
    <FilteredMovieGridContainer 
      initialMovies={initialMovies}
      showFavoriteButton={showFavoriteButton}
      className={className}
      cardClassName={cardClassName}
    />
  );
} 