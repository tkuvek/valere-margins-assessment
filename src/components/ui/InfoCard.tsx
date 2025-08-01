import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function InfoCard({ 
  title, 
  children, 
  className = '',
  titleClassName = ''
}: InfoCardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <h3 className={`text-xl font-bold text-white mb-4 ${titleClassName}`}>
        {title}
      </h3>
      <div className="space-y-3 text-gray-300">
        {children}
      </div>
    </div>
  );
} 