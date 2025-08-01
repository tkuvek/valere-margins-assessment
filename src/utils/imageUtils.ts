import { TMDB_CONFIG, API_CONFIG } from '@/constants/api';

type ImageSize = keyof typeof API_CONFIG.IMAGE_SIZES;

const getPlaceholderDimensions = (size: ImageSize): string => {
  const sizeMap = {
    POSTER_SMALL: '92x138',    // w92 - typical poster ratio
    POSTER_MEDIUM: '185x278',  // w185 - typical poster ratio
    POSTER_LARGE: '500x750',   // w500 - typical poster ratio
    BACKDROP_SMALL: '780x439', // w780 - typical backdrop ratio
    BACKDROP_LARGE: '1280x720', // w1280 - typical backdrop ratio
  };
  
  return sizeMap[size] || '100x100';
};

export const buildImageUrl = (
  path: string | null, 
  size: ImageSize,
  fallback?: string
): string => {
  if (!path) {
    const placeholderDimensions = getPlaceholderDimensions(size);
    return fallback || `https://placehold.co/${placeholderDimensions}`;
  }
  
  return `${TMDB_CONFIG.BASE_IMAGE_URL}/${API_CONFIG.IMAGE_SIZES[size]}${path}`;
};

export const isPlaceholderUrl = (url: string): boolean => {
  return url.includes('placehold.co');
};

export const getImageProps = (url: string, alt: string, className?: string) => {
  const isPlaceholder = isPlaceholderUrl(url);
  
  return {
    src: url,
    alt,
    className,
    ...(isPlaceholder && { unoptimized: true })
  };
};

export const getPosterUrl = (
  posterPath: string | null, 
  size: 'small' | 'medium' | 'large' = 'medium'
): string => {
  const sizeMap = {
    small: 'POSTER_SMALL',
    medium: 'POSTER_MEDIUM', 
    large: 'POSTER_LARGE'
  } as const;
  
  return buildImageUrl(posterPath, sizeMap[size]);
};

export const getBackdropUrl = (
  backdropPath: string | null,
  size: 'small' | 'large' = 'large'
): string => {
  const sizeMap = {
    small: 'BACKDROP_SMALL',
    large: 'BACKDROP_LARGE'
  } as const;
  
  return buildImageUrl(backdropPath, sizeMap[size]);
};

export const getProfileUrl = (
  profilePath: string | null,
  size: 'small' | 'medium' = 'medium'
): string => {
  const sizeMap = {
    small: 'POSTER_SMALL',
    medium: 'POSTER_MEDIUM'
  } as const;
  
  return buildImageUrl(profilePath, sizeMap[size]);
};

export const getLogoUrl = (
  logoPath: string | null,
  size: 'small' | 'medium' = 'small'
): string => {
  const sizeMap = {
    small: 'POSTER_SMALL',
    medium: 'POSTER_MEDIUM'
  } as const;
  
  return buildImageUrl(logoPath, sizeMap[size]);
}; 