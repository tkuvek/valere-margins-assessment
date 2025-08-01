'use client';

import Link from 'next/link';

interface FavoritesHeaderProps {
  favoritesCount: number;
  isInitialized: boolean;
}

export function FavoritesHeader({ favoritesCount, isInitialized }: FavoritesHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-700">
      <h3 className="text-white font-semibold">Favorite Movies</h3>
      <p className="text-gray-400 text-sm">
        {isInitialized 
          ? `${favoritesCount} movie${favoritesCount !== 1 ? 's' : ''}`
          : 'Loading...'
        }
      </p>
    </div>
  );
}

export function LoadingFavoritesState() {
  return (
    <div className="p-4">
      <div className="text-center text-gray-400">Loading favorites...</div>
      {/* Loading skeleton */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 animate-pulse">
          <div className="w-12 h-16 bg-gray-700 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyFavoritesState() {
  return (
    <div className="p-8 text-center">
      <div className="text-gray-500 text-4xl mb-4">💔</div>
      <p className="text-gray-400 mb-2">No favorite movies yet</p>
      <p className="text-gray-500 text-sm">Start adding movies to your favorites!</p>
    </div>
  );
}



interface ViewAllFavoritesLinkProps {
  favoritesCount: number;
  onCloseDropdown: () => void;
}

export function ViewAllFavoritesLink({ favoritesCount, onCloseDropdown }: ViewAllFavoritesLinkProps) {
  return (
    <div className="border-t border-gray-700 p-3">
      <Link
        href="/favorites"
        onClick={onCloseDropdown}
        className="block w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
      >
        {favoritesCount > 8 
          ? `View all ${favoritesCount} favorites`
          : 'View Favorites Page'
        }
      </Link>
    </div>
  );
} 