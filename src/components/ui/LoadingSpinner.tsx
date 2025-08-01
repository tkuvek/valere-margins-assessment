interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="text-gray-400 mt-2 text-sm">{text}</p>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar';
}

export function LoadingSkeleton({ className = '', variant = 'card' }: LoadingSkeletonProps) {
  const baseClasses = 'bg-gray-700 animate-pulse rounded';
  
  const variantClasses = {
    card: 'aspect-[2/3]',
    text: 'h-4',
    avatar: 'w-12 h-16'
  };

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
} 