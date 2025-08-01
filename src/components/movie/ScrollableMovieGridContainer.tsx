'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movie/MovieCard';
import { ScrollButtons } from '@/components/movie/ScrollButtons';
import { useScrollState } from '@/hooks/useScrollState';
import { API_CONFIG } from '@/constants/api';

interface ScrollableMovieGridContainerProps {
  movies: Movie[];
  title?: string;
  showFavoriteButton?: boolean;
  showScrollButtons?: boolean;
}

export function ScrollableMovieGridContainer({ 
  movies,
  title,
  showFavoriteButton = true,
  showScrollButtons = true
}: ScrollableMovieGridContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { containerRef, canScrollLeft, canScrollRight, scrollByAmount } = useScrollState();

  const scrollPrevious = () => {
    scrollByAmount(-API_CONFIG.SCROLL_THRESHOLD);
  };

  const scrollNext = () => {
    scrollByAmount(API_CONFIG.SCROLL_THRESHOLD);
  };

  return (
    <section className="mb-12">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      )}
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showScrollButtons && (
          <ScrollButtons
            onPrevious={scrollPrevious}
            onNext={scrollNext}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            isHovered={isHovered}
          />
        )}

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide select-none py-2"
        >
          {movies?.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-44 hover:z-10">
              <MovieCard 
                movie={movie} 
                showFavoriteButton={showFavoriteButton}
                priority={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 