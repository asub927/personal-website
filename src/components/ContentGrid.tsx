import { ContentGridProps } from '../types';
import { ContentCard } from './ContentCard';
import { ContentSkeleton } from './ContentSkeleton';

export const ContentGrid = ({ items, isLoading = false }: ContentGridProps) => {
  const handleCardClick = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item?.link) {
      window.location.href = item.link;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {isLoading ? (
        // Show skeleton screens while loading
        Array.from({ length: 6 }).map((_, index) => (
          <ContentSkeleton key={`skeleton-${index}`} />
        ))
      ) : (
        // Show actual content when loaded
        items.map((item) => (
          <ContentCard key={item.id} item={item} onClick={handleCardClick} />
        ))
      )}
    </div>
  );
};
