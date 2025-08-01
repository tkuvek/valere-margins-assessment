'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { getPosterUrl } from '@/utils/imageUtils';

interface FavoriteMovieItemProps {
  movie: Movie;
  onRemove: (movieId: number, event: React.MouseEvent) => void;
  onCloseDropdown: () => void;
}

export function FavoriteMovieItem({ 
  movie, 
  onRemove, 
  onCloseDropdown 
}: FavoriteMovieItemProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      onClick={onCloseDropdown}
      className="flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors group"
    >
      {/* Movie Poster */}
      <div className="flex-shrink-0 w-12 h-16 relative rounded overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={getPosterUrl(movie.poster_path, 'small')}
            alt={movie.title}
            width={32}
            height={48}
            className="w-8 h-12 object-cover rounded"
            sizes="32px"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 text-xs">🎬</span>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h4>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>{movie.release_date?.split('-')[0]}</span>
          <span>•</span>
          <span className="flex items-center">
            <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => onRemove(movie.id, e)}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Remove from favorites"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </Link>
  );
} 