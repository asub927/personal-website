# Portfolio Website Design Document

## Overview

This design document outlines the technical architecture and implementation approach for a personal portfolio website inspired by Sahil Bloom's clean, minimalist layout. The website will be built as a modern, responsive single-page application with multiple sections, featuring a hero area, newsletter subscription, content grid, and navigation.

## Architecture

### Technology Stack

- **Frontend Framework**: React with TypeScript for type safety and component-based architecture
- **Styling**: Tailwind CSS for utility-first styling and responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form for newsletter subscription validation
- **Routing**: React Router for navigation between sections/pages
- **Deployment**: Static site hosting (Vercel/Netlify compatible)

### Project Structure

```
portfolio-website/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Newsletter.tsx
│   │   ├── ContentGrid.tsx
│   │   ├── ContentCard.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Work.tsx
│   │   ├── Writing.tsx
│   │   └── Contact.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Components and Interfaces

### Navigation Component

**Purpose**: Provides site-wide navigation with responsive mobile menu

**Props Interface**:
```typescript
interface NavigationProps {
  currentPath: string;
}
```

**Key Features**:
- Fixed position navigation bar
- Responsive hamburger menu for mobile
- Active link highlighting
- Smooth scroll to sections

### Hero Component

**Purpose**: Landing section with headline, subheadline, and primary CTA

**Props Interface**:
```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}
```

**Key Features**:
- Large, bold typography
- Centered layout
- Call-to-action button
- Minimal, clean design

### Newsletter Component

**Purpose**: Email subscription form with validation

**Props Interface**:
```typescript
interface NewsletterProps {
  onSubmit: (email: string) => Promise<void>;
}

interface NewsletterFormData {
  email: string;
}
```

**Key Features**:
- Email input with validation
- Submit button with loading state
- Success/error message display
- Email format validation using regex

### ContentGrid Component

**Purpose**: Displays featured content in responsive grid layout

**Props Interface**:
```typescript
interface ContentGridProps {
  items: ContentItem[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}
```

**Key Features**:
- Responsive grid layout (CSS Grid)
- Configurable column counts per breakpoint
- Gap spacing between items

### ContentCard Component

**Purpose**: Individual content item with image, title, and description

**Props Interface**:
```typescript
interface ContentCardProps {
  item: ContentItem;
  onClick: (id: string) => void;
}
```

**Key Features**:
- Thumbnail image
- Title and description
- Hover effects (scale, shadow)
- Click handler for navigation

### Footer Component

**Purpose**: Site footer with links and social media

**Props Interface**:
```typescript
interface FooterProps {
  socialLinks: SocialLink[];
  navigationLinks: NavLink[];
}
```

**Key Features**:
- Multi-column layout
- Social media icons
- Copyright information
- Additional navigation links

## Data Models

### ContentItem

```typescript
interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  link: string;
  category: 'article' | 'project' | 'video';
  publishedDate: string;
}
```

### SocialLink

```typescript
interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'instagram' | 'youtube';
  url: string;
  icon: string;
}
```

### NavLink

```typescript
interface NavLink {
  label: string;
  path: string;
  external?: boolean;
}
```

## Styling Approach

### Design System

**Color Palette**:
- Primary: Clean white background (#FFFFFF)
- Text: Dark gray/black for high contrast (#1a1a1a)
- Accent: Subtle blue or brand color for CTAs (#2563eb)
- Borders: Light gray for subtle separation (#e5e7eb)

**Typography**:
- Headings: Inter or similar sans-serif, bold weights
- Body: Inter, regular weight, 16px base size
- Line height: 1.6 for readability

**Spacing**:
- Consistent spacing scale using Tailwind (4px base unit)
- Generous whitespace for clean, minimal feel
- Section padding: 80px vertical on desktop, 40px on mobile

**Responsive Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Component-Specific Styles

**Hero Section**:
- Full viewport height on desktop
- Centered content with max-width container
- Large heading (48-64px on desktop, 32-40px on mobile)

**Content Grid**:
- CSS Grid with auto-fit columns
- 1 column mobile, 2 columns tablet, 3 columns desktop
- 24px gap between items
- Cards with subtle border and hover shadow

**Navigation**:
- Sticky/fixed positioning
- Backdrop blur effect for modern look
- 60px height
- Horizontal layout on desktop, hamburger menu on mobile

## Error Handling

### Form Validation

**Email Validation**:
- Client-side validation using regex pattern
- Real-time validation feedback
- Error messages displayed below input field
- Prevent submission if validation fails

**Error States**:
```typescript
interface FormError {
  field: string;
  message: string;
}
```

**Error Messages**:
- Invalid email: "Please enter a valid email address"
- Submission error: "Something went wrong. Please try again."
- Network error: "Unable to connect. Please check your connection."

### Loading States

- Newsletter form: Display loading spinner on submit button
- Content loading: Show skeleton screens while fetching data
- Image loading: Use placeholder with fade-in effect

### Fallbacks

- Missing images: Display placeholder with icon
- Failed content load: Show error message with retry button
- Offline state: Display offline indicator

## Testing Strategy

### Component Testing

**Unit Tests**:
- Email validation function
- Form submission handlers
- Navigation link highlighting logic
- Responsive grid column calculations

**Component Tests**:
- Newsletter form submission flow
- Navigation menu toggle on mobile
- Content card click handlers
- Hero CTA button functionality

### Integration Testing

**User Flows**:
- Complete newsletter subscription flow
- Navigation between sections
- Content card interaction and navigation
- Mobile menu open/close

### Responsive Testing

**Breakpoint Testing**:
- Test all components at mobile (375px), tablet (768px), and desktop (1440px) widths
- Verify touch targets meet 44px minimum on mobile
- Ensure text remains readable at all sizes

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1

**Optimization Strategies**:
- Image optimization (WebP format, lazy loading)
- Code splitting for routes
- Minification and compression
- CDN for static assets

## Accessibility Considerations

- Semantic HTML elements (nav, main, footer, article)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators for all interactive elements
- Alt text for all images
- Color contrast ratios meeting WCAG AA standards (4.5:1 for text)
- Skip to main content link
