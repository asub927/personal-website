import React from 'react';

const Writing: React.FC = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-primary" aria-labelledby="writing-heading">
      <article className="max-w-4xl mx-auto">
        <h1 id="writing-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6 md:mb-8">
          Writing
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 md:mb-12 lg:mb-16 leading-relaxed">
          Thoughts, insights, and lessons learned along the way.
        </p>
        
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <section className="border-b border-border pb-6 sm:pb-8 md:pb-10" aria-labelledby="recent-articles">
            <h2 id="recent-articles" className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4">
              Recent Articles
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-4">
              This is a placeholder for your writing section. Share your thoughts on topics you're 
              passionate about, technical tutorials, or insights from your experience.
            </p>
            <p className="text-text-tertiary text-base sm:text-base md:text-lg">
              Articles will be displayed here with titles, excerpts, and publication dates.
            </p>
          </section>
          
          <section className="border-b border-border pb-6 sm:pb-8 md:pb-10" aria-labelledby="technical-deep-dives">
            <h2 id="technical-deep-dives" className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4">
              Technical Deep Dives
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-4">
              Share in-depth technical articles that explore complex topics, provide tutorials, 
              or document your learning journey.
            </p>
          </section>
          
          <section className="pb-6 sm:pb-8 md:pb-10" aria-labelledby="industry-insights">
            <h2 id="industry-insights" className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4">
              Industry Insights
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary">
              Discuss trends, best practices, and your perspective on the evolving landscape 
              of your field.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default Writing;
