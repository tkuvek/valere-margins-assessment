'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie } from '@/types/movie';
import { searchMovies } from '@/tmdb/tmdb';
import { LoadingSkeleton } from '@/components/ui/LoadingSpinner';
import { PageLayout } from '@/components/ui/PageLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { PageErrorState } from '@/components/ui/PageErrorState';
import { PageLoadingState } from '@/components/ui/PageLoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGrid } from '@/components/ui/MovieGrid';
import { LoadingMore } from '@/components/ui/LoadingMore';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');

  const fetchMovies = async (searchQuery: string, page: number, isNewSearch = false) => {
    if (isNewSearch) {
      setLoading(true);
      setLoadingMore(false);
    } else {
      setLoadingMore(true);
    }
    
    setError(null);

    try {
      const response = await searchMovies(searchQuery, page);
      
      if (isNewSearch) {
        setMovies(response.results);
        setCurrentPage(1);
      } else {
        setMovies(prev => {
          const movieMap = new Map<number, Movie>();
          
          prev.forEach(movie => {
            movieMap.set(movie.id, movie);
          });
          
          response.results.forEach(movie => {
            movieMap.set(movie.id, movie);
          });
          
          return Array.from(movieMap.values());
        });
      }
      
      setHasMore(page < response.total_pages);
      if (!isNewSearch) {
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to load search results. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      setError('Please enter a search term');
      setCurrentQuery('');
      return;
    }

    if (query !== currentQuery) {
      setCurrentQuery(query);
      fetchMovies(query, 1, true);
    }
  }, [query, currentQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loadingMore && 
        hasMore && 
        currentQuery && 
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000
      ) {
        fetchMovies(currentQuery, currentPage + 1, false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, currentQuery, currentPage]);

  if (!query.trim()) {
    return (
      <PageLayout>
        <EmptyState
          icon="🔍"
          title="Search Movies"
          description="Enter a search term to find movies"
        />
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLoadingState title={`Searching for "${query}"...`}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <LoadingSkeleton key={index} variant="card" />
            ))}
          </div>
      </PageLoadingState>
    );
  }

  if (error) {
    return <PageErrorState title={`Search Results for "${query}"`} error={error} />;
  }

  return (
    <PageLayout>
      <PageHeader 
        title={`Search Results for "${query}"`}
        description={movies.length > 0 ? `Found ${movies.length} movie${movies.length === 1 ? '' : 's'}` : 'No results found'}
      />

        {movies.length > 0 ? (
          <>
          <MovieGrid movies={movies} />
          <LoadingMore 
            isLoading={loadingMore} 
            hasMore={hasMore} 
            itemCount={movies.length}
            loadingText="Loading more results..."
            noMoreText="No more results to load"
          />
          </>
        ) : (
        <EmptyState
          icon="🎬"
          title="No movies found"
          description="Try searching with different keywords or check your spelling"
          action={
            <div className="space-y-2 text-gray-500 text-sm">
              <p>Suggestions:</p>
              <p>• Try more general terms</p>
              <p>• Check for typos</p>
              <p>• Use movie titles or actor names</p>
            </div>
          }
        />
        )}
    </PageLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<PageLoadingState title="Search" loadingText="Loading search..." />}>
      <SearchResults />
    </Suspense>
  );
} 