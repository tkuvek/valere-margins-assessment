interface PageErrorStateProps {
  title: string;
  error: string;
  onRetry?: () => void;
  retryText?: string;
}

export function PageErrorState({ 
  title, 
  error, 
  onRetry = () => window.location.reload(),
  retryText = "Try Again"
}: PageErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
        <div className="text-center py-16">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {retryText}
          </button>
        </div>
      </main>
    </div>
  );
} 