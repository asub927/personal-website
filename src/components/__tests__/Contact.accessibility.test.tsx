import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../../pages/Contact';
import { ContactForm } from '../ContactForm';
import { ContactInfo } from '../ContactInfo';

describe('Contact Page - Accessibility Features', () => {
  describe('Keyboard Navigation', () => {
    it('should support complete keyboard navigation through all form fields in correct order', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Tab through all form fields
      await user.tab();
      expect(nameInput).toHaveFocus();
      
      await user.tab();
      expect(emailInput).toHaveFocus();
      
      await user.tab();
      expect(subjectInput).toHaveFocus();
      
      await user.tab();
      expect(messageInput).toHaveFocus();
      
      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it('should support keyboard navigation through ContactInfo links', async () => {
      const user = userEvent.setup();
      
      render(<ContactInfo />);
      
      const emailLink = screen.getByRole('link', { name: /send email to/i });
      const linkedInLink = screen.getByRole('link', { name: /linkedin profile/i });
      const twitterLink = screen.getByRole('link', { name: /twitter profile/i });
      const githubLink = screen.getByRole('link', { name: /github profile/i });
      
      // Tab through all links
      await user.tab();
      expect(emailLink).toHaveFocus();
      
      await user.tab();
      expect(linkedInLink).toHaveFocus();
      
      await user.tab();
      expect(twitterLink).toHaveFocus();
      
      await user.tab();
      expect(githubLink).toHaveFocus();
    });

    it('should allow form submission via Enter key from any field', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      // Press Enter from the name field
      await user.click(screen.getByLabelText(/name/i));
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalled();
      });
    });

    it('should support keyboard navigation through Try Again button on error', async () => {
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Test error'));
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const tryAgainButton = screen.getByRole('button', { name: /try again/i });
        expect(tryAgainButton).toBeInTheDocument();
      });
      
      // Tab to Try Again button
      await user.tab();
      const tryAgainButton = screen.getByRole('button', { name: /dismiss error/i });
      expect(tryAgainButton).toHaveFocus();
    });
  });

  describe('Screen Reader Announcements', () => {
    it('should announce validation errors to screen readers with role alert', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Name is required');
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });

    it('should announce success message to screen readers with aria-live polite', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const successContainer = screen.getByText(/message sent successfully/i).closest('div');
        expect(successContainer).toHaveAttribute('aria-live', 'polite');
        expect(successContainer).toHaveAttribute('role', 'status');
        expect(successContainer).toHaveAttribute('aria-atomic', 'true');
      });
    });

    it('should announce error message to screen readers with aria-live assertive', async () => {
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const errorContainer = screen.getByText(/network error/i).closest('div');
        expect(errorContainer).toHaveAttribute('aria-live', 'assertive');
        expect(errorContainer).toHaveAttribute('role', 'alert');
        expect(errorContainer).toHaveAttribute('aria-atomic', 'true');
      });
    });

    it('should announce required fields to screen readers', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const requiredLabels = screen.getAllByLabelText(/required/i);
      expect(requiredLabels).toHaveLength(4); // name, email, subject, message
      
      requiredLabels.forEach(label => {
        expect(label).toHaveAttribute('aria-label', 'required');
      });
    });

    it('should announce loading state to screen readers', async () => {
      const mockSubmit = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      const loadingButton = screen.getByRole('button', { name: /sending message, please wait/i });
      expect(loadingButton).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper aria-required attributes on all required fields', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/^email/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/^subject/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/^message/i)).toHaveAttribute('aria-required', 'true');
    });

    it('should set aria-invalid to true when field has validation error', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should set aria-invalid to false when field has no error', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    });

    it('should link error messages to inputs with aria-describedby', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
        expect(screen.getByText('Name is required')).toHaveAttribute('id', 'name-error');
      });
    });

    it('should have aria-describedby linking form to status messages', async () => {
      const mockSubmit = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();
      
      const { container } = render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const form = container.querySelector('form');
        expect(form).toHaveAttribute('aria-describedby', 'form-success-message');
      });
    });

    it('should have proper aria-label on social media links', () => {
      render(<ContactInfo />);
      
      expect(screen.getByRole('link', { name: /linkedin profile.*opens in new tab/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /twitter profile.*opens in new tab/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /github profile.*opens in new tab/i })).toBeInTheDocument();
    });

    it('should have aria-label on email link', () => {
      render(<ContactInfo />);
      
      const emailLink = screen.getByRole('link', { name: /send email to/i });
      expect(emailLink).toHaveAttribute('aria-label', 'Send email to your.email@example.com');
    });

    it('should have aria-hidden on decorative icons', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        const errorIcon = screen.getByText('✗');
        expect(errorIcon.parentElement).toHaveTextContent('✗');
      });
    });

    it('should have proper navigation landmark with aria-label', () => {
      render(<ContactInfo />);
      
      const nav = screen.getByRole('navigation', { name: /social media links/i });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Focus Indicators', () => {
    it('should have visible focus indicators on all form inputs', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toHaveClass('focus:ring-2');
      expect(emailInput).toHaveClass('focus:ring-2');
      expect(subjectInput).toHaveClass('focus:ring-2');
      expect(messageInput).toHaveClass('focus:ring-2');
    });

    it('should have visible focus indicator on submit button', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('focus:ring-2');
      expect(submitButton).toHaveClass('focus:ring-accent');
    });

    it('should have visible focus indicators on all ContactInfo links', () => {
      render(<ContactInfo />);
      
      const emailLink = screen.getByRole('link', { name: /send email to/i });
      const linkedInLink = screen.getByRole('link', { name: /linkedin profile/i });
      
      expect(emailLink).toHaveClass('focus:ring-2');
      expect(linkedInLink).toHaveClass('focus:ring-2');
    });

    it('should have visible focus indicator on Try Again button', async () => {
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Test error'));
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
      await user.type(screen.getByLabelText(/message/i), 'This is a test message');
      
      await user.click(screen.getByRole('button', { name: /send message/i }));
      
      await waitFor(() => {
        const tryAgainButton = screen.getByRole('button', { name: /dismiss error/i });
        expect(tryAgainButton).toHaveClass('focus:ring-2');
      });
    });

    it('should maintain focus visibility during error state', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const nameInput = screen.getByLabelText(/name/i);
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        expect(nameInput).toHaveClass('focus:ring-error');
        expect(nameInput).toHaveClass('focus:border-error');
      });
    });

    it('should have focus ring offset for better visibility', () => {
      const mockSubmit = vi.fn();
      
      render(<ContactForm onSubmit={mockSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('focus:ring-offset-2');
    });
  });

  describe('Complete Page Accessibility', () => {
    it('should have proper semantic structure with main landmark', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );
      
      const main = screen.getByRole('main', { name: /get in touch/i });
      expect(main).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('should support complete keyboard navigation through entire page', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );
      
      // Tab through ContactInfo links
      await user.tab();
      expect(screen.getByRole('link', { name: /send email to/i })).toHaveFocus();
      
      // Continue tabbing through social links
      await user.tab();
      await user.tab();
      await user.tab();
      
      // Tab into form fields
      await user.tab();
      expect(screen.getByLabelText(/name/i)).toHaveFocus();
    });

    it('should have minimum touch target sizes for mobile accessibility', () => {
      render(
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      );
      
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('min-h-[44px]');
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveClass('min-h-[44px]');
    });
  });
});
