import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, MovieDetails, APIResponse, Genre, WatchProvider, MovieCredits } from '@/types/movie';
import { env } from '@/utils/envValidation';
import { TMDB_CONFIG } from '@/constants/api';

const { TMDB_API_KEY: API_KEY, TMDB_BASE_URL: BASE_URL, TMDB_API_ACCESS_TOKEN: API_ACCESS_TOKEN } = env;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${API_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Movie', 'Movies', 'Genres', 'Providers'],
  endpoints: (builder) => ({
    getNewestMovies: builder.query<APIResponse<Movie>, void>({
      query: () => `/movie/now_playing?sort_by=popularity.desc&api_key=${API_KEY}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),

    getPopularMovies: builder.query<APIResponse<Movie>, number>({
      query: (page = 1) => `/movie/popular?page=${page}&api_key=${API_KEY}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),

    getTopRatedMovies: builder.query<APIResponse<Movie>, void>({
      query: () => `/movie/top_rated?api_key=${API_KEY}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),

    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`,
      providesTags: (result, error, id) => [{ type: 'Movie', id }],
      keepUnusedDataFor: 600,
    }),

    getMovieCredits: builder.query<MovieCredits, number>({
      query: (id) => `/movie/${id}/credits?api_key=${API_KEY}`,
      providesTags: (result, error, id) => [{ type: 'Movie', id }],
      keepUnusedDataFor: 600,
    }),

    searchMovies: builder.query<APIResponse<Movie>, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => 
        `/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${API_KEY}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 60,
    }),

    getMoviesByGenre: builder.query<APIResponse<Movie>, number>({
      query: (genreId) => 
        `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}&api_key=${API_KEY}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),

    getGenres: builder.query<{ genres: Genre[] }, void>({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
      providesTags: ['Genres'],
      keepUnusedDataFor: 3600,
    }),

    getWatchProviders: builder.query<APIResponse<WatchProvider>, void>({
      query: () => `/watch/providers/movie?watch_region=${TMDB_CONFIG.REGION}`,
      providesTags: ['Providers'],
      keepUnusedDataFor: 3600,
    }),

    getMoviesByWatchProvider: builder.query<APIResponse<Movie>, number>({
      query: (providerId) => 
        `/discover/movie?sort_by=popularity.desc&with_watch_providers=${providerId}&watch_region=${TMDB_CONFIG.REGION}`,
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),

    getFilteredMovies: builder.query<
      APIResponse<Movie>, 
      { 
        page?: number; 
        year?: string; 
        genre?: string; 
        minScore?: number; 
      }
    >({
      query: ({ page = 1, year, genre, minScore }) => {
        let endpoint = `/movie/popular?page=${page}&api_key=${API_KEY}`;
        
        if (year) {
          endpoint = `/discover/movie?page=${page}&primary_release_year=${year}&api_key=${API_KEY}`;
        }
        
        if (genre) {
          endpoint = endpoint.includes('discover') 
            ? endpoint + `&with_genres=${genre}`
            : `/discover/movie?page=${page}&with_genres=${genre}&api_key=${API_KEY}`;
        }
        
        if (minScore && minScore > 0) {
          endpoint = endpoint.includes('discover')
            ? endpoint + `&vote_average.gte=${minScore}`
            : `/discover/movie?page=${page}&vote_average.gte=${minScore}&api_key=${API_KEY}`;
        }
        
        return endpoint;
      },
      providesTags: ['Movies'],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useGetGenresQuery,
  useGetFilteredMoviesQuery,
  useLazySearchMoviesQuery,
  useLazyGetFilteredMoviesQuery,
} = moviesApi; 