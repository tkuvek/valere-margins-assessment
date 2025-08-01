# Valere Margins Assessment - Movie Discovery App

A modern movie discovery application built with Next.js 15, React 19, Redux Toolkit, and Tailwind CSS. This app allows users to browse movies, search for specific titles, view detailed movie information, and manage their favorite movies.

## Features

- 🎬 Browse popular and trending movies
- 🔍 Search movies by title
- 📱 Responsive design optimized for all devices
- ❤️ Add/remove movies to/from favorites
- 🎭 View detailed movie information including cast
- 📊 Most watched movies by streaming provider
- 🎨 Modern UI with Tailwind CSS
- ⚡ Optimized performance with Next.js 15

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Docker** and **Docker Compose** (for Docker setup)

## TMDB API Setup

This application uses The Movie Database (TMDB) API. You'll need to obtain API credentials:

1. Create an account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Go to your account settings and navigate to the API section
3. Generate an API key and access token
4. Copy these credentials for use in the environment setup

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd valere-margins-assessment
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Configuration

Copy the example environment file and configure it with your TMDB API credentials:

```bash
cp env.example .env.local
```

**Important**: You must edit `.env.local` and replace the placeholder values with your actual TMDB API credentials:

```env
# TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN=your_actual_access_token_here

# Next.js Configuration
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

⚠️ **Note**: The application will not work without valid TMDB API credentials. Make sure to replace `your_actual_api_key_here` and `your_actual_access_token_here` with your real credentials from TMDB.

### 4. Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 5. Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Docker Setup

### 1. Environment Configuration

Copy the example environment file and configure it with your TMDB API credentials:

```bash
cp env.example .env.local
```

**Important**: Edit `.env.local` and replace the placeholder values with your actual TMDB API credentials (same as described in the local setup section above). The Docker containers will not work without valid TMDB credentials.

### 2. Development with Docker

Run the development environment:

```bash
docker-compose up

```

This will:
- Build the development image
- Mount your source code for hot reloading
- Start the app on port 3000
- Enable file watching for automatic updates

### 3. Docker Management Commands

```bash
# Stop all containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

```

## Project Structure

```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx           # Home page
│   ├── search/            # Search functionality
│   ├── movie/[id]/        # Movie details
│   ├── favorites/         # Favorites page
│   └── most-watched/      # Most watched page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── movie/            # Movie-related components
│   ├── search/           # Search components
│   ├── favorites/        # Favorites components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── store/                # Redux store configuration
│   ├── slices/           # Redux slices
│   └── api/              # RTK Query API definitions
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
└── constants/            # Application constants
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **React**: React 19
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit with RTK Query
- **Language**: TypeScript
- **API**: The Movie Database (TMDB) REST API
- **Containerization**: Docker

## Architecture Decisions

- **Container/Presentational Pattern**: Clear separation between data-fetching containers and UI components
- **Custom Hooks**: Reusable logic abstracted into custom hooks (`useFavorites`, `useDebounce`, etc.)
- **Redux Toolkit**: Simplified Redux setup with RTK Query for efficient API caching
- **Component Hierarchy**: Following React's recommended component hierarchy approach
- **Performance**: Optimized with Next.js image optimization, caching headers, and bundle optimization

## Troubleshooting

### Common Issues

1. **TMDB API Issues**: Ensure your API key and access token are correct in `.env.local`
2. **Port Conflicts**: If port 3000 is in use, Docker will fail to start. Stop other services using port 3000
3. **File Watching Issues**: On Windows, if hot reloading doesn't work, the Docker setup includes polling fallbacks

## License

This project is for assessment purposes.
