'use client';

import { useState, useCallback, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieFilters } from '@/components/movie/MovieFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useGetFilteredMoviesQuery } from '@/store/api/moviesApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMostWatchedFilters, MovieFilterState } from '@/store/slices/filtersSlice';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { LoadingMore } from '@/components/ui/LoadingMore';
import { EmptyState } from '@/components/ui/EmptyState';
import { deduplicateMovies } from '@/utils/movieUtils';

interface FilteredMovieGridContainerProps {
  initialMovies: Movie[];
  showFavoriteButton?: boolean;
  className?: string;
  cardClassName?: string;
}

export function FilteredMovieGridContainer({ 
  initialMovies,
  showFavoriteButton = true,
  className = '',
  cardClassName = ''
}: FilteredMovieGridContainerProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters.mostWatched);
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>(initialMovies);

  const { data, isLoading, isFetching } = useGetFilteredMoviesQuery({
    page,
    year: filters.year || undefined,
    genre: filters.genre || undefined,
    minScore: filters.minScore > 0 ? filters.minScore : undefined,
  });

  const handleFilterChange = useCallback((newFilters: MovieFilterState) => {
    dispatch(setMostWatchedFilters(newFilters));
    setPage(1);
    setAllMovies([]);
  }, [dispatch]);

  const fetchNextPage = useCallback(() => {
    if (data && page < data.total_pages) {
      setPage(prev => prev + 1);
    }
  }, [data, page]);

  useEffect(() => {
    if (data?.results && !isLoading) {
      const updatedMovies = page === 1 
        ? data.results 
        : deduplicateMovies(allMovies, data.results);
      
      setAllMovies(updatedMovies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.results, isLoading, page]);

  useInfiniteScroll({
    hasNextPage: data ? page < data.total_pages : false,
    isFetching: isFetching,
    fetchNextPage,
  });

  if (isLoading && page === 1) {
    return <LoadingSpinner text="Loading movies..." />;
  }

  if (allMovies.length === 0 && !isLoading) {
    return (
      <>
        <div className="sticky top-0 bg-gray-900 py-4 z-10">
          <MovieFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <EmptyState
          icon="🎬"
          title="No movies found"
          description="No movies match your current filters. Try adjusting your search criteria."
        />
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 bg-gray-900 py-4 z-10">
        <MovieFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ${className}`}>
        {allMovies?.map((movie) => (
          <div key={movie.id} className={cardClassName}>
            <MovieCard 
              movie={movie} 
              showFavoriteButton={showFavoriteButton}
            />
          </div>
        ))}
      </div>

      <LoadingMore 
        isLoading={isFetching && page > 1} 
        hasMore={data ? page < data.total_pages : false}
        itemCount={allMovies.length}
        loadingText="Loading more movies..."
        noMoreText="No more movies to load"
      />
    </>
  );
} 