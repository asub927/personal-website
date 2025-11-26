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
      className={`min-h-screen flex items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-label="Hero section"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text mb-4 sm:mb-6 md:mb-8 leading-tight">
          {headline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
        <a
          href={ctaLink}
          className="inline-flex items-center justify-center bg-accent text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-accent-dark transition-colors duration-200 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[44px] min-w-[120px]"
          aria-label={`${ctaText} - Navigate to featured content`}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default Hero;
