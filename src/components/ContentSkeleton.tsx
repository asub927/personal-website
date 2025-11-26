export const ContentSkeleton = () => {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-primary animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-primary-100"></div>

      {/* Content Skeleton */}
      <div className="p-5 sm:p-6 md:p-7">
        {/* Category Badge Skeleton */}
        <div className="mb-2 sm:mb-3">
          <div className="inline-block w-20 h-6 bg-primary-100 rounded"></div>
        </div>
        
        {/* Title Skeleton */}
        <div className="mb-2 sm:mb-3 space-y-2">
          <div className="h-6 bg-primary-100 rounded w-3/4"></div>
          <div className="h-6 bg-primary-100 rounded w-1/2"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-3 sm:mb-4">
          <div className="h-4 bg-primary-100 rounded w-full"></div>
          <div className="h-4 bg-primary-100 rounded w-full"></div>
          <div className="h-4 bg-primary-100 rounded w-2/3"></div>
        </div>
        
        {/* Date Skeleton */}
        <div className="h-4 bg-primary-100 rounded w-32"></div>
      </div>
    </div>
  );
};
