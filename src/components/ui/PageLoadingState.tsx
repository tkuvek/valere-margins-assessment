import { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface PageLoadingStateProps {
  title: string;
  loadingText?: string;
  className?: string;
  children?: ReactNode;
}

export function PageLoadingState({ 
  title, 
  loadingText = "Loading...",
  className = '',
  children
}: PageLoadingStateProps) {
  return (
    <div className={`min-h-screen bg-gray-900 ${className}`}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
        {children ? (
          children
        ) : (
          <div className="flex justify-center py-16">
            <LoadingSpinner text={loadingText} />
          </div>
        )}
      </main>
    </div>
  );
} 