interface LoadingMoreProps {
  isLoading: boolean;
  hasMore: boolean;
  itemCount: number;
  loadingText?: string;
  noMoreText?: string;
}

export function LoadingMore({ 
  isLoading, 
  hasMore, 
  itemCount,
  loadingText = "Loading more...",
  noMoreText = "No more items to load"
}: LoadingMoreProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-white">{loadingText}</div>
      </div>
    );
  }

  if (!hasMore && itemCount > 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        {noMoreText}
      </div>
    );
  }

  return null;
} 