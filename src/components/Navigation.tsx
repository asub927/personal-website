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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand - Minimum 44px touch target */}
          <Link 
            to="/" 
            className="text-xl sm:text-xl md:text-2xl font-bold text-text hover:text-text-secondary transition-colors min-h-[44px] flex items-center"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive(link.path)
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Minimum 44px touch target */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-md text-text-secondary hover:text-text hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-accent min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-primary">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  isActive(link.path)
                    ? 'text-accent bg-accent-50'
                    : 'text-text-secondary hover:text-text hover:bg-primary-100'
                }`}
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
