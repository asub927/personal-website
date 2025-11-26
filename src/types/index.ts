// Data Models

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  link: string;
  category: 'article' | 'project' | 'video';
  publishedDate: string;
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'instagram' | 'youtube';
  url: string;
  icon: string;
}

export interface NavLink {
  label: string;
  path: string;
  external?: boolean;
}

// Component Props Interfaces

export interface NavigationProps {
  currentPath: string;
}

export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

export interface NewsletterProps {
  onSubmit: (email: string) => Promise<void>;
}

export interface NewsletterFormData {
  email: string;
}

export interface ContentGridProps {
  items: ContentItem[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export interface ContentCardProps {
  item: ContentItem;
  onClick: (id: string) => void;
}

export interface FooterProps {
  socialLinks: SocialLink[];
  navigationLinks: NavLink[];
}

// Error Handling

export interface FormError {
  field: string;
  message: string;
}
