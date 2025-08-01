'use client';

interface FavoritesButtonProps {
  onClick: () => void;
  isOpen: boolean;
  favoritesCount: number;
  isInitialized: boolean;
}

export function FavoritesButton({ 
  onClick, 
  isOpen, 
  favoritesCount, 
  isInitialized 
}: FavoritesButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 font-medium"
      aria-label="Favorites"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="hidden sm:inline">Favorites</span>
      {isInitialized && favoritesCount > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
          {favoritesCount}
        </span>
      )}
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
} 