interface ScrollButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  isHovered: boolean;
  isProviders?: boolean;
}

export function ScrollButtons({ onPrevious, onNext, canScrollLeft, canScrollRight, isHovered, isProviders }: ScrollButtonsProps) {
  return (
    <>
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={onPrevious}
          className={`absolute left-0 ${isProviders ? 'top-0' : 'top-2'} bottom-4 w-16 z-12 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Previous movies"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={onNext}
          className={`absolute right-0 ${isProviders ? 'top-0' : 'top-2'} bottom-4 w-16 z-12 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Next movies"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </>
  );
} 