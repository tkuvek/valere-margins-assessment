import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getMovieDetails, getMovieCredits } from '@/tmdb/tmdb';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { CastSection } from '@/components/movie/CastSection';
import { MovieHeroContent } from '@/components/movie/MovieHeroContent';
import { MovieDetailsSection } from '@/components/movie/MovieDetailsSection';
import { HeroSection } from '@/components/ui/HeroSection';
import { formatRuntime } from '@/utils/formatters';
import { getBackdropUrl, getPosterUrl } from '@/utils/imageUtils';
import { BackToHomeButton } from '@/components/layout/BackToHomeButton';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id);
  
  if (isNaN(movieId)) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.'
    };
  }

  try {
    const movie = await getMovieDetails(movieId);
    
    const posterUrl = movie.poster_path 
      ? getPosterUrl(movie.poster_path, 'large')
      : null;

    return {
      title: `${movie.title} (${movie.release_date?.split('-')[0]}) | Movie Details`,
      description: movie.overview || `Watch ${movie.title} and discover more about this movie.`,
      openGraph: {
        title: movie.title,
        description: movie.overview || `Watch ${movie.title}`,
        images: posterUrl ? [posterUrl] : [],
        type: 'video.movie',
      },
      twitter: {
        card: 'summary_large_image',
        title: movie.title,
        description: movie.overview || `Watch ${movie.title}`,
        images: posterUrl ? [posterUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Movie Not Found',
      description: `The requested movie could not be found. Error: ${error}`
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);
  
  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const [movie, credits] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId).catch(() => ({ cast: [], crew: [] }))
    ]);
    
    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const posterUrl = getPosterUrl(movie.poster_path);



    return (
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <HeroSection 
          backdropUrl={backdropUrl}
          backdropAlt={movie.title}
          height="lg"
        >
          <MovieHeroContent
            posterUrl={posterUrl}
            title={movie.title}
            tagline={movie.tagline}
            voteAverage={movie.vote_average}
            releaseYear={movie.release_date?.split('-')[0]}
            runtime={formatRuntime(movie.runtime)}
            rating={movie.adult ? 'R' : 'PG-13'}
            genres={movie.genres}
            overview={movie.overview}
            actions={<FavoriteButton movieId={movie.id} />}
          />
        </HeroSection>

        {/* Cast Section */}
        <div className="container mx-auto px-6 py-8">
          <CastSection cast={credits.cast} />
        </div>

        {/* Movie Details Section */}
        <MovieDetailsSection
          budget={movie.budget}
          revenue={movie.revenue}
          status={movie.status}
          originalLanguage={movie.original_language}
          productionCompanies={movie.production_companies}
          productionCountries={movie.production_countries}
          spokenLanguages={movie.spoken_languages}
          voteCount={movie.vote_count}
          popularity={movie.popularity}
        />

        <BackToHomeButton />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    notFound();
  }
} 