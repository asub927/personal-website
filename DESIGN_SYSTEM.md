# McKinsey-Inspired Design System

## Overview
This design system transforms the portfolio website with a professional, sophisticated aesthetic inspired by McKinsey & Company's brand identity.

## Typography

### Font Families
- **Primary (Sans-serif)**: Lato - Clean, professional, highly readable
- **Secondary (Serif)**: Merriweather - For article content and long-form reading
- **Weights**: 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)

### Type Scale
- **H1**: 48-72px, Font-weight: 900, Letter-spacing: -0.03em
- **H2**: 30-48px, Font-weight: 700, Letter-spacing: -0.02em
- **H3**: 24-30px, Font-weight: 700
- **Body**: 17px, Font-weight: 400, Line-height: 1.7, Letter-spacing: -0.01em

## Color Palette

### Primary Colors
- **Navy Blue** (#003366) - Primary brand color, used for headings and key elements
  - Light: #004080
  - Dark: #002244
  - Tints: #E6EBF0, #CCE0F0

### Accent Colors
- **Teal** (#00A3A1) - McKinsey's signature accent color
  - Light: #33B8B6
  - Dark: #008785
  - Tints: #E6F7F7, #B3E8E7

- **Gold** (#C9A961) - Premium accent for special highlights
  - Light: #D4BA7F
  - Dark: #B89543

### Text Colors
- **Primary Text**: #1A1A1A (Deep charcoal)
- **Secondary Text**: #4A5568 (Medium gray)
- **Tertiary Text**: #718096 (Light gray)
- **Light Text**: #A0AEC0 (Very light for subtle elements)

### Semantic Colors
- **Success**: #00A86B
- **Error**: #C41E3A

## Design Principles

### 1. Professional Hierarchy
- Clear visual hierarchy with bold headings
- Generous whitespace (8px base unit)
- Structured grid-based layouts

### 2. Sophisticated Interactions
- Smooth transitions (300ms ease-in-out)
- Subtle hover states with color and shadow changes
- Focus states using teal accent color

### 3. Data-Driven Aesthetic
- Clean lines and sharp corners (rounded-sm instead of rounded-full)
- Structured information presentation
- Professional color blocking

### 4. Accessibility
- WCAG AA compliant contrast ratios
- Minimum 44x44px touch targets
- Clear focus indicators
- Semantic HTML structure

## Component Styling

### Navigation
- Fixed header with subtle backdrop blur
- Navy text with teal hover states
- Active state: White text on navy background
- Uppercase tracking for professional appearance

### Footer
- Navy background with white text
- Teal accent for section headings
- Structured three-column layout
- Elegant border separators

### Annotations
- Square buttons instead of circular (professional aesthetic)
- Border-left accent bars for visual hierarchy
- Navy-tinted backgrounds for panels
- Serif fonts for content readability
- Structured metadata display

### Buttons & Interactive Elements
- Square corners (rounded-sm)
- Bold borders (2px)
- Teal accent color
- Shadow on hover/active states
- Smooth 300ms transitions

## Spacing System
- Base unit: 8px
- Generous padding and margins
- Consistent gap spacing (12-16px)
- Large section spacing (80-160px)

## Implementation Notes

### CSS Variables
All colors and typography are defined as CSS custom properties in `src/index.css` using the `@theme` directive for Tailwind v4 compatibility.

### Font Loading
Fonts are loaded via Google Fonts CDN with display=swap for optimal performance.

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Brand Personality
- **Professional**: Clean, structured, data-driven
- **Sophisticated**: Premium typography and color choices
- **Trustworthy**: Navy blue conveys stability and expertise
- **Modern**: Contemporary design patterns with classic foundations
- **Accessible**: Inclusive design for all users
