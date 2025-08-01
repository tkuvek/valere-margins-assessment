import { useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  fetchNextPage,
  threshold = 1000,
}: UseInfiniteScrollProps) {
  const handleScroll = useCallback(() => {
    if (
      !isFetching && 
      hasNextPage && 
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - threshold
    ) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}