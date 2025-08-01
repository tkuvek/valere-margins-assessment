import { ReactNode } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { getImageProps } from '@/utils/imageUtils';

interface MovieHeroContentProps {
  posterUrl: string;
  title: string;
  tagline?: string;
  voteAverage: number;
  releaseYear?: string;
  runtime?: string;
  rating?: string;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  actions?: ReactNode;
  posterClassName?: string;
  contentClassName?: string;
}

export function MovieHeroContent({
  posterUrl,
  title,
  tagline,
  voteAverage,
  releaseYear,
  runtime,
  rating,
  genres,
  overview,
  actions,
  posterClassName = '',
  contentClassName = ''
}: MovieHeroContentProps) {
  const imageProps = getImageProps(posterUrl, title, 'object-cover');

  return (
    <div className={`flex flex-col md:flex-row gap-6 md:gap-12 ${contentClassName}`}>
      {/* Poster */}
      <div className={`flex-shrink-0 w-48 md:w-64 ${posterClassName}`}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
          <Image
            {...imageProps}
            fill
            alt={title}
            sizes="(max-width: 768px) 192px, 256px"
          />
        </div>
      </div>

      {/* Movie Details */}
      <div className="flex-1 text-white">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
          {actions}
        </div>
        
        {tagline && (
          <p className="text-lg md:text-xl text-gray-300 italic mb-4">{tagline}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm md:text-base">
          <Badge variant="warning" size="md">
            ★ {voteAverage.toFixed(1)}
          </Badge>
          {releaseYear && <span>{releaseYear}</span>}
          {runtime && <span>{runtime}</span>}
          {rating && (
            <span className="border border-gray-400 px-2 py-1 rounded text-xs">
              {rating}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {genres.map((genre) => (
            <Badge key={genre.id} variant="default" size="md">
              {genre.name}
            </Badge>
          ))}
        </div>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
          {overview}
        </p>
      </div>
    </div>
  );
} 