import { Suspense } from 'react';
import { getNewestMovies, getGenres, getWatchProviders, getMoviesByWatchProvider } from '@/tmdb/tmdb';
import { MovieGenreSection } from '@/components/movie/MovieGenreSection';
import { TopMoviesByProvider } from '@/components/movie/TopMoviesByProvider';
import { PageLayout } from '@/components/ui/PageLayout';
import { ScrollableMovieGrid } from '@/components/movie/ScrollableMovieGrid';

export default async function HomePage() {
  const [newestMoviesResponse, genres, watchProvidersResponse] = await Promise.all([
    getNewestMovies(),
    getGenres(),
    getWatchProviders()
  ]);

  const newestMovies = newestMoviesResponse.results;
  
  const topProviders = watchProvidersResponse.results.slice(0, 5);

  const providerMovies = await Promise.all(
    topProviders.map(provider => getMoviesByWatchProvider(provider.provider_id))
  );

  return (
    <PageLayout>
        <ScrollableMovieGrid movies={newestMovies} title='Newest Movies'/>

        <TopMoviesByProvider 
          providers={topProviders} 
          providerMovies={providerMovies.map(response => response.results)} 
        />

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular by Genre</h2>
          <Suspense fallback={<div className="text-white">Loading genres...</div>}>
            {genres.genres.slice(0, 6).map((genre) => (
              <MovieGenreSection key={genre.id} genre={genre} />
            ))}
          </Suspense>
        </section>
    </PageLayout>
  );
}
