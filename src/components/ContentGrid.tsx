import { ContentGridProps } from '../types';
import { ContentCard } from './ContentCard';

export const ContentGrid = ({ items }: ContentGridProps) => {
  const handleCardClick = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item?.link) {
      window.location.href = item.link;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onClick={handleCardClick} />
      ))}
    </div>
  );
};
