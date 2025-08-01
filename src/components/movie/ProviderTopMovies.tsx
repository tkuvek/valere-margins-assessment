'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { getPosterUrl, getImageProps } from '@/utils/imageUtils';

interface ProviderTopMoviesProps {
  provider: { provider_name: string; logo_path?: string | null };
  movies: Movie[];
}

export function ProviderTopMovies({ provider, movies }: ProviderTopMoviesProps) {
  const topMovies = movies.slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Provider Header */}
      <div className="flex items-center mb-6">
        {provider.logo_path && (
          <div className="w-12 h-12 mr-4">
            <Image
              {...getImageProps(getPosterUrl(provider.logo_path, 'small'), provider.provider_name, 'w-12 h-12 object-contain')}
              width={48}
              height={48}
              sizes="48px"
              alt={provider.provider_name}
            />
          </div>
        )}
        <h3 className="text-xl font-bold text-white">{provider.provider_name}</h3>
      </div>

      {/* Top 3 Movies List */}
      <div className="space-y-4">
        {topMovies.map((movie, index) => {
          const imageProps = getImageProps(getPosterUrl(movie.poster_path, 'small'), movie.title, 'w-16 h-24 object-cover rounded transition-transform group-hover:scale-105');
          
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="flex items-center group cursor-pointer">
                {/* Ranking Number */}
                <div className="text-6xl font-bold text-gray-700 mr-4 min-w-[3rem]">
                  {index + 1}
                </div>

                {/* Movie Poster */}
                <div className="relative w-16 h-24 mr-4 mt-1 flex-shrink-0">
                  <Image
                    {...imageProps}
                    width={64}
                    height={96}
                    sizes="64px"
                    alt={movie.title}
                  />
                </div>

                {/* Movie Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-lg group-hover:text-gray-300 transition-colors truncate">
                    {movie.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    ({movie.release_date?.split('-')[0] || 'N/A'})
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-gray-300 ml-1 text-sm">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 