import { useEffect, useState } from 'react';
import { AnnotationSidebarProps } from '../../types';
import { AnnotationMarker } from './AnnotationMarker';

export const AnnotationSidebar = ({
  annotations,
  activeAnnotationId,
  onToggle,
  isMobile = false,
}: AnnotationSidebarProps) => {
  const [announcement, setAnnouncement] = useState<string>('');

  // Validate annotations before rendering
  const validAnnotations = annotations.filter((annotation) => {
    // Check for required fields
    const hasId = annotation?.id && typeof annotation.id === 'string' && annotation.id.trim() !== '';
    const hasContent = annotation?.content && typeof annotation.content === 'string' && annotation.content.trim() !== '';
    const hasValidPosition = typeof annotation?.position === 'number' && !isNaN(annotation.position);
    
    const isValid = hasId && hasContent && hasValidPosition;
    
    if (!isValid) {
      const missingFields = [];
      if (!hasId) missingFields.push('id');
      if (!hasContent) missingFields.push('content');
      if (!hasValidPosition) missingFields.push('position');
      
      console.warn(
        `Invalid annotation detected and skipped. Missing or invalid required fields: ${missingFields.join(', ')}`,
        annotation
      );
      return false;
    }
    
    // Check for negative positions
    if (annotation.position < 0) {
      console.warn(
        `Annotation "${annotation.id}" has negative position (${annotation.position}px). Skipping to prevent rendering issues.`
      );
      return false;
    }
    
    // Check for extremely large positions that might be out of bounds
    if (annotation.position > 50000) {
      console.warn(
        `Annotation "${annotation.id}" has unusually large position (${annotation.position}px). This may be out of bounds.`
      );
    }
    
    return true;
  });

  // Provide fallback message if all annotations fail validation
  if (validAnnotations.length === 0 && annotations.length > 0) {
    console.warn(
      `All ${annotations.length} annotation(s) failed validation. No annotations will be displayed. ` +
      'Please check that all annotations have valid id, content, and position fields.'
    );
    return null;
  }

  // Don't render sidebar if no valid annotations
  if (validAnnotations.length === 0) {
    return null;
  }

  // Announce state changes to screen readers
  useEffect(() => {
    if (activeAnnotationId) {
      const activeAnnotation = validAnnotations.find(
        (annotation) => annotation.id === activeAnnotationId
      );
      if (activeAnnotation) {
        setAnnouncement(
          `Annotation expanded: ${activeAnnotation.title || 'Additional information'}`
        );
      }
    } else {
      setAnnouncement('Annotation collapsed');
    }

    // Clear announcement after a short delay
    const timer = setTimeout(() => setAnnouncement(''), 1000);
    return () => clearTimeout(timer);
  }, [activeAnnotationId, validAnnotations]);

  return (
    <aside
      className={`annotation-sidebar ${
        isMobile
          ? 'static w-full'
          : 'sticky top-32 w-full md:w-[250px] lg:w-[300px] xl:w-[350px] h-fit max-h-[calc(100vh-140px)] overflow-y-auto'
      }`}
      aria-label="Article annotations"
    >
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className={isMobile ? 'space-y-4' : 'relative'}>
        {validAnnotations.map((annotation) => (
          <AnnotationMarker
            key={annotation.id}
            annotation={annotation}
            isActive={activeAnnotationId === annotation.id}
            onToggle={() => onToggle(annotation.id)}
            position={annotation.position}
            isMobile={isMobile}
          />
        ))}
      </div>
    </aside>
  );
};
