'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/ui/PageLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { PageLoadingState } from '@/components/ui/PageLoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { MovieGrid } from '@/components/ui/MovieGrid';
import { BackToHomeButton } from '@/components/layout/BackToHomeButton';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesPage() {
  const { favoriteMovies, favoriteIds, isInitialized, fetchFavoriteMovies } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      if (favoriteIds.length === 0 || favoriteMovies.length > 0) {
        return;
      }

      setLoading(true);
      try {
        await fetchFavoriteMovies();
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
        setError('Failed to load favorite movies');
      } finally {
        setLoading(false);
      }
    };

    if (isInitialized && favoriteIds.length > 0 && favoriteMovies.length === 0) {
      loadFavoriteMovies();
    }
  }, [isInitialized, favoriteIds, favoriteMovies.length, fetchFavoriteMovies]);

  if (!isInitialized || loading) {
    return <PageLoadingState title="Favorite Movies" loadingText="Loading your favorites..." />;
  }

  if (favoriteIds.length === 0) {
    return (
      <PageLayout>
        <PageHeader title="Favorite Movies" />
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          description="Start exploring movies and add them to your favorites to see them here!"
          action={
            <Link href="/">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Discover Movies
              </button>
            </Link>
          }
        />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <PageHeader title="Favorite Movies" />
        <EmptyState
          icon="⚠️"
          title="Error loading favorites"
          description={error}
          action={
            <Link href="/">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Go Home
              </button>
            </Link>
          }
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader 
        title="Favorite Movies"
        description={`${favoriteMovies.length} movie${favoriteMovies.length === 1 ? '' : 's'} in your favorites`}
      />
      <MovieGrid movies={favoriteMovies} showFavoriteButton={true} />
      <BackToHomeButton />
    </PageLayout>
  );
}