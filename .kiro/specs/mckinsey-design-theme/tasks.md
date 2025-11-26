# Implementation Plan - McKinsey-Inspired Design Theme

## Overview
This implementation plan breaks down the McKinsey-inspired design theme into discrete, manageable coding tasks. Each task builds incrementally on previous work to transform the portfolio website with sophisticated typography, refined colors, generous spacing, and polished interactions.

---

## Tasks

- [x] 1. Update typography system with Playfair Display and Inter fonts
  - Replace current font imports with Playfair Display (serif) and Inter (sans-serif)
  - Update CSS custom properties for font families in `src/index.css`
  - Configure font weights: Playfair (400, 600, 700, 900), Inter (300, 400, 500, 600, 700)
  - Update base typography styles with new font stack
  - Implement modular scale (1.333 ratio) for heading sizes
  - Update letter-spacing values: headings (-0.03em to -0.01em), body (-0.01em)
  - Set line heights: headings (1.1-1.3), body (1.6-1.7)
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Implement enhanced color system
  - [x] 2.1 Update CSS custom properties with new color tokens
    - Define Navy variations (#003366, #004080, #002244, #E6EBF0, #CCE0F0)
    - Define Teal variations (#00A3A1, #33B8B6, #008785, #E6F7F7, #B3E8E7)
    - Define Gold variations (#C9A961, #D4BA7F, #B89543)
    - Update text color hierarchy (#1A1A1A, #4A5568, #718096, #A0AEC0)
    - Define semantic colors (Success #00A86B, Error #C41E3A)
    - Update border colors (#E2E8F0, #EDF2F7, #CBD5E0)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 2.2 Update Tailwind configuration with new color tokens
    - Extend theme colors in `tailwind.config.js`
    - Map CSS variables to Tailwind utilities
    - Ensure all color variations are accessible via utility classes
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Update spacing system for generous whitespace
  - Define spacing scale in CSS custom properties (8px base unit)
  - Add extended spacing tokens (80px, 96px, 120px, 160px) to Tailwind config
  - Update section padding utilities for desktop (96px) and mobile (48px)
  - Create component spacing utilities (32px, 48px, 64px)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 4. Redesign Navigation component with McKinsey styling
  - Update logo typography to Playfair Display, 32px, weight 900
  - Implement uppercase menu items with Inter font, 14px, 0.1em letter-spacing
  - Update color scheme: Navy default, Teal hover, White on Navy active
  - Increase header height to 96px for premium feel
  - Add backdrop blur effect to fixed header
  - Implement smooth 300ms transitions for all states
  - Update hover states with Navy-50 background
  - Refine mobile menu with full-width dropdown
  - Ensure 44x44px minimum touch targets
  - Add proper focus indicators with Teal ring
  - _Requirements: 1.1, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 7.1, 7.2, 7.4_

- [x] 5. Enhance Hero component with sophisticated styling
  - Update headline typography to Playfair Display, 72px (desktop), 48px (mobile), weight 900
  - Set letter-spacing to -0.03em for visual impact
  - Update subheadline to Inter, 24px, Text Secondary color
  - Increase vertical padding to 120px (desktop), 80px (mobile)
  - Set max content width to 960px
  - Update CTA button with Teal background and refined styling
  - Implement button hover effects: Teal Dark, 2px lift, shadow-md
  - Add smooth 300ms transitions
  - Ensure responsive typography scaling
  - _Requirements: 1.1, 1.5, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1_

- [x] 6. Refine ContentCard component with premium styling
  - [x] 6.1 Update card structure and spacing
    - Set card padding to 32px
    - Update border to 1px solid Border color
    - Set border-radius to 8px for subtle rounding
    - Implement 16:9 aspect ratio for images
    - Add proper spacing between elements (12px, 16px)
    - _Requirements: 1.4, 5.1, 5.2, 5.3_
  
  - [x] 6.2 Implement sophisticated image treatments
    - Add 20% grayscale filter to images by default
    - Remove grayscale on hover for full color reveal
    - Add scale(1.05) transform to images on hover
    - Implement smooth 500ms transition for image effects
    - _Requirements: 6.4_
  
  - [x] 6.3 Update card typography and colors
    - Update category badge: Inter, 12px, uppercase, Teal text on Teal-50 background
    - Update title: Playfair Display, 24px, Navy, weight 600
    - Update description: Inter, 16px, Text Secondary, line-height 1.6
    - Update date: Inter, 14px, Text Tertiary
    - _Requirements: 1.1, 1.5, 3.1, 3.2, 3.3_
  
  - [x] 6.4 Implement refined hover and focus states
    - Add hover state: Border Dark, shadow-lg, scale(1.02)
    - Implement 300ms ease-out transition
    - Add Teal focus ring with 2px offset
    - Ensure smooth animation performance
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Update Footer component with navy background and refined styling
  - Update background to Navy (#003366)
  - Update brand typography: Playfair Display, 32px, White, weight 900
  - Set section headers to Inter, 14px, Teal, uppercase, weight 700
  - Update link styling: Inter, 16px, White, hover to Teal
  - Implement three-column grid layout (desktop), stacked (mobile)
  - Set vertical padding to 96px (desktop), 64px (mobile)
  - Add elegant top border separator for copyright section
  - Update social icon buttons with Navy-light borders
  - Implement hover states: Teal color, Navy-light background
  - Add smooth 300ms transitions
  - _Requirements: 1.1, 1.5, 3.1, 3.2, 4.1, 4.2, 5.1, 5.2, 7.1, 7.2_

- [ ] 8. Create standardized Button components
  - [ ] 8.1 Implement Primary Button component
    - Create button with Teal background, White text
    - Set padding to 14px horizontal, 28px vertical
    - Use Inter font, 16px, weight 600
    - Set border-radius to 4px
    - Add 2px solid Teal border
    - Implement hover: Teal Dark background, 2px lift, shadow-md
    - Add 200ms ease-out transition
    - Include Teal focus ring with 2px offset
    - Ensure 44x44px minimum size
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.4_
  
  - [ ] 8.2 Implement Secondary Button component
    - Create button with transparent background, Navy text
    - Set padding to 14px horizontal, 28px vertical
    - Use Inter font, 16px, weight 600
    - Add 2px solid Navy border
    - Implement hover: Navy background, White text
    - Add 200ms ease-out transition
    - Include Teal focus ring with 2px offset
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ] 8.3 Implement Tertiary Button component
    - Create text-only button with Teal text
    - Set padding to 8px horizontal, 16px vertical
    - Use Inter font, 16px, weight 600
    - Implement hover: Teal Dark text, underline
    - Add 200ms ease-out transition
    - Include Teal focus ring with 2px offset
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 9. Update global styles and base elements
  - Update body font to Inter, 18px (desktop), 16px (mobile)
  - Set body line-height to 1.7
  - Update heading color to Navy across all levels
  - Implement responsive typography scaling
  - Update link default styles: Navy text, Teal hover
  - Add smooth transitions to all interactive elements (300ms)
  - Update focus-visible styles with Teal ring
  - Ensure all text meets WCAG AA contrast requirements
  - _Requirements: 1.1, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 3.4, 4.1, 4.2_

- [x] 10. Implement responsive design adjustments
  - Update breakpoint-specific typography scales
  - Adjust section padding for mobile (48px), tablet (64px), desktop (96px)
  - Update component spacing for each breakpoint
  - Ensure card grids adapt: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
  - Verify touch targets are 44x44px minimum on mobile
  - Test navigation menu responsiveness
  - Ensure hero section scales appropriately
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 11. Update DESIGN_SYSTEM.md documentation
  - Document new typography system (Playfair Display + Inter)
  - Document complete color palette with all variations
  - Document spacing scale and usage guidelines
  - Add component styling guidelines
  - Include visual examples and code snippets
  - Document accessibility considerations
  - Add implementation notes and best practices
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 12. Implement accessibility enhancements
  - Verify all color combinations meet WCAG AA contrast (4.5:1 minimum)
  - Ensure all interactive elements have visible focus indicators
  - Verify touch targets meet 44x44px minimum
  - Test keyboard navigation across all components
  - Add proper ARIA labels where needed
  - Ensure semantic HTML structure
  - Test with screen readers
  - _Requirements: 3.4, 4.5, 7.4_

- [ ] 13. Polish and refinement
  - [ ] 13.1 Optimize animation performance
    - Ensure all animations use transform and opacity for GPU acceleration
    - Verify 60fps performance for all transitions
    - Test on lower-end devices
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [ ] 13.2 Cross-browser testing
    - Test in Chrome, Firefox, Safari, Edge
    - Verify font rendering across browsers
    - Check color consistency
    - Test responsive behavior
    - _Requirements: 1.1, 3.1, 7.1, 7.2, 7.3_
  
  - [ ] 13.3 Final visual polish
    - Review spacing consistency across all pages
    - Verify typography hierarchy is clear
    - Check color usage is consistent
    - Ensure all hover states work smoothly
    - Review overall aesthetic cohesion
    - _Requirements: 1.1, 1.5, 5.1, 5.2, 5.3, 5.4, 5.5_

---

## Implementation Notes

### Context Documents
All implementation tasks should reference:
- Requirements document: `.kiro/specs/mckinsey-design-theme/requirements.md`
- Design document: `.kiro/specs/mckinsey-design-theme/design.md`
- Visual examples: `.kiro/specs/mckinsey-design-theme/visual-examples.md`

### Key Files to Modify
- `src/index.css` - Typography, colors, base styles
- `tailwind.config.js` - Design tokens, theme configuration
- `DESIGN_SYSTEM.md` - Documentation
- `src/components/Navigation.tsx` - Navigation component
- `src/components/Hero.tsx` - Hero component
- `src/components/Footer.tsx` - Footer component
- `src/components/ContentCard.tsx` - Card component

### Design Principles to Follow
1. **Use design tokens**: Always use CSS variables, never hard-coded values
2. **Maintain accessibility**: Test all changes for WCAG AA compliance
3. **Ensure consistency**: Apply the same patterns across all components
4. **Optimize performance**: Use efficient CSS and animations
5. **Test responsively**: Verify all changes work across breakpoints

### Testing Strategy
- Visual regression testing for each component
- Accessibility testing with keyboard navigation and screen readers
- Cross-browser compatibility testing
- Responsive design testing on multiple devices
- Performance testing for animations and transitions
