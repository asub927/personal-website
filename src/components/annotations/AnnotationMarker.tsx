import { useEffect, useRef } from 'react';
import { AnnotationMarkerProps } from '../../types';
import { AnnotationPanel } from './AnnotationPanel';

export const AnnotationMarker = ({
  annotation,
  isActive,
  onToggle,
  position,
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
    <div
      className={`annotation-marker ${
        isMobile ? 'static w-full' : 'absolute left-0 w-full'
      }`}
      style={isMobile ? {} : { top: `${position}px` }}
    >
      {/* Mobile: Full-width card with title preview */}
      {isMobile ? (
        <div className="border-l-4 border-accent bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <button
            ref={buttonRef}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={isActive}
            aria-controls={`annotation-panel-${annotation.id}`}
            aria-label={`${isActive ? 'Collapse' : 'Expand'} annotation${annotation.title ? `: ${annotation.title}` : ''}`}
            className={`
              w-full
              flex items-center justify-between
              min-h-[44px]
              px-5 py-4
              text-left
              transition-all duration-300 ease-in-out
              hover:bg-navy-50
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset
              ${isActive ? 'bg-navy-50' : 'bg-white'}
            `}
          >
            <div className="flex-1 pr-4">
              {annotation.title && (
                <span className="font-bold text-sm sm:text-base text-navy block tracking-tight">
                  {annotation.title}
                </span>
              )}
              {!annotation.title && (
                <span className="text-sm sm:text-base text-text-secondary font-medium">
                  Additional information
                </span>
              )}
              {annotation.metadata?.type && (
                <span className="text-xs text-accent mt-1.5 block uppercase tracking-wider font-semibold">
                  {annotation.metadata.type}
                </span>
              )}
            </div>
            <div
              className={`
                flex items-center justify-center
                min-w-[44px] min-h-[44px]
                w-11 h-11
                rounded-sm
                border-2 border-accent
                text-accent
                font-black text-xl
                transition-all duration-300 ease-in-out
                ${isActive ? 'bg-accent text-white shadow-md' : 'bg-white hover:bg-accent hover:text-white'}
              `}
            >
              <span className="leading-none" aria-hidden="true">
                {isActive ? '−' : '+'}
              </span>
            </div>
          </button>

          {/* Expandable Panel for Mobile */}
          <div
            id={`annotation-panel-${annotation.id}`}
            role="region"
            aria-labelledby={annotation.title ? `annotation-title-${annotation.id}` : undefined}
            className={`
              annotation-panel-container
              transition-all duration-300 ease-in-out
              ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
              overflow-hidden
            `}
          >
            <div className="px-5 pb-5">
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
        /* Desktop: Square button with sidebar panel - McKinsey style */
        <>
          {/* Marker Button - Professional square design */}
          <button
            ref={buttonRef}
            onClick={onToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={isActive}
            aria-controls={`annotation-panel-${annotation.id}`}
            aria-label={`${isActive ? 'Collapse' : 'Expand'} annotation${annotation.title ? `: ${annotation.title}` : ''}`}
            className={`
              marker-button
              flex items-center justify-center
              min-w-[44px] min-h-[44px]
              w-12 h-12
              rounded-sm
              border-2 border-accent
              bg-white
              text-accent
              font-black text-xl
              transition-all duration-300 ease-in-out
              hover:bg-accent hover:text-white hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
              focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-opacity-50
              ${isActive ? 'bg-accent text-white shadow-md' : ''}
            `}
          >
            <span className="leading-none" aria-hidden="true">
              {isActive ? '−' : '+'}
            </span>
          </button>

          {/* Expandable Panel */}
          <div
            id={`annotation-panel-${annotation.id}`}
            role="region"
            aria-labelledby={annotation.title ? `annotation-title-${annotation.id}` : undefined}
            className={`
              annotation-panel-container
              mt-3
              transition-all duration-300 ease-in-out
              ${isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
              overflow-hidden
            `}
          >
            <AnnotationPanel
              title={annotation.title}
              content={annotation.content}
              metadata={annotation.metadata}
              annotationId={annotation.id}
            />
          </div>
        </>
      )}
    </div>
  );
};
