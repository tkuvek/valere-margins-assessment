/* eslint-disable @typescript-eslint/no-unused-vars */
interface EnvironmentConfig {
  TMDB_API_KEY: string;
  TMDB_BASE_URL: string;
  TMDB_API_ACCESS_TOKEN: string;
}

class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvironmentError';
  }
}

export const validateEnvironment = (): EnvironmentConfig => {
  const requiredVars = {
    TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    TMDB_BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    TMDB_API_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new EnvironmentError(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please check your .env.local file and ensure all TMDB API credentials are set.'
    );
  }

  const baseUrl = requiredVars.TMDB_BASE_URL;
  if (baseUrl && !baseUrl.startsWith('http')) {
    throw new EnvironmentError(
      'TMDB_BASE_URL must be a valid URL starting with http:// or https://'
    );
  }

  return requiredVars as EnvironmentConfig;
};

let envConfig: EnvironmentConfig;
try {
  envConfig = validateEnvironment();
} catch (error) {
  if (typeof window !== 'undefined') {
    console.error('Environment validation failed:', error);
  } else {
    console.error('Environment validation failed:', error);
  }
  
  envConfig = {
    TMDB_API_KEY: '',
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_API_ACCESS_TOKEN: '',
  };
}

export const env = envConfig; 