'use client';

import { useState } from 'react';
import { Movie, WatchProvider } from '@/types/movie';
import { ScrollButtons } from './ScrollButtons';
import { ProviderTopMovies } from './ProviderTopMovies';
import { useScrollState } from '@/hooks/useScrollState';

interface TopMoviesByProviderProps {
  providers: WatchProvider[];
  providerMovies: Movie[][];
}

export function TopMoviesByProvider({ providers, providerMovies }: TopMoviesByProviderProps) {
  const { containerRef, canScrollLeft, canScrollRight, scrollByAmount } = useScrollState();
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrevious = () => {
    scrollByAmount(-400);
  };

  const scrollNext = () => {
    scrollByAmount(400);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Top Movies by Platform</h2>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ScrollButtons
          onPrevious={scrollPrevious}
          onNext={scrollNext}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          isHovered={isHovered}
          isProviders={true}
        />

        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide select-none"
        >
          {providers.map((provider, providerIndex) => {
            const movies = providerMovies[providerIndex] || [];
            
            return (
              <ProviderTopMovies
                key={provider.provider_id}
                provider={provider}
                movies={movies}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
} 