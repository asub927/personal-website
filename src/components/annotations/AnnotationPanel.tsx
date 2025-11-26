import { AnnotationPanelProps } from '../../types';

export const AnnotationPanel = ({ 
  content, 
  metadata, 
}: AnnotationPanelProps) => {
  return (
    <div className="annotation-panel">
      {/* Content - Professional serif font for readability */}
      <div className="text-sm text-text-secondary leading-relaxed font-serif">
        {content}
      </div>

      {/* Metadata - Clean, minimal */}
      {metadata && (metadata.author || metadata.source || metadata.link) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 text-xs text-text-tertiary">
            {metadata.author && (
              <span className="font-medium">
                {metadata.author}
              </span>
            )}
            {metadata.source && (
              <span>
                {metadata.source}
              </span>
            )}
            {metadata.link && (
              <a
                href={metadata.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy hover:text-accent transition-colors duration-200 underline"
                aria-label="View source link"
              >
                Learn more →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
