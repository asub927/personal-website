import { useState, useEffect, useRef } from 'react';
import { ContentCardProps } from '../types';

export const ContentCard = ({ item, onClick }: ContentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    onClick(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item.id);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true); // Show placeholder on error
  };

  return (
    <article
      className="group cursor-pointer rounded-lg border border-border overflow-hidden transition-all duration-300 hover:border-border-dark hover:shadow-lg hover:scale-[1.02] min-h-[44px] bg-white"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="listitem"
      tabIndex={0}
      aria-label={`View ${item.title} - ${item.category}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <img
          ref={imgRef}
          src={isVisible ? item.thumbnailUrl : undefined}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-500 ease-out grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="mb-3">
          <span className="inline-block px-3 py-1.5 text-xs font-semibold text-accent bg-accent-50 rounded uppercase tracking-wide" aria-label={`Category: ${item.category}`}>
            {item.category}
          </span>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-navy mb-4 group-hover:text-accent transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="font-sans text-base text-text-secondary line-clamp-3 leading-comfortable mb-4">
          {item.description}
        </p>
        <time className="font-sans text-sm text-text-tertiary block" dateTime={item.publishedDate}>
          {new Date(item.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </article>
  );
};
