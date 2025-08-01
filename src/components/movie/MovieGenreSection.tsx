import { Genre } from '@/types/movie';
import { ScrollableMovieGrid } from './ScrollableMovieGrid';
import { getMoviesByGenre } from '@/tmdb/tmdb';

interface MovieGenreSectionProps {
  genre: Genre;
}

export async function MovieGenreSection({ genre }: MovieGenreSectionProps) {
  const response = await getMoviesByGenre(genre.id);
  const movies = response.results;

  return (
    <div className="mb-8">
      <ScrollableMovieGrid movies={movies} title={`Top ${genre.name} Movies`} />
    </div>
  );
} 