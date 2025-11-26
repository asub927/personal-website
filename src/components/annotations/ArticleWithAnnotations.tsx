import { useState } from 'react';
import { ArticleWithAnnotationsProps } from '../../types';
import { AnnotationSidebar } from './AnnotationSidebar';

export const ArticleWithAnnotations = ({
  article,
  annotations,
  className = '',
}: ArticleWithAnnotationsProps) => {
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setActiveAnnotationId((prev) => (prev === id ? null : id));
  };

  const hasAnnotations = annotations && annotations.length > 0;

  return (
    <div
      className={`article-with-annotations w-full mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ maxWidth: '1400px' }}
    >
      <div
        className={`flex flex-col ${
          hasAnnotations ? 'md:flex-row md:gap-10 lg:gap-14' : ''
        }`}
      >
        {/* Main Content Area (60-70% width on desktop) */}
        <article
          className={`article-content flex-1 ${
            hasAnnotations ? 'md:w-[65%]' : 'max-w-[800px] mx-auto'
          }`}
        >
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-600 text-xs sm:text-sm md:text-base">
              <span className="font-medium">{article.author}</span>
              <span>•</span>
              <time dateTime={article.publishedDate}>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <div
            className="article-body prose prose-sm sm:prose-base md:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Annotation Sidebar (30-40% width on desktop, hidden on mobile < 768px) */}
        {hasAnnotations && (
          <div className="hidden md:block md:w-[35%] md:min-w-[250px] lg:min-w-[300px] xl:min-w-[350px]">
            <AnnotationSidebar
              annotations={annotations}
              activeAnnotationId={activeAnnotationId}
              onToggle={handleToggle}
            />
          </div>
        )}
      </div>

      {/* Mobile Inline Annotations (visible only on mobile < 768px) */}
      {hasAnnotations && (
        <div className="md:hidden mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Annotations</h2>
          <AnnotationSidebar
            annotations={annotations}
            activeAnnotationId={activeAnnotationId}
            onToggle={handleToggle}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
};
