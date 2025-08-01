import { getPopularMovies } from '@/tmdb/tmdb';
import { PageLayout } from '@/components/ui/PageLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilteredMovieGrid } from '@/components/movie/FilteredMovieGrid';

export default async function MostWatchedPage() {
  const mostWatchedMoviesResponse = await getPopularMovies();
  const mostWatchedMovies = mostWatchedMoviesResponse.results;

  return (
    <PageLayout>
      <PageHeader title="Most Watched Movies" />
      <FilteredMovieGrid initialMovies={mostWatchedMovies} />
    </PageLayout>
  );
}
