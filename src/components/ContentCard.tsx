import { useState } from 'react';
import { ContentCardProps } from '../types';

export const ContentCard = ({ item, onClick }: ContentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    onClick(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(item.id);
    }
  };

  return (
    <div
      className="group cursor-pointer rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[44px] bg-primary"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-primary-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 md:p-7">
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-3 py-1.5 text-xs sm:text-sm font-medium text-accent bg-accent-50 rounded">
            {item.category}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text mb-2 sm:mb-3 group-hover:text-accent transition-colors leading-tight">
          {item.title}
        </h3>
        <p className="text-base sm:text-base md:text-lg text-text-secondary line-clamp-3 leading-relaxed">
          {item.description}
        </p>
        <p className="text-sm sm:text-sm md:text-base text-text-tertiary mt-3 sm:mt-4">
          {new Date(item.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};
