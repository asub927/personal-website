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

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface ContentGridProps {
  items: ContentItem[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  isLoading?: boolean;
}

export interface ContentCardProps {
  item: ContentItem;
  onClick: (id: string) => void;
}

export interface FooterProps {
  socialLinks: SocialLink[];
  navigationLinks: NavLink[];
}

// Annotation System

export interface AnnotationMetadata {
  author?: string;
  source?: string;
  link?: string;
  type?: 'definition' | 'insight' | 'reference' | 'note';
}

export interface Annotation {
  id: string;
  title?: string;
  content: string;
  position: number; // Vertical offset from article top in pixels
  anchorId?: string; // Optional ID of content element to align with
  metadata?: AnnotationMetadata;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  annotations?: Annotation[];
}

// Annotation Component Props

export interface AnnotationPanelProps {
  title?: string;
  content: string;
  metadata?: AnnotationMetadata;
  annotationId?: string;
  isMobile?: boolean;
}

export interface AnnotationMarkerProps {
  annotation: Annotation;
  isActive: boolean;
  onToggle: () => void;
  position: number; // Vertical position in pixels
  isMobile?: boolean;
}

export interface AnnotationSidebarProps {
  annotations: Annotation[];
  activeAnnotationId: string | null;
  onToggle: (id: string) => void;
  isMobile?: boolean;
}

export interface ArticleWithAnnotationsProps {
  article: Article;
  annotations: Annotation[];
  className?: string;
}

// Error Handling

export interface FormError {
  field: string;
  message: string;
}
