import Image from 'next/image';
import { CastMember } from '@/types/movie';
import { getProfileUrl } from '@/utils/imageUtils';
import { LoadingSkeleton } from '@/components/ui/LoadingSpinner';

interface CastSectionProps {
  cast: CastMember[];
  loading?: boolean;
  maxDisplay?: number;
}

export function CastSection({ cast, loading = false, maxDisplay = 10 }: CastSectionProps) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-24">
              <LoadingSkeleton variant="avatar" className="w-24 h-32 mb-2" />
              <LoadingSkeleton variant="text" className="mb-1" />
              <LoadingSkeleton variant="text" className="w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cast || cast.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
        <p className="text-gray-400">Cast information not available</p>
      </div>
    );
  }

  const displayedCast = cast.slice(0, maxDisplay);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">Cast</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {displayedCast.map((member) => (
          <div key={member.id} className="flex-shrink-0 w-24 text-center">
            <div className="relative w-24 h-32 mb-2 rounded-lg overflow-hidden">
              <Image
                src={getProfileUrl(member.profile_path, 'small')}
                alt={member.name}
                width={96}
                height={128}
                className="w-24 h-32 object-cover"
                sizes="96px"
              />
            </div>
            <p className="text-white font-medium text-sm truncate" title={member.name}>
              {member.name}
            </p>
            <p className="text-gray-400 text-xs truncate" title={member.character}>
              {member.character}
            </p>
          </div>
        ))}
        
        {cast.length > maxDisplay && (
          <div className="flex-shrink-0 w-24 text-center flex items-center justify-center">
            <div className="text-gray-400 text-sm">
              +{cast.length - maxDisplay} more
            </div>
          </div>
        )}
      </div>
      
      {cast.length > maxDisplay && (
        <p className="text-gray-500 text-xs mt-2 text-center">
          Showing {maxDisplay} of {cast.length} cast members
        </p>
      )}
    </div>
  );
} 