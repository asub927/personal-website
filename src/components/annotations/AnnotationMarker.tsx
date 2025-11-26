import { useEffect, useRef } from 'react';
import { AnnotationMarkerProps } from '../../types';
import { AnnotationPanel } from './AnnotationPanel';

export const AnnotationMarker = ({
  annotation,
  isActive,
  onToggle,
  isMobile = false,
}: AnnotationMarkerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enter or Space to toggle
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
    // Escape to close if active
    else if (e.key === 'Escape' && isActive) {
      e.preventDefault();
      onToggle();
    }
  };

  // Focus management: when annotation closes, return focus to button
  useEffect(() => {
    if (!isActive && buttonRef.current && document.activeElement === buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isActive]);

  return (
    <div className="annotation-marker w-full">
      {/* McKinsey-style expandable box */}
      {isMobile ? (
        <div className="mb-4">
          {/* Collapsed/Expanded Header - Light gray box */}
          <button
            ref={buttonRef}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={isActive}
            aria-controls={`annotation-panel-${annotation.id}`}
            aria-label={`${isActive ? 'Collapse' : 'Expand'} annotation${annotation.title ? `: ${annotation.title}` : ''}`}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            <div className="flex-1 text-left pr-4">
              <span className="font-sans text-sm font-semibold text-navy">
                {annotation.metadata?.type && (
                  <span className="text-xs uppercase tracking-wider text-text-tertiary mr-2">
                    {annotation.metadata.type}
                  </span>
                )}
              </span>
              {annotation.title && (
                <h3 className="font-serif text-base font-semibold text-navy mt-1">
                  {annotation.title}
                </h3>
              )}
              {!annotation.title && (
                <span className="font-serif text-base text-navy">
                  Additional information
                </span>
              )}
            </div>
            
            {/* Circular +/- button */}
            <div
              className={`
                flex items-center justify-center
                w-10 h-10
                rounded-full
                transition-all duration-200
                ${isActive 
                  ? 'bg-navy text-white' 
                  : 'bg-white text-navy border-2 border-navy'
                }
              `}
            >
              <span className="text-xl font-light leading-none" aria-hidden="true">
                {isActive ? '−' : '+'}
              </span>
            </div>
          </button>

          {/* Expandable Content */}
          <div
            id={`annotation-panel-${annotation.id}`}
            role="region"
            aria-labelledby={annotation.title ? `annotation-title-${annotation.id}` : undefined}
            className={`
              transition-all duration-300 ease-in-out
              ${isActive ? 'max-h-[800px] opacity-100 mt-0' : 'max-h-0 opacity-0'}
              overflow-hidden
            `}
          >
            <div className="px-6 py-4 bg-white border-l-4 border-navy">
              <AnnotationPanel
                title={annotation.title}
                content={annotation.content}
                metadata={annotation.metadata}
                annotationId={annotation.id}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Desktop: McKinsey-style expandable box in sidebar */
        <div className="mb-4">
          {/* Collapsed/Expanded Header - Light gray box */}
          <button
            ref={buttonRef}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={isActive}
            aria-controls={`annotation-panel-${annotation.id}`}
            aria-label={`${isActive ? 'Collapse' : 'Expand'} annotation${annotation.title ? `: ${annotation.title}` : ''}`}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            <div className="flex-1 text-left pr-3">
              {annotation.metadata?.type && (
                <span className="text-xs uppercase tracking-wider text-text-tertiary font-sans font-semibold block mb-1">
                  {annotation.metadata.type}
                </span>
              )}
              {annotation.title && (
                <h3 className="font-serif text-sm font-semibold text-navy leading-snug">
                  {annotation.title}
                </h3>
              )}
              {!annotation.title && (
                <span className="font-serif text-sm text-navy">
                  Additional information
                </span>
              )}
            </div>
            
            {/* Circular +/- button */}
            <div
              className={`
                flex items-center justify-center
                w-8 h-8
                rounded-full
                flex-shrink-0
                transition-all duration-200
                ${isActive 
                  ? 'bg-navy text-white' 
                  : 'bg-white text-navy border-2 border-navy'
                }
              `}
            >
              <span className="text-lg font-light leading-none" aria-hidden="true">
                {isActive ? '−' : '+'}
              </span>
            </div>
          </button>

          {/* Expandable Content */}
          <div
            id={`annotation-panel-${annotation.id}`}
            role="region"
            aria-labelledby={annotation.title ? `annotation-title-${annotation.id}` : undefined}
            className={`
              transition-all duration-300 ease-in-out
              ${isActive ? 'max-h-[600px] opacity-100 mt-0' : 'max-h-0 opacity-0'}
              overflow-hidden
            `}
          >
            <div className="px-4 py-3 bg-white border-l-4 border-navy">
              <AnnotationPanel
                title={annotation.title}
                content={annotation.content}
                metadata={annotation.metadata}
                annotationId={annotation.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
