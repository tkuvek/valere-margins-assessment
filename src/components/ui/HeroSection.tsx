import { ReactNode } from 'react';
import Image from 'next/image';
import { getImageProps } from '@/utils/imageUtils';

interface HeroSectionProps {
  backdropUrl?: string;
  backdropAlt?: string;
  children: ReactNode;
  className?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

const heightClasses = {
  sm: 'h-64',
  md: 'h-96',
  lg: 'h-[70vh]',
  xl: 'h-screen'
};

export function HeroSection({ 
  backdropUrl, 
  backdropAlt = '', 
  children, 
  className = '',
  height = 'md'
}: HeroSectionProps) {
  const imageProps = backdropUrl ? getImageProps(backdropUrl, backdropAlt, 'object-cover') : null;

  return (
    <div className={`relative ${heightClasses[height]} ${className}`}>
      {backdropUrl && imageProps && (
        <Image
          {...imageProps}
          fill
          priority
          alt={backdropAlt}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="container mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 