import { TMDB_CONFIG } from '@/constants/api';
import { Movie, MovieDetails, APIResponse, Genre, WatchProvider, MovieCredits } from '@/types/movie';
import { env } from '@/utils/envValidation';

const { TMDB_API_KEY: API_KEY, TMDB_BASE_URL: BASE_URL, TMDB_API_ACCESS_TOKEN: API_ACCESS_TOKEN } = env;

async function fetchFromTMDB<T>(endpoint: string, withApiKey: boolean = true): Promise<T> {
  if (!API_KEY || !API_ACCESS_TOKEN) {
    console.warn('TMDB API credentials not configured. Returning mock data.');
    return {} as T;
  }

  const url = `${BASE_URL}${endpoint}${withApiKey ? `?api_key=${API_KEY}` : ''}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_ACCESS_TOKEN}`
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getNewestMovies(): Promise<APIResponse<Movie>> {
  return fetchFromTMDB(`/movie/now_playing?sort_by=popularity.desc`);
}

export async function getPopularMovies(page: number = 1): Promise<APIResponse<Movie>> {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB(`/genre/movie/list`);
}

export async function getWatchProviders(): Promise<APIResponse<WatchProvider>> {
  return fetchFromTMDB(`/watch/providers/movie?watch_region=${TMDB_CONFIG.REGION}`, false);
}

export async function getMoviesByWatchProvider(providerId: number): Promise<APIResponse<Movie>> {
  return fetchFromTMDB(`/discover/movie?sort_by=popularity.desc&with_watch_providers=${providerId}&watch_region=${TMDB_CONFIG.REGION}`, false);
}

export async function getMoviesByGenre(genreId: number): Promise<APIResponse<Movie>> {
  return fetchFromTMDB(`/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`);
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<MovieCredits> {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export async function searchMovies(query: string, page: number = 1): Promise<APIResponse<Movie>> {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
} 