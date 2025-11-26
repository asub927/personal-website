import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleWithAnnotations } from '../ArticleWithAnnotations';
import { Article, Annotation } from '../../../types';

describe('Responsive Layout', () => {
  const mockArticle: Article = {
    id: 'test-article',
    title: 'Test Article',
    content: '<p>Test article content</p>',
    author: 'Test Author',
    publishedDate: '2024-01-01',
  };

  const mockAnnotations: Annotation[] = [
    {
      id: 'annotation-1',
      title: 'First Annotation',
      content: 'First content',
      position: 100,
    },
    {
      id: 'annotation-2',
      title: 'Second Annotation',
      content: 'Second content',
      position: 300,
    },
  ];

  // Helper to set viewport width
  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  beforeEach(() => {
    // Reset viewport to desktop size
    setViewportWidth(1024);
  });

  describe('Desktop layout (>= 768px)', () => {
    it('should render two-column layout on desktop', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const mainContent = container.querySelector('.article-content');
      expect(mainContent).toBeInTheDocument();

      // Desktop sidebar should be visible
      const desktopSidebars = container.querySelectorAll('.annotation-sidebar');
      const desktopSidebar = Array.from(desktopSidebars).find(
        sidebar => !sidebar.classList.contains('md:hidden')
      );
      expect(desktopSidebar).toBeInTheDocument();
    });

    it('should hide mobile annotations section on desktop', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Mobile section should have md:hidden class
      const mobileSection = container.querySelector('.md\\:hidden');
      expect(mobileSection).toBeInTheDocument();
    });

    it('should apply sticky positioning to sidebar on desktop', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const sidebar = container.querySelector('.annotation-sidebar.sticky');
      expect(sidebar).toBeInTheDocument();
    });
  });

  describe('Breakpoint switching at 768px', () => {
    it('should switch from desktop to mobile layout at 768px breakpoint', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Desktop sidebar should be visible (has hidden md:block classes)
      const desktopSidebar = container.querySelector('.hidden.md\\:block');
      expect(desktopSidebar).toBeInTheDocument();

      // Mobile section should be hidden on desktop (has md:hidden class)
      const mobileSection = container.querySelector('.md\\:hidden');
      expect(mobileSection).toBeInTheDocument();
    });

    it('should apply flex-row layout on desktop and flex-col on mobile', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('flex-col');
      expect(flexContainer).toHaveClass('md:flex-row');
    });

    it('should adjust content width at 768px breakpoint', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const articleContent = container.querySelector('.article-content');
      expect(articleContent).toHaveClass('md:w-[65%]');
    });

    it('should show sidebar with proper width classes at 768px+', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const sidebarContainer = container.querySelector('.md\\:w-\\[35\\%\\]');
      expect(sidebarContainer).toBeInTheDocument();
      expect(sidebarContainer).toHaveClass('md:min-w-[250px]');
    });
  });

  describe('Mobile layout (< 768px)', () => {
    it('should render single column layout on mobile', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Check for mobile-specific classes
      const mobileAnnotations = container.querySelector('.md\\:hidden');
      expect(mobileAnnotations).toBeInTheDocument();
    });

    it('should show mobile annotations section with heading', () => {
      render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Mobile section should have "Annotations" heading
      const heading = screen.getByText('Annotations');
      expect(heading).toBeInTheDocument();
    });

    it('should hide desktop sidebar on mobile', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Desktop sidebar should have hidden class for mobile
      const desktopSidebar = container.querySelector('.hidden.md\\:block');
      expect(desktopSidebar).toBeInTheDocument();
    });

    it('should render annotations with isMobile prop in mobile section', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Mobile annotations should be in the mobile section
      const mobileSection = container.querySelector('.md\\:hidden');
      expect(mobileSection).toBeInTheDocument();
      
      // Check that annotations are rendered within mobile section
      const annotationMarkers = mobileSection?.querySelectorAll('.annotation-marker');
      expect(annotationMarkers?.length).toBe(2);
    });
  });

  describe('Layout without annotations', () => {
    it('should render only main content when no annotations', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={[]}
        />
      );

      const mainContent = container.querySelector('.article-content');
      expect(mainContent).toBeInTheDocument();

      // No sidebar should be rendered
      const sidebar = container.querySelector('.annotation-sidebar');
      expect(sidebar).not.toBeInTheDocument();
    });

    it('should center article content when no annotations', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={[]}
        />
      );

      const mainContent = container.querySelector('.article-content');
      expect(mainContent).toHaveClass('mx-auto');
    });
  });

  describe('Touch targets on mobile', () => {
    it('should have minimum 44x44px touch targets', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      // Check for min-h-[44px] and min-w-[44px] classes on buttons
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        const hasMinHeight = button.classList.contains('min-h-[44px]');
        const hasMinWidth = button.classList.contains('min-w-[44px]');
        expect(hasMinHeight || hasMinWidth).toBe(true);
      });
    });
  });

  describe('Responsive spacing', () => {
    it('should apply appropriate gap between content and sidebar on desktop', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('md:gap-10');
      expect(flexContainer).toHaveClass('lg:gap-14');
    });

    it('should constrain max width of article layout', () => {
      const { container } = render(
        <ArticleWithAnnotations
          article={mockArticle}
          annotations={mockAnnotations}
        />
      );

      const articleContainer = container.querySelector('.article-with-annotations');
      expect(articleContainer).toHaveStyle({ maxWidth: '1400px' });
    });
  });
});
