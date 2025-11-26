# Implementation Plan

- [x] 1. Create data models and TypeScript interfaces
  - Add Annotation, AnnotationMetadata, and Article interfaces to src/types/index.ts
  - Define prop interfaces for all annotation components (AnnotationMarkerProps, AnnotationPanelProps, AnnotationSidebarProps, ArticleWithAnnotationsProps)
  - _Requirements: 4.2, 4.3, 4.5_

- [x] 2. Implement AnnotationPanel component
  - Create src/components/annotations/AnnotationPanel.tsx with title, content, and metadata display
  - Add styling for panel with light background, left border accent (4px), padding (16px), and rounded corners
  - Support rich text content rendering with proper typography hierarchy
  - Add smooth height transition animation for expand/collapse using max-height CSS transitions
  - _Requirements: 2.2, 2.6, 4.5_

- [x] 3. Implement AnnotationMarker component
  - Create src/components/annotations/AnnotationMarker.tsx with circular button (32x32px desktop, 44x44px mobile) and expandable panel
  - Implement toggle functionality with + icon (collapsed) and − icon (expanded)
  - Add smooth expand/collapse animations using max-height CSS transitions (0.3s ease-in-out)
  - Style button with 2px border, hover states, and active state background color change
  - Position marker using absolute positioning based on position prop
  - Integrate AnnotationPanel component to display when expanded
  - _Requirements: 1.2, 2.1, 2.3, 2.4, 2.5, 2.6_

- [x] 4. Implement AnnotationSidebar component
  - Create src/components/annotations/AnnotationSidebar.tsx to manage multiple AnnotationMarker components
  - Implement state management for activeAnnotationId ensuring only one annotation is open at a time
  - Add sticky positioning (position: sticky, top: 80px) for sidebar to follow viewport scroll
  - Handle toggle events and collapse previously open annotation when new one is clicked
  - Set sidebar width to 300-350px on desktop with proper spacing from main content
  - _Requirements: 1.1, 1.3, 1.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 5. Implement ArticleWithAnnotations container component
  - Create src/components/annotations/ArticleWithAnnotations.tsx with two-column flex layout
  - Render article content in main area (60-70% width) and AnnotationSidebar in right column (30-40% width)
  - Implement responsive layout switching at 768px breakpoint to single column on mobile
  - Conditionally render sidebar only when annotations array has items
  - Add proper spacing (40-60px gap on desktop) and max-width constraints (1200-1400px) for readability
  - Center the article layout on the page for viewports wider than max content width
  - _Requirements: 1.1, 1.5, 1.6, 5.1, 7.1, 7.2, 7.3, 7.4_

- [x] 6. Add accessibility features to annotation components
  - Make annotation markers keyboard accessible using button elements with proper focus styles
  - Add keyboard navigation support (Enter/Space to toggle, Tab to move between markers, Escape to close)
  - Implement ARIA attributes (aria-expanded, aria-controls, aria-label on buttons, role="region" on panels)
  - Add aria-live region for screen reader announcements on state changes
  - Ensure minimum 44x44px touch targets on mobile devices
  - Add visible focus indicators with outline and color contrast meeting WCAG 2.1 requirements
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 5.2_

- [x] 7. Implement mobile responsive behavior
  - Add mobile layout styles for viewport < 768px with single column layout
  - Convert sidebar annotations to inline expandable sections below referenced content on mobile
  - Ensure touch-friendly interaction with 44x44px minimum button size
  - Adjust typography and spacing for mobile readability
  - Provide clear close/dismiss action for expanded annotations on mobile
  - Adapt sidebar width for tablet devices (768-1024px) to maintain readability
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Add error handling and validation
  - Validate annotation data structure (id, content, position required) before rendering in AnnotationSidebar
  - Log console warnings for malformed annotations and skip rendering invalid items
  - Handle edge cases where position values are out of bounds or negative
  - Provide fallback message if all annotations fail validation
  - _Requirements: 4.3, 4.4_

- [x] 9. Create sample article page with annotations
  - Create src/pages/ArticleDetail.tsx with full article layout including title, author, date, and content
  - Add sample article data with 4-6 annotations demonstrating different types (definition, insight, reference, note)
  - Position annotations at different vertical offsets (e.g., 200px, 450px, 700px, 950px) to align with corresponding content sections
  - Include rich content in article body (headings, paragraphs, lists) similar to McKinsey style
  - Use ArticleWithAnnotations component to render the article with sidebar
  - _Requirements: 1.1, 4.1, 4.5, 4.6_

- [ ] 10. Integrate article detail page into application
  - Add route for /writing/:articleId in App.tsx to display ArticleDetail page
  - Update Writing.tsx to include a clickable link to sample article (e.g., /writing/sample-article)
  - Ensure lazy loading is applied to ArticleDetail page for code splitting
  - _Requirements: 1.1, 4.1_

- [-] 11. Write component tests
  - [-] 11.1 Test AnnotationMarker toggle behavior and verify only one annotation open at a time
  - [ ] 11.2 Test keyboard event handlers (Enter, Space, Tab, Escape navigation)
  - [ ] 11.3 Test ARIA attribute updates when annotation state changes
  - [ ] 11.4 Test responsive layout switching at 768px breakpoint
  - [ ] 11.5 Test error handling for invalid annotation data structure
  - _Requirements: All_
