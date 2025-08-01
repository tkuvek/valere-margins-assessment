'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { FavoriteButton } from '@/components/favorites/FavoriteButton';
import { getPosterUrl, getImageProps } from '@/utils/imageUtils';

interface MovieCardProps {
  movie: Movie;
  showFavoriteButton?: boolean;
  priority?: boolean;
}

export function MovieCard({ movie, showFavoriteButton = true, priority = false }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, 'medium');
  const imageProps = getImageProps(posterUrl, movie.title, 'object-cover');

  return (
    <div className="relative group">
      <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-200">
          <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
            <Image
              {...imageProps}
              fill
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              alt={movie.title}
            />
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-white truncate">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-300 ml-1">{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {showFavoriteButton && (
        <div className="absolute top-2 right-2">
          <FavoriteButton movieId={movie.id} />
        </div>
      )}
    </div>
  );
}
