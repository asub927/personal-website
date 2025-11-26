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
      className={`article-with-annotations w-full mx-auto px-6 sm:px-8 lg:px-12 ${className}`}
      style={{ maxWidth: '1400px' }}
    >
      <div
        className={`flex flex-col ${
          hasAnnotations ? 'md:flex-row md:gap-12 lg:gap-16' : ''
        }`}
      >
        {/* Main Content Area (60-70% width on desktop) */}
        <article
          className={`article-content flex-1 ${
            hasAnnotations ? 'md:w-[65%]' : 'max-w-[800px] mx-auto'
          }`}
        >
          <header className="mb-10 md:mb-12 pb-8 border-b-2 border-navy">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-6 leading-tight text-navy tracking-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-5 text-text-secondary text-sm sm:text-base md:text-base">
              <span className="font-semibold text-navy">{article.author}</span>
              <span className="text-accent font-bold">•</span>
              <time dateTime={article.publishedDate} className="font-light">
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <div
            className="article-body prose prose-sm sm:prose-base md:prose-lg max-w-none font-serif text-text leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Annotation Sidebar (30-40% width on desktop, hidden on mobile < 768px) */}
        {hasAnnotations && (
          <div className="hidden md:block md:w-[35%] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]">
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
        <div className="md:hidden mt-12 border-t-2 border-navy pt-8">
          <h2 className="text-xl font-black mb-6 text-navy uppercase tracking-wider">Annotations</h2>
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
