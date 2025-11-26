import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavigationProps } from '../types';

const Navigation = ({ currentPath }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Writing', path: '/writing' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || currentPath === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-24 md:h-[96px]">
          {/* Logo/Brand - McKinsey style with Playfair Display */}
          <Link 
            to="/" 
            className="font-serif text-[28px] md:text-[32px] font-black text-navy tracking-tight hover:text-accent transition-all duration-300 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-sm px-2"
            aria-label="Portfolio home"
          >
            PORTFOLIO
          </Link>

          {/* Desktop Navigation - Clean, minimal with Inter font */}
          <div className="hidden md:flex items-center space-x-2" role="navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-sm font-semibold uppercase tracking-wider transition-all duration-300 min-h-[44px] flex items-center px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  isActive(link.path)
                    ? 'text-white bg-navy shadow-md'
                    : 'text-navy hover:text-accent hover:bg-navy-50'
                }`}
                style={{ letterSpacing: '0.1em' }}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-sm text-navy hover:text-accent hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-accent min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Professional dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white shadow-lg" role="navigation" aria-label="Mobile navigation menu">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-5 py-4 rounded-sm text-base font-semibold uppercase tracking-wider transition-all duration-300 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  isActive(link.path)
                    ? 'text-white bg-navy shadow-md'
                    : 'text-navy hover:text-accent hover:bg-navy-50'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
