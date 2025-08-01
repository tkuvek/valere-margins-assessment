'use client';

import { Movie } from '@/types/movie';
import { FilteredMovieGridContainer } from '@/components/movie/FilteredMovieGridContainer';
import { ScrollableMovieGridContainer } from '@/components/movie/ScrollableMovieGridContainer';
import { SimpleMovieGrid } from '@/components/movie/SimpleMovieGrid';

export type MovieGridMode = 'grid' | 'filtered' | 'scrollable';

interface MovieGridProps {
  movies?: Movie[];
  mode?: MovieGridMode;
  title?: string;
  showFavoriteButton?: boolean;
  className?: string;
  cardClassName?: string;
  initialMovies?: Movie[];
  showScrollButtons?: boolean;
}

export function MovieGrid({ 
  movies = [],
  mode = 'grid',
  title,
  showFavoriteButton = true,
  className = '',
  cardClassName = '',
  initialMovies = [],
  showScrollButtons = true
}: MovieGridProps) {
  if (mode === 'filtered') {
    return (
      <FilteredMovieGridContainer 
        initialMovies={initialMovies}
        showFavoriteButton={showFavoriteButton}
        className={className}
        cardClassName={cardClassName}
      />
    );
  }

  if (mode === 'scrollable') {
    return (
      <ScrollableMovieGridContainer 
        movies={movies}
        title={title}
        showFavoriteButton={showFavoriteButton}
        showScrollButtons={showScrollButtons}
      />
    );
  }

  return (
    <SimpleMovieGrid 
      movies={movies}
      showFavoriteButton={showFavoriteButton}
      className={className}
      cardClassName={cardClassName}
    />
  );
} 