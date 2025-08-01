'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SearchComponent } from '@/components/search/SearchComponent';
import { FavoritesDropdown } from '@/components/favorites/FavoritesDropdown';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
            onClick={closeMenu}
          >
            🎬 CinemApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/most-watched" 
              className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 font-medium"
            >
              Most Watched
            </Link>
            
            <FavoritesDropdown />
            
            <div className="ml-4">
              <SearchComponent />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg 
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg 
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2 border border-gray-700">
            <Link 
              href="/most-watched" 
              className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenu}
            >
              Most Watched
            </Link>
            <Link 
              href="/favorites" 
              className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={closeMenu}
            >
              Favorites Page
            </Link>
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <SearchComponent />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
