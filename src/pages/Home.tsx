import React from 'react';
import Hero from '../components/Hero';
import { Newsletter } from '../components/Newsletter';
import { ContentGrid } from '../components/ContentGrid';
import { ContentItem } from '../types';

// Sample content data for initial display
const sampleContent: ContentItem[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications',
    description: 'A comprehensive guide to building scalable and performant web applications using modern frameworks and best practices.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    link: '/writing/modern-web-apps',
    category: 'article',
    publishedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Design Systems That Scale',
    description: 'Learn how to create and maintain design systems that grow with your product and team.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    link: '/writing/design-systems',
    category: 'article',
    publishedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Portfolio Redesign Project',
    description: 'A complete redesign of a personal portfolio website with focus on performance and accessibility.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    link: '/work/portfolio-redesign',
    category: 'project',
    publishedDate: '2024-01-05',
  },
  {
    id: '4',
    title: 'TypeScript Best Practices',
    description: 'Essential TypeScript patterns and practices for writing type-safe, maintainable code.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    link: '/writing/typescript-practices',
    category: 'article',
    publishedDate: '2023-12-28',
  },
  {
    id: '5',
    title: 'E-commerce Platform Development',
    description: 'Building a full-featured e-commerce platform with React, Node.js, and PostgreSQL.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
    link: '/work/ecommerce-platform',
    category: 'project',
    publishedDate: '2023-12-20',
  },
  {
    id: '6',
    title: 'Responsive Design Fundamentals',
    description: 'Master the fundamentals of responsive web design and create websites that work on any device.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
    link: '/writing/responsive-design',
    category: 'article',
    publishedDate: '2023-12-15',
  },
];

const Home: React.FC = () => {
  // Loading state for content (simulates fetching from API)
  const [isLoadingContent, setIsLoadingContent] = React.useState(true);
  const [content, setContent] = React.useState<ContentItem[]>([]);

  // Newsletter submission handler
  const handleNewsletterSubmit = async (email: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful subscription
        console.log('Newsletter subscription:', email);
        resolve();
        
        // Uncomment to simulate error:
        // reject(new Error('Unable to connect. Please check your connection.'));
      }, 1500);
    });
  };

  // Simulate content loading on mount
  React.useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setContent(sampleContent);
      setIsLoadingContent(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="scroll-smooth">
      {/* Hero Section */}
      <Hero
        headline="Welcome to My Portfolio"
        subheadline="I create beautiful, functional web experiences that make a difference. Explore my work, read my thoughts, and let's build something amazing together."
        ctaText="View My Work"
        ctaLink="#content"
      />

      {/* Newsletter Section */}
      <Newsletter onSubmit={handleNewsletterSubmit} />

      {/* Content Grid Section */}
      <section id="content" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3 sm:mb-4 md:mb-6">
              Featured Work & Writing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A collection of my latest projects, articles, and creative endeavors.
            </p>
          </div>
          
          <ContentGrid items={content} isLoading={isLoadingContent} />
        </div>
      </section>
    </main>
  );
};

export default Home;
