import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

describe('ContactForm - Validation', () => {
  it('should display required field error for name when field is empty', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.click(nameInput);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('should display minimum length error for name when less than 2 characters', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'A');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('should display required field error for email when field is empty', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should display email format error for invalid email', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/email/i)).toBeInTheDocument();
    });
  });

  it('should display required field error for subject when field is empty', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const subjectInput = screen.getByLabelText(/subject/i);
    await user.click(subjectInput);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Subject is required')).toBeInTheDocument();
    });
  });

  it('should display minimum length error for subject when less than 3 characters', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const subjectInput = screen.getByLabelText(/subject/i);
    await user.type(subjectInput, 'AB');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Subject must be at least 3 characters')).toBeInTheDocument();
    });
  });

  it('should display required field error for message when field is empty', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const messageInput = screen.getByLabelText(/message/i);
    await user.click(messageInput);
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('should display minimum length error for message when less than 10 characters', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Short');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
  });

  it('should display error messages with proper styling and icons', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.click(nameInput);
    await user.tab();
    
    await waitFor(() => {
      const errorMessage = screen.getByText('Name is required');
      expect(errorMessage).toHaveClass('text-error');
      expect(errorMessage.textContent).toContain('✗');
    });
  });
});

describe('ContactForm - Submission Flow', () => {
  it('should display success message after successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('should display error message after failed submission', async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Something went wrong'));
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('should display loading state during submission', async () => {
    const mockSubmit = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('should reset form after successful submission', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('should disable submit button during submission', async () => {
    const mockSubmit = vi.fn(() => new Promise<void>(resolve => setTimeout(resolve, 100)));
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });

  it('should display Try Again button on error', async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Test error'));
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
  });
});

describe('ContactForm - Accessibility', () => {
  it('should have proper ARIA labels on all form fields', () => {
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/subject/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true');
  });

  it('should set aria-invalid when field has error', async () => {
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

  it('should announce errors to screen readers with role alert', async () => {
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

  it('should announce success message to screen readers', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      const successMessage = screen.getByText(/message sent successfully/i).closest('div');
      expect(successMessage).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('should announce error message to screen readers with assertive', async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error('Test error'));
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      const errorContainer = screen.getByText(/test error/i).closest('div');
      expect(errorContainer).toHaveAttribute('aria-live', 'assertive');
    });
  });

  it('should support keyboard navigation through form fields', async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
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

  it('should have visible focus indicators on interactive elements', () => {
    const mockSubmit = vi.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toHaveClass('focus:ring-2');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toHaveClass('focus:ring-2');
  });
});
