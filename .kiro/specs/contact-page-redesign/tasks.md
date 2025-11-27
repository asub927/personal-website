# Implementation Plan

- [x] 1. Update type definitions for contact form
  - Add ContactFormData interface to src/types/index.ts with name, email, subject, and message fields
  - Add ContactFormProps interface with onSubmit handler
  - _Requirements: 2.1, 2.2_

- [x] 2. Create ContactForm component
  - [x] 2.1 Set up form structure with react-hook-form
    - Create src/components/ContactForm.tsx with form fields (name, email, subject, message)
    - Integrate react-hook-form for form state management
    - Add proper semantic HTML structure with labels and inputs
    - _Requirements: 2.1, 5.1, 5.5_

  - [x] 2.2 Implement form validation
    - Add required field validation for all inputs
    - Implement email format validation using existing validation utilities
    - Add minimum length validation for name, subject, and message fields
    - Display inline error messages below each field with proper ARIA attributes
    - _Requirements: 2.2, 2.3, 5.2, 5.4_

  - [x] 2.3 Implement submission handling and loading states
    - Add loading state during form submission
    - Disable submit button during submission to prevent duplicates
    - Display loading spinner and "Sending..." text on submit button
    - _Requirements: 2.4, 3.2, 3.5_

  - [x] 2.4 Add success and error message displays
    - Create success message component with green styling and checkmark icon
    - Create error message component with red styling and error icon
    - Add "Try Again" button to error messages
    - Implement form reset on successful submission
    - Add proper ARIA live regions for screen reader announcements
    - _Requirements: 2.4, 2.5, 5.4_

  - [x] 2.5 Apply McKinsey design system styling
    - Style form inputs with navy and teal colors from design system
    - Add focus states with teal accent borders
    - Implement error states with red borders and backgrounds
    - Add smooth 300ms transitions for all interactive states
    - Ensure 44x44px minimum touch targets for all interactive elements
    - _Requirements: 3.1, 4.3, 6.1, 6.2, 6.5_

- [x] 3. Create ContactInfo component
  - [x] 3.1 Build contact information display
    - Create src/components/ContactInfo.tsx with email, social links, and location sections
    - Add mailto link for email address
    - Create social media links for LinkedIn, Twitter, and GitHub
    - Display location information
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 3.2 Style with design system
    - Apply navy backgrounds and teal accents
    - Use Lato font family for all text
    - Implement hover states for links with teal color
    - Add proper spacing using 8px base unit
    - Ensure keyboard accessibility with visible focus states
    - _Requirements: 1.4, 1.5, 6.1, 6.2, 6.3, 6.4_

- [x] 4. Redesign Contact page component
  - [x] 4.1 Update page layout structure
    - Modify src/pages/Contact.tsx to use two-column layout on desktop
    - Implement responsive stacking for mobile devices
    - Add page heading and introductory text
    - Integrate ContactInfo and ContactForm components
    - _Requirements: 4.1, 4.2, 4.4_

  - [x] 4.2 Implement form submission handler
    - Create placeholder submission handler function
    - Add error handling for network failures
    - Add success handling with user feedback
    - Wire up handler to ContactForm component
    - _Requirements: 2.2, 2.4, 2.5_

  - [-] 4.3 Apply responsive design
    - Implement mobile, tablet, and desktop breakpoints
    - Ensure vertical stacking on mobile with appropriate spacing
    - Apply responsive typography scaling from design system
    - Test layout at all breakpoint sizes
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

  - [x] 4.4 Ensure accessibility compliance
    - Add proper ARIA labels and semantic HTML structure
    - Verify keyboard navigation through all elements
    - Test color contrast ratios meet WCAG AA standards
    - Ensure error and success messages are announced to screen readers
    - Add proper heading hierarchy and landmark regions
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 5. Write component tests
  - [x] 5.1 Test ContactForm validation
    - Write unit tests for required field validation
    - Test email format validation
    - Test minimum length validation
    - Test error message display
    - _Requirements: 2.2, 2.3_

  - [ ] 5.2 Test form submission flow
    - Test successful submission with success message display
    - Test failed submission with error message display
    - Test loading state during submission
    - Test form reset after successful submission
    - _Requirements: 2.4, 2.5, 3.2, 3.5_

  - [x] 5.3 Test ContactInfo rendering
    - Test email link generation
    - Test social media links rendering
    - Test location display
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 5.4 Test accessibility features
    - Test keyboard navigation through form
    - Test screen reader announcements for errors and success
    - Test ARIA attributes on form fields
    - Test focus indicators visibility
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

  - [x] 5.5 Test responsive behavior
    - Test layout at mobile breakpoints (320px, 375px, 414px)
    - Test layout at tablet breakpoints (768px, 1024px)
    - Test layout at desktop breakpoints (1280px, 1440px)
    - Verify touch target sizes on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
