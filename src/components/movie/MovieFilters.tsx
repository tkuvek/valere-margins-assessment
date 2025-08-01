'use client';

import { useGetGenresQuery } from '@/store/api/moviesApi';
import type { MovieFilterState } from '@/store/slices/filtersSlice';

interface MovieFiltersProps {
  filters: MovieFilterState;
  onFilterChange: (filters: MovieFilterState) => void;
}

export function MovieFilters({ filters, onFilterChange }: MovieFiltersProps) {
  const { data: genresData } = useGetGenresQuery();
  const genres = genresData?.genres || [];

  const handleFilterChange = (newFilters: MovieFilterState) => {
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <select
        value={filters.year}
        onChange={(e) => handleFilterChange({...filters, year: e.target.value})}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        <option value="">All Years</option>
        {Array.from({length: 30}, (_, i) => 2024 - i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <select
        value={filters.genre}
        onChange={(e) => handleFilterChange({...filters, genre: e.target.value})}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg"
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={filters.minScore}
          onChange={(e) => handleFilterChange({...filters, minScore: parseFloat(e.target.value)})}
          className="accent-blue-500"
        />
        <span className="text-white min-w-fit">Min Score: {filters.minScore}</span>
      </div>
    </div>
  );
} 