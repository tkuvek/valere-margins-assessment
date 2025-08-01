import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-900 ${className}`}>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 