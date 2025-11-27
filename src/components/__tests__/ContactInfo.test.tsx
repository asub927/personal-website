import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactInfo } from '../ContactInfo';

describe('ContactInfo - Rendering', () => {
  it('should render email link with mailto', () => {
    render(<ContactInfo />);
    
    const emailLink = screen.getByRole('link', { name: /send email to/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:your.email@example.com');
  });

  it('should display email address text', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('your.email@example.com')).toBeInTheDocument();
  });

  it('should render LinkedIn social media link', () => {
    render(<ContactInfo />);
    
    const linkedInLink = screen.getByRole('link', { name: /linkedin profile/i });
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/yourprofile');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render Twitter social media link', () => {
    render(<ContactInfo />);
    
    const twitterLink = screen.getByRole('link', { name: /twitter profile/i });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/yourhandle');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render GitHub social media link', () => {
    render(<ContactInfo />);
    
    const githubLink = screen.getByRole('link', { name: /github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/yourusername');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display location information', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('Your City, Country')).toBeInTheDocument();
  });

  it('should render all social media platform names', () => {
    render(<ContactInfo />);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
