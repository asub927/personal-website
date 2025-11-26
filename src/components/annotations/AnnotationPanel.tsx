import { AnnotationPanelProps } from '../../types';

export const AnnotationPanel = ({ 
  title, 
  content, 
  metadata, 
  annotationId,
  isMobile = false 
}: AnnotationPanelProps) => {
  return (
    <div className={`annotation-panel ${
      isMobile 
        ? 'bg-white border-t border-border pt-4' 
        : 'bg-navy-50 border-l-4 border-accent rounded-sm p-5 shadow-sm'
    } transition-all duration-300 ease-in-out overflow-hidden`}>
      {/* Title - Hide on mobile if already shown in button */}
      {title && !isMobile && (
        <h4 
          id={`annotation-title-${annotationId}`}
          className="text-base sm:text-lg font-bold text-navy mb-3 tracking-tight"
        >
          {title}
        </h4>
      )}

      {/* Content - Professional serif font for readability */}
      <div className="text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-wrap font-serif">
        {content}
      </div>

      {/* Metadata - Clean, structured */}
      {metadata && (
        <div className={`${isMobile ? 'mt-4 pt-4' : 'mt-4 pt-4'} border-t border-border`}>
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-text-tertiary">
            {metadata.type && (
              <span className="inline-flex items-center px-3 py-1.5 bg-accent-50 text-accent rounded-sm font-semibold uppercase tracking-wider">
                {metadata.type}
              </span>
            )}
            {metadata.author && (
              <span className="inline-flex items-center font-medium">
                <svg
                  className="w-4 h-4 mr-1.5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {metadata.author}
              </span>
            )}
            {metadata.source && (
              <span className="inline-flex items-center font-medium">
                <svg
                  className="w-4 h-4 mr-1.5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {metadata.source}
              </span>
            )}
            {metadata.link && (
              <a
                href={metadata.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-navy transition-all duration-300 font-semibold min-h-[44px] items-center underline decoration-2 underline-offset-2"
                aria-label="View source link"
              >
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Learn more
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
