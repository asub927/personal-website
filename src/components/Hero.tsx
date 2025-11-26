import React, { useEffect, useRef, useState } from 'react';
import { HeroProps } from '../types';

const Hero: React.FC<HeroProps> = ({ headline, subheadline, ctaText, ctaLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center px-6 py-20 sm:px-8 sm:py-24 md:py-28 lg:px-12 lg:py-30 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-label="Hero section"
    >
      <div className="max-w-[960px] mx-auto text-center">
        <h1 className="font-serif text-[48px] sm:text-[60px] md:text-[72px] font-black text-navy mb-8 leading-tight tracking-tighter">
          {headline}
        </h1>
        <p className="font-sans text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-loose">
          {subheadline}
        </p>
        <a
          href={ctaLink}
          className="inline-flex items-center justify-center bg-accent text-white font-sans font-semibold px-8 py-4 rounded hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[44px] min-w-[140px]"
          aria-label={`${ctaText} - Navigate to featured content`}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default Hero;
