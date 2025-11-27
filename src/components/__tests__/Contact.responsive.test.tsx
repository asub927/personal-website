import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../../pages/Contact';

// Mock window.matchMedia for responsive testing
const createMatchMedia = (width: number) => {
  return (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
};

describe('Contact Page - Responsive Behavior', () => {
  beforeEach(() => {
    // Reset any previous mocks
    vi.clearAllMocks();
  });

  describe('Mobile Breakpoints', () => {
    it('should render at mobile breakpoint 320px', () => {
      window.matchMedia = createMatchMedia(320);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should render at mobile breakpoint 375px', () => {
      window.matchMedia = createMatchMedia(375);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should render at mobile breakpoint 414px', () => {
      window.matchMedia = createMatchMedia(414);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 414,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should stack form and contact info vertically on mobile', () => {
      window.matchMedia = createMatchMedia(375);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
    });
  });

  describe('Tablet Breakpoints', () => {
    it('should render at tablet breakpoint 768px', () => {
      window.matchMedia = createMatchMedia(768);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should render at tablet breakpoint 1024px', () => {
      window.matchMedia = createMatchMedia(1024);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should maintain vertical stacking at tablet breakpoint 768px', () => {
      window.matchMedia = createMatchMedia(768);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
    });
  });

  describe('Desktop Breakpoints', () => {
    it('should render at desktop breakpoint 1280px', () => {
      window.matchMedia = createMatchMedia(1280);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should render at desktop breakpoint 1440px', () => {
      window.matchMedia = createMatchMedia(1440);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should use two-column layout on desktop', () => {
      window.matchMedia = createMatchMedia(1280);
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
    });
  });

  describe('Touch Target Sizes', () => {
    it('should have minimum 44px height on all form inputs', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);

      expect(nameInput).toHaveClass('min-h-[44px]');
      expect(emailInput).toHaveClass('min-h-[44px]');
      expect(subjectInput).toHaveClass('min-h-[44px]');
      expect(messageInput).toHaveClass('min-h-[44px]');
    });

    it('should have minimum 44px height on submit button', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('min-h-[44px]');
    });

    it('should have adequate touch targets on contact info links', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const emailLink = screen.getByRole('link', { name: /send email to/i });
      const linkedInLink = screen.getByRole('link', { name: /linkedin profile/i });
      const twitterLink = screen.getByRole('link', { name: /twitter profile/i });
      const githubLink = screen.getByRole('link', { name: /github profile/i });

      // Verify links have padding for adequate touch targets
      expect(emailLink).toHaveClass('py-2');
      expect(linkedInLink).toHaveClass('p-2');
      expect(twitterLink).toHaveClass('p-2');
      expect(githubLink).toHaveClass('p-2');
    });
  });

  describe('Responsive Layout Structure', () => {
    it('should have responsive grid layout classes', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1');
      expect(gridContainer).toHaveClass('lg:grid-cols-2');
    });

    it('should render both ContactInfo and ContactForm components', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      expect(screen.getByText(/contact information/i)).toBeInTheDocument();
      expect(screen.getByText(/send a message/i)).toBeInTheDocument();
    });

    it('should have responsive spacing classes on main container', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const main = screen.getByRole('main');
      expect(main).toHaveClass('pt-16');
      expect(main).toHaveClass('sm:pt-20');
      expect(main).toHaveClass('md:pt-24');
      expect(main).toHaveClass('lg:pt-32');
      expect(main).toHaveClass('xl:pt-40');
    });

    it('should have responsive padding on main container', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const main = screen.getByRole('main');
      expect(main).toHaveClass('px-4');
      expect(main).toHaveClass('sm:px-6');
      expect(main).toHaveClass('md:px-8');
      expect(main).toHaveClass('lg:px-12');
      expect(main).toHaveClass('xl:px-16');
    });

    it('should have responsive gap between grid items', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const gridContainer = screen.getByRole('main').querySelector('.grid');
      expect(gridContainer).toHaveClass('gap-6');
      expect(gridContainer).toHaveClass('sm:gap-8');
      expect(gridContainer).toHaveClass('md:gap-10');
      expect(gridContainer).toHaveClass('lg:gap-12');
      expect(gridContainer).toHaveClass('xl:gap-16');
    });
  });

  describe('Responsive Typography', () => {
    it('should have responsive heading sizes', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-4xl');
      expect(heading).toHaveClass('sm:text-5xl');
      expect(heading).toHaveClass('md:text-6xl');
      expect(heading).toHaveClass('lg:text-7xl');
      expect(heading).toHaveClass('xl:text-[72px]');
    });

    it('should have responsive body text sizes', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const introText = screen.getByText(/I'd love to hear from you/i);
      expect(introText).toHaveClass('text-base');
      expect(introText).toHaveClass('sm:text-lg');
      expect(introText).toHaveClass('md:text-xl');
      expect(introText).toHaveClass('lg:text-[17px]');
    });

    it('should have responsive section heading sizes', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );

      const sectionHeading = screen.getByRole('heading', { level: 2, name: /send a message/i });
      expect(sectionHeading).toHaveClass('text-2xl');
      expect(sectionHeading).toHaveClass('sm:text-3xl');
      expect(sectionHeading).toHaveClass('md:text-4xl');
      expect(sectionHeading).toHaveClass('lg:text-[36px]');
    });
  });

  describe('Cross-Breakpoint Functionality', () => {
    it('should maintain form functionality across all breakpoints', () => {
      const breakpoints = [320, 375, 414, 768, 1024, 1280, 1440];

      breakpoints.forEach((width) => {
        window.matchMedia = createMatchMedia(width);
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { unmount } = render(
          <BrowserRouter>
            <Contact />
          </BrowserRouter>
        );

        // Verify all form fields are present and functional
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();

        unmount();
      });
    });

    it('should maintain contact info visibility across all breakpoints', () => {
      const breakpoints = [320, 375, 414, 768, 1024, 1280, 1440];

      breakpoints.forEach((width) => {
        window.matchMedia = createMatchMedia(width);
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { unmount } = render(
          <BrowserRouter>
            <Contact />
          </BrowserRouter>
        );

        // Verify contact info is visible
        expect(screen.getByRole('link', { name: /send email to/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /linkedin profile/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /twitter profile/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /github profile/i })).toBeInTheDocument();

        unmount();
      });
    });
  });
});
