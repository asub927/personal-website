# Design Document: Contact Page Redesign

## Overview

The Contact page redesign transforms the placeholder page into a production-ready, professional contact experience. The design follows the McKinsey-inspired design system with a focus on clarity, accessibility, and user engagement. The page features a two-column layout on desktop (contact information and form) that stacks responsively on mobile devices.

## Architecture

### Component Structure

```
Contact (Page Component)
├── ContactInfo (Section)
│   ├── Email Link
│   ├── Social Media Links
│   └── Location Display
└── ContactForm (Form Component)
    ├── Form Fields (Name, Email, Subject, Message)
    ├── Validation Logic
    ├── Submit Handler
    └── Status Messages (Success/Error)
```

### State Management

The Contact page uses local React state management with the following state:

- Form field values (managed by react-hook-form)
- Form validation errors
- Submission loading state
- Submission status (idle, success, error)
- Error messages

### Data Flow

1. User enters form data → react-hook-form manages field state
2. User submits form → Validation runs on all fields
3. If valid → Submit handler sends data to form service
4. Form service responds → Update UI with success/error state
5. Success → Display confirmation message and reset form
6. Error → Display error message with retry option

## Components and Interfaces

### ContactFormData Interface

```typescript
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### ContactFormProps Interface

```typescript
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}
```

### ContactInfo Component

A presentational component that displays contact information in a structured format.

Props: None (uses static data)

Structure:
- Email with mailto link
- Social media links (LinkedIn, Twitter, GitHub) with icons
- Location information
- Styled with navy backgrounds and teal accents

### ContactForm Component

A controlled form component using react-hook-form for validation and state management.

Props:
- `onSubmit`: Async function that handles form submission

Features:
- Real-time validation on field blur
- Email format validation using existing validation utilities
- Required field validation
- Loading state during submission
- Success/error message display
- Accessible error announcements

## Data Models

### Contact Information

Static data structure for contact details:

```typescript
const contactInfo = {
  email: 'your.email@example.com',
  social: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { platform: 'twitter', url: 'https://twitter.com/yourhandle', label: 'Twitter' },
    { platform: 'github', url: 'https://github.com/yourusername', label: 'GitHub' }
  ],
  location: 'Your City, Country'
};
```

### Form Validation Rules

```typescript
const validationRules = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  },
  email: {
    required: 'Email is required',
    validate: (value) => isValidEmail(value) || getEmailErrorMessage(value)
  },
  subject: {
    required: 'Subject is required',
    minLength: { value: 3, message: 'Subject must be at least 3 characters' }
  },
  message: {
    required: 'Message is required',
    minLength: { value: 10, message: 'Message must be at least 10 characters' }
  }
};
```

## Layout Design

### Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────┐
│              Page Header (H1)                │
│           Introductory Text                  │
├──────────────────┬──────────────────────────┤
│                  │                          │
│  Contact Info    │    Contact Form          │
│  - Email         │    - Name Field          │
│  - Social Links  │    - Email Field         │
│  - Location      │    - Subject Field       │
│                  │    - Message Field       │
│                  │    - Submit Button       │
│                  │    - Status Messages     │
└──────────────────┴──────────────────────────┘
```

### Mobile Layout (<768px)

```
┌─────────────────────────┐
│    Page Header (H1)     │
│   Introductory Text     │
├─────────────────────────┤
│    Contact Info         │
│    - Email              │
│    - Social Links       │
│    - Location           │
├─────────────────────────┤
│    Contact Form         │
│    - Name Field         │
│    - Email Field        │
│    - Subject Field      │
│    - Message Field      │
│    - Submit Button      │
│    - Status Messages    │
└─────────────────────────┘
```

## Styling Specifications

### Color Usage

- Primary headings: Navy (#003366)
- Body text: Deep charcoal (#1A1A1A)
- Secondary text: Medium gray (#4A5568)
- Interactive elements: Teal (#00A3A1)
- Hover states: Dark teal (#008785)
- Error states: Error red (#C41E3A)
- Success states: Success green (#00A86B)
- Backgrounds: White (#FFFFFF) and Navy tint (#E6EBF0)

### Typography

- Page heading (H1): 48-72px, Lato Black (900), Navy
- Section headings (H2): 30-36px, Lato Bold (700), Navy
- Labels: 16-18px, Lato Bold (700), Deep charcoal
- Body text: 17px, Lato Regular (400), Medium gray
- Input text: 16px, Lato Regular (400), Deep charcoal

### Spacing

- Page padding: 80-160px vertical, 32-64px horizontal
- Section gap: 48-64px
- Form field gap: 24px
- Label-to-input gap: 8px
- Button padding: 16px vertical, 32px horizontal

### Interactive States

Form inputs:
- Default: 1px border, border-gray
- Focus: 2px border, teal, with ring
- Error: 2px border, error-red, with ring
- Disabled: 50% opacity, no pointer events

Submit button:
- Default: Teal background, white text
- Hover: Dark teal background, subtle shadow
- Active: Darker teal, pressed effect
- Disabled: 50% opacity, no pointer events
- Loading: Spinner animation, "Sending..." text

Links:
- Default: Teal color
- Hover: Dark teal, underline
- Focus: Teal ring, 2px offset

### Transitions

All interactive elements use 300ms ease-in-out transitions for:
- Color changes
- Border changes
- Shadow changes
- Transform changes

## Error Handling

### Validation Errors

Display inline below each field:
- Red text color (#C41E3A)
- 14px font size
- Icon prefix (✗)
- aria-describedby linking to input
- Announced to screen readers

### Submission Errors

Display in alert box above submit button:
- Red border and light red background
- Error icon and message
- "Try Again" button to dismiss
- aria-live="assertive" for screen reader announcement

Error types:
- Network errors: "Unable to connect. Please check your connection."
- Server errors: "Something went wrong. Please try again."
- Validation errors: Specific field error messages

### Success State

Display in success box above submit button:
- Green border and light green background
- Success icon (✓) and confirmation message
- Auto-dismiss after 5 seconds
- aria-live="polite" for screen reader announcement
- Form fields reset to empty state

## Accessibility Features

### Keyboard Navigation

- Tab order: Name → Email → Subject → Message → Submit
- Enter key submits form from any field
- Escape key clears focus
- All interactive elements have visible focus indicators

### Screen Reader Support

- Semantic HTML structure (main, section, form, labels)
- ARIA labels for all form fields
- aria-required for required fields
- aria-invalid for fields with errors
- aria-describedby linking errors to inputs
- aria-live regions for status messages
- Descriptive button text ("Send Message" not just "Submit")

### Visual Accessibility

- Minimum 4.5:1 contrast ratio for all text
- Minimum 44x44px touch targets
- Clear visual hierarchy
- Error states use both color and icons
- Focus indicators visible on all interactive elements

### Form Accessibility

- Labels properly associated with inputs
- Required fields marked with asterisk and aria-required
- Error messages announced to screen readers
- Success messages announced to screen readers
- Form submission prevented during loading state

## Testing Strategy

### Unit Tests

Test individual components in isolation:

1. ContactForm validation logic
   - Required field validation
   - Email format validation
   - Minimum length validation
   - Error message display

2. Form submission handling
   - Success state updates
   - Error state updates
   - Loading state management
   - Form reset on success

3. ContactInfo rendering
   - Email link generation
   - Social media links rendering
   - Location display

### Integration Tests

Test component interactions:

1. Form submission flow
   - Fill form → Submit → Loading state → Success message
   - Fill form → Submit → Loading state → Error message
   - Error state → Try again → Reset to idle

2. Validation flow
   - Empty field → Blur → Error message
   - Invalid email → Blur → Error message
   - Valid input → Blur → No error

### Accessibility Tests

1. Keyboard navigation
   - Tab through all interactive elements
   - Submit form with Enter key
   - Focus indicators visible

2. Screen reader testing
   - Form labels announced correctly
   - Error messages announced
   - Success messages announced
   - Required fields indicated

3. Color contrast testing
   - All text meets WCAG AA standards
   - Error states distinguishable without color

### Responsive Testing

Test on multiple screen sizes:
- Mobile (320px, 375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1280px, 1440px, 1920px)

Verify:
- Layout stacks correctly on mobile
- Touch targets meet minimum size
- Text remains readable at all sizes
- Form remains functional on all devices

## Implementation Notes

### Form Service Integration

The Contact page will use a placeholder submission handler that can be replaced with:
- Formspree integration
- EmailJS service
- Custom backend API endpoint
- Netlify Forms
- AWS SES

The submission handler interface:
```typescript
const handleFormSubmit = async (data: ContactFormData): Promise<void> => {
  // Implementation will be provided by user
  // Should throw error on failure
  // Should resolve on success
};
```

### Reusable Patterns

The ContactForm component follows the same patterns as the Newsletter component:
- react-hook-form for form management
- Existing validation utilities (isValidEmail, getEmailErrorMessage)
- Similar loading and status state management
- Consistent error and success message styling

### Performance Considerations

- Form validation runs on blur, not on every keystroke
- Debounce not needed for simple validation
- No external API calls during typing
- Minimal re-renders using react-hook-form

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid for layout (widely supported)
- Flexbox for component alignment
- No polyfills required for target browsers
