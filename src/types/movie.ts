export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    adult: boolean;
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
  }
  
  export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    budget: number;
    revenue: number;
    production_countries: ProductionCountry[];
    production_companies: ProductionCompany[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface APIResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }

  export interface WatchProvider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
    display_priority: number;
    display_priorities: Record<string, number>;
  }

  export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }

  export interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }

  export interface MovieCredits {
    cast: CastMember[];
    crew: CrewMember[];
  }
  