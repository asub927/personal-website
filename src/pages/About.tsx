import React from 'react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-primary" aria-labelledby="about-heading">
      <article className="max-w-4xl mx-auto">
        <h1 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6 md:mb-8">
          About Me
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 leading-relaxed">
            Welcome to my corner of the internet. I'm passionate about creating meaningful digital experiences.
          </p>
          
          <div className="space-y-5 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-xl text-text-secondary">
            <p>
              This is a placeholder page for the About section. Here you can share your story, 
              background, skills, and what drives you in your work.
            </p>
            
            <p>
              Consider including information about your professional journey, your approach to work, 
              and what makes you unique in your field.
            </p>
            
            <p>
              You might also want to add sections about your expertise, values, or the tools and 
              technologies you work with.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
};

export default About;
