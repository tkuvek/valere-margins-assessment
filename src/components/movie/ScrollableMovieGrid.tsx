'use client';

import { Movie } from '@/types/movie';
import { ScrollableMovieGridContainer } from './ScrollableMovieGridContainer';

interface ScrollableMovieGridProps {
  movies: Movie[];
  title: string;
  showFavoriteButton?: boolean;
  showScrollButtons?: boolean;
}

export function ScrollableMovieGrid({ 
  movies, 
  title,
  showFavoriteButton = true,
  showScrollButtons = true
}: ScrollableMovieGridProps) {
  return (
    <ScrollableMovieGridContainer 
      movies={movies}
      title={title}
      showFavoriteButton={showFavoriteButton}
      showScrollButtons={showScrollButtons}
    />
  );
} 