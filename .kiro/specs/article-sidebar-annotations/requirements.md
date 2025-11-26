# Requirements Document

## Introduction

This feature adds an interactive sidebar annotation system to article pages, inspired by the McKinsey article style. The system allows readers to expand inline annotations that provide additional context, definitions, methodology notes, or related information without disrupting the main reading flow. The sidebar displays expandable markers (+ buttons) positioned alongside the main content that reveal detailed panels when clicked. This creates a rich, layered reading experience where supplementary information is easily accessible but not intrusive.

## Glossary

- **Annotation System**: The complete interactive sidebar feature that displays expandable content markers and manages their state
- **Annotation Marker**: A visual indicator (+ button or numbered reference) in the sidebar that can be clicked to reveal content
- **Annotation Panel**: The expanded view that displays detailed content (text, images, or mixed media) when a marker is activated
- **Article Content**: The main text content of an article or blog post displayed in the primary content area
- **Sidebar**: A fixed or sticky column adjacent to the main content area that contains annotation markers
- **Article Page**: A dedicated page component for displaying long-form content with annotations (e.g., Writing page or individual article views)
- **Portfolio Website**: The React-based portfolio application where this feature will be implemented
- **Annotation Reference**: An inline indicator in the main text that corresponds to a sidebar annotation

## Requirements

### Requirement 1

**User Story:** As a reader, I want to see expandable annotations in the sidebar while reading articles, so that I can access additional context without leaving the main content flow

#### Acceptance Criteria

1. WHEN an article page with annotations loads, THE Annotation System SHALL display annotation markers in the sidebar aligned with their corresponding content sections in the main text
2. THE Annotation Marker SHALL be visually represented as a clickable plus (+) button with a border and appropriate hover states
3. WHILE viewing an article, THE Annotation System SHALL maintain the sidebar in a fixed or sticky position during scrolling
4. THE Annotation System SHALL support multiple annotation markers within a single article, each independently expandable
5. WHERE an article contains no annotations, THE Annotation System SHALL render only the main content without a sidebar
6. THE Annotation System SHALL position annotation markers vertically to align with their reference points in the main content

### Requirement 2

**User Story:** As a reader, I want to click on annotation markers to reveal detailed information, so that I can learn more about specific topics, methodologies, or definitions

#### Acceptance Criteria

1. WHEN a user clicks an Annotation Marker, THE Annotation System SHALL expand the marker to reveal the Annotation Panel below it
2. THE Annotation Panel SHALL display the full annotation content including title, body text, and optional elements such as images or links
3. WHEN an Annotation Panel is expanded, THE Annotation Marker SHALL change visual state from a plus (+) to a minus (-) symbol to indicate active status
4. WHEN a user clicks an active Annotation Marker, THE Annotation System SHALL collapse the Annotation Panel and restore the plus (+) symbol
5. THE Annotation System SHALL animate the expansion and collapse transitions smoothly with appropriate easing
6. THE Annotation Panel SHALL have distinct visual styling (background color, padding, borders) to differentiate it from the main content

### Requirement 3

**User Story:** As a reader, I want only one annotation to be expanded at a time, so that the sidebar remains uncluttered and easy to navigate

#### Acceptance Criteria

1. WHEN a user expands an Annotation Panel, THE Annotation System SHALL collapse any previously expanded panels
2. THE Annotation System SHALL maintain focus on the newly expanded annotation
3. WHEN collapsing an annotation, THE Annotation System SHALL restore the sidebar to its default state
4. THE Annotation System SHALL provide visual feedback during state transitions

### Requirement 4

**User Story:** As a content creator, I want to define annotations within article content using a simple data structure, so that I can easily add contextual information to my articles

#### Acceptance Criteria

1. THE Annotation System SHALL support a structured data format (JSON or TypeScript objects) for defining annotations with properties including id, title, content, and position reference
2. THE Annotation System SHALL parse annotation definitions and extract all required fields before rendering
3. THE Annotation System SHALL validate that each annotation contains required fields (id, content) before rendering
4. WHERE annotation data is malformed or missing required fields, THE Annotation System SHALL log a warning and skip rendering that annotation
5. THE Annotation System SHALL support annotations with a title (optional), body text (required), and optional rich content such as lists or formatted text
6. THE Annotation System SHALL allow content creators to specify the vertical position or reference point for each annotation marker

### Requirement 5

**User Story:** As a mobile user, I want annotations to be accessible on smaller screens, so that I can access additional context regardless of device

#### Acceptance Criteria

1. WHEN viewing on mobile devices (viewport width less than 768 pixels), THE Annotation System SHALL hide the sidebar and display annotations inline within the main content flow or in a modal overlay
2. THE Annotation System SHALL maintain touch-friendly interaction targets with minimum 44x44 pixel tap areas for all interactive elements
3. WHEN a mobile user taps an annotation reference or marker, THE Annotation System SHALL display the annotation content in a readable format that does not obscure the main text
4. THE Annotation System SHALL provide a clear close or dismiss action for expanded annotations on mobile devices
5. WHEN viewing on tablet devices (viewport width 768-1024 pixels), THE Annotation System SHALL adapt the sidebar width to maintain readability of both main content and annotations

### Requirement 6

**User Story:** As a user with accessibility needs, I want to navigate and interact with annotations using keyboard and screen readers, so that I can access all content regardless of input method

#### Acceptance Criteria

1. THE Annotation Marker SHALL be keyboard accessible with visible focus indicators that meet WCAG 2.1 contrast requirements
2. WHEN a user presses Enter or Space on a focused Annotation Marker, THE Annotation System SHALL toggle the annotation expanded state
3. THE Annotation System SHALL provide appropriate ARIA labels, roles, and states (aria-expanded, aria-controls) for screen reader compatibility
4. WHEN an annotation state changes, THE Annotation System SHALL announce the change to assistive technologies using ARIA live regions
5. THE Annotation System SHALL support keyboard navigation between multiple annotations using Tab key
6. THE Annotation Panel content SHALL be keyboard accessible and allow focus to move through any interactive elements within the annotation

### Requirement 7

**User Story:** As a content creator, I want to display articles in a professional layout with a main content area and sidebar, so that readers have an optimal reading experience

#### Acceptance Criteria

1. THE Annotation System SHALL render articles in a two-column layout with the main content area occupying approximately 60-70% of the width and the sidebar occupying the remaining space
2. THE Annotation System SHALL maintain appropriate spacing and margins between the main content and sidebar to ensure readability
3. THE Annotation System SHALL constrain the maximum width of the article layout to prevent excessively long line lengths (recommended 1200-1400px total width)
4. THE Annotation System SHALL center the article layout on the page for viewports wider than the maximum content width
5. WHILE scrolling, THE Annotation System SHALL keep the sidebar visible using fixed or sticky positioning
