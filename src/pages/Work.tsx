import React from 'react';

const Work: React.FC = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-primary" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-4xl mb-10 sm:mb-12 md:mb-16">
          <h1 id="work-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6 md:mb-8">
            My Work
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
            A showcase of projects I've worked on, from concept to completion.
          </p>
        </header>
        
        <section className="space-y-6 sm:space-y-8 md:space-y-10 text-base sm:text-lg md:text-xl text-text-secondary" aria-label="Project categories">
          <article className="bg-primary-100 rounded-lg p-6 sm:p-8 md:p-10 border border-border">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4 md:mb-5">
              Featured Projects
            </h2>
            <p>
              This is a placeholder for your work portfolio. You can showcase your best projects here, 
              including case studies, screenshots, and detailed descriptions of your contributions.
            </p>
          </article>
          
          <article className="bg-primary-100 rounded-lg p-6 sm:p-8 md:p-10 border border-border">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4 md:mb-5">
              Client Work
            </h2>
            <p>
              Highlight client projects and collaborations that demonstrate your expertise and 
              the value you bring to different types of engagements.
            </p>
          </article>
          
          <article className="bg-primary-100 rounded-lg p-6 sm:p-8 md:p-10 border border-border">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-text mb-3 sm:mb-4 md:mb-5">
              Side Projects
            </h2>
            <p>
              Share personal projects and experiments that showcase your creativity and 
              passion for building things outside of client work.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Work;
