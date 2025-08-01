'use client';

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLazySearchMoviesQuery } from '@/store/api/moviesApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  setQuery, 
  setIsOpen, 
  incrementSelectedIndex, 
  decrementSelectedIndex,
  addRecentSearch,
} from '@/store/slices/searchSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { getPosterUrl, getImageProps } from '@/utils/imageUtils';
import { API_CONFIG } from '@/constants/api';

export function SearchComponent() {
  const dispatch = useAppDispatch();
  const { query, isOpen, selectedIndex } = useAppSelector(state => state.search);
  
  const debouncedQuery = useDebounce(query, API_CONFIG.DEBOUNCE_DELAY);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [searchMovies, { data: searchData, isLoading, error }] = useLazySearchMoviesQuery();
  
  const results = useMemo(() => {
    return searchData?.results?.slice(0, 8) || [];
  }, [searchData?.results]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleBlur = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      dispatch(setIsOpen(false));
      timeoutRef.current = null;
    }, 200);
  }, [dispatch]);

  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      searchMovies({ query: debouncedQuery });
      dispatch(setIsOpen(true));
    } else {
      dispatch(setIsOpen(false));
    }
  }, [debouncedQuery, searchMovies, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        dispatch(incrementSelectedIndex(results.length));
        break;
      case 'ArrowUp':
        e.preventDefault();
        dispatch(decrementSelectedIndex());
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          dispatch(addRecentSearch(query));
          router.push(`/movie/${results[selectedIndex].id}`);
        } else {
          dispatch(addRecentSearch(query));
          router.push(`/search?q=${encodeURIComponent(query)}`);
        }
        dispatch(setIsOpen(false));
        inputRef.current?.blur();
        break;
      case 'Escape':
        dispatch(setIsOpen(false));
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length > 2 && dispatch(setIsOpen(true))}
        onBlur={handleBlur}
        placeholder="Search movies..."
        className="w-64 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-400 text-sm">
              Search failed. Please try again.
            </div>
          ) : results.length > 0 ? (
            results.map((movie, index) => {
              const imageProps = getImageProps(getPosterUrl(movie.poster_path, 'small'), movie.title, 'w-8 h-12 object-cover rounded');

              return (
                <div
                  key={movie.id}
                  className={`p-3 cursor-pointer hover:bg-gray-700 ${
                    index === selectedIndex ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => {
                    dispatch(addRecentSearch(query));
                    router.push(`/movie/${movie.id}`);
                    dispatch(setIsOpen(false));
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {imageProps && (
                      <Image
                        {...imageProps}
                        width={32}
                        height={48}
                        sizes="32px"
                        alt={movie.title || ''}
                      />
                    )}
                    <div>
                      <div className="text-white font-medium">{movie.title}</div>
                      <div className="text-gray-400 text-sm">
                        {movie.release_date?.split('-')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
