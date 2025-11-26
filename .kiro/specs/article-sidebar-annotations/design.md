# Design Document: Article Sidebar Annotations

## Overview

This feature implements an interactive sidebar annotation system inspired by the McKinsey article style. The system displays expandable markers (+/- buttons) in a sidebar that reveal detailed contextual information when clicked. The design focuses on a clean, accessible implementation that enhances the reading experience without disrupting content flow.

## Architecture

### Component Structure

```
ArticleWithAnnotations (Container)
├── ArticleContent (Main content area)
│   └── Article text with annotation references
└── AnnotationSidebar (Sidebar component)
    └── AnnotationMarker[] (Individual expandable items)
        ├── MarkerButton (+ button)
        └── AnnotationPanel (Expanded content)
```

### Layout Strategy

The implementation uses a two-column layout:
- **Main Content Area**: 60-70% width, contains article text
- **Sidebar Area**: 30-40% width, contains annotation markers positioned to align with referenced content

On mobile (< 768px), the layout switches to a single column with inline or modal-based annotations.

## Components and Interfaces

### 1. ArticleWithAnnotations Component

**Purpose**: Container component that manages the article layout and coordinates between content and sidebar.

**Props**:
```typescript
interface ArticleWithAnnotationsProps {
  article: Article;
  annotations: Annotation[];
  className?: string;
}
```

**Responsibilities**:
- Render article content and sidebar in responsive layout
- Pass annotation data to sidebar component
- Handle responsive breakpoints

### 2. AnnotationSidebar Component

**Purpose**: Manages the sidebar display and annotation state.

**Props**:
```typescript
interface AnnotationSidebarProps {
  annotations: Annotation[];
  activeAnnotationId: string | null;
  onToggle: (id: string) => void;
}
```

**State**:
- `activeAnnotationId`: Tracks which annotation is currently expanded
- Manages scroll synchronization with main content

**Responsibilities**:
- Render annotation markers at correct vertical positions
- Handle expand/collapse logic (only one open at a time)
- Apply sticky positioning for viewport tracking

### 3. AnnotationMarker Component

**Purpose**: Individual annotation item with expandable panel.

**Props**:
```typescript
interface AnnotationMarkerProps {
  annotation: Annotation;
  isActive: boolean;
  onToggle: () => void;
  position: number; // Vertical position in pixels
}
```

**Responsibilities**:
- Render + button (collapsed) or - button (expanded)
- Display annotation panel when active
- Handle click interactions
- Provide keyboard navigation support
- Apply smooth expand/collapse animations

### 4. AnnotationPanel Component

**Purpose**: Displays the expanded annotation content.

**Props**:
```typescript
interface AnnotationPanelProps {
  title?: string;
  content: string;
  metadata?: AnnotationMetadata;
}
```

**Responsibilities**:
- Render formatted annotation content
- Support rich text, links, and optional images
- Apply consistent styling

## Data Models

### Annotation Interface

```typescript
interface Annotation {
  id: string;
  title?: string;
  content: string;
  position: number; // Vertical offset from article top
  anchorId?: string; // Optional ID of content element to align with
  metadata?: AnnotationMetadata;
}

interface AnnotationMetadata {
  author?: string;
  source?: string;
  link?: string;
  type?: 'definition' | 'insight' | 'reference' | 'note';
}
```

### Article Interface Extension

```typescript
interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  annotations?: Annotation[];
  // ... existing fields
}
```

## Implementation Details

### Positioning Strategy

**Approach 1: Manual Positioning (Initial Implementation)**
- Annotations include a `position` property (pixels from top)
- Sidebar uses absolute positioning within a relative container
- Simple to implement, requires manual position calculation

**Approach 2: Anchor-Based Positioning (Future Enhancement)**
- Article content includes anchor elements with IDs
- Annotations reference anchor IDs
- JavaScript calculates positions dynamically using `getBoundingClientRect()`
- More flexible but requires DOM measurement

### State Management

Use React's `useState` hook in the parent component:
```typescript
const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);

const handleToggle = (id: string) => {
  setActiveAnnotationId(prev => prev === id ? null : id);
};
```

This ensures only one annotation is expanded at a time.

### Responsive Behavior

**Desktop (≥ 768px)**:
- Two-column layout with fixed sidebar
- Sidebar uses `position: sticky` to follow scroll
- Annotations appear adjacent to content

**Mobile (< 768px)**:
- Single column layout
- Option 1: Inline annotations below referenced paragraphs
- Option 2: Modal overlay when marker is tapped
- Markers appear as small icons in the margin

### Animation

Use CSS transitions for smooth expand/collapse:
```css
.annotation-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.annotation-panel.active {
  max-height: 500px;
  opacity: 1;
}
```

## Accessibility

### Keyboard Navigation

- Annotation markers are `<button>` elements (natively focusable)
- Tab key moves between markers
- Enter/Space toggles expansion
- Escape key closes active annotation

### ARIA Attributes

```typescript
<button
  aria-expanded={isActive}
  aria-controls={`annotation-panel-${id}`}
  aria-label={`${isActive ? 'Collapse' : 'Expand'} annotation: ${title}`}
>
  {isActive ? '−' : '+'}
</button>

<div
  id={`annotation-panel-${id}`}
  role="region"
  aria-labelledby={`annotation-title-${id}`}
  hidden={!isActive}
>
  {/* Panel content */}
</div>
```

### Screen Reader Support

- Announce state changes using `aria-live` regions
- Provide descriptive labels for all interactive elements
- Ensure content is accessible when JavaScript is disabled (progressive enhancement)

## Styling

### Visual Design

**Marker Button**:
- Circular button with + icon
- Border: 2px solid accent color
- Background: white/primary background
- Size: 32x32px (desktop), 44x44px (mobile for touch)
- Hover: Background color change
- Active: Icon changes to −, background accent color

**Annotation Panel**:
- Background: Light gray or subtle background color
- Border-left: 4px solid accent color
- Padding: 16px
- Border-radius: 4px
- Box-shadow: Subtle shadow for depth
- Typography: Slightly smaller than main content

### Responsive Spacing

- Desktop: Sidebar width 300-350px, gap 40-60px from content
- Tablet: Sidebar width 250px, gap 30px
- Mobile: Full width inline or modal

## Error Handling

### Invalid Annotation Data

- Validate annotation structure on component mount
- Log warnings for missing required fields
- Skip rendering invalid annotations
- Provide fallback UI if all annotations fail

### Position Calculation Errors

- Handle cases where anchor elements don't exist
- Provide default positioning if calculation fails
- Gracefully degrade to inline display on errors

## Testing Strategy

### Unit Tests

- Test annotation toggle logic (only one open at a time)
- Test keyboard event handlers
- Test responsive layout switching
- Test ARIA attribute updates

### Integration Tests

- Test full article rendering with annotations
- Test scroll synchronization
- Test mobile modal/inline behavior
- Test accessibility with screen reader simulation

### Visual Regression Tests

- Capture screenshots of collapsed state
- Capture screenshots of expanded state
- Test responsive breakpoints
- Test animation states

## Performance Considerations

- Lazy load annotation content if heavy (images, etc.)
- Use CSS transforms for animations (GPU acceleration)
- Debounce scroll event listeners if implementing scroll-based positioning
- Memoize annotation components to prevent unnecessary re-renders

## Future Enhancements

1. **Deep Linking**: Allow URLs to open specific annotations
2. **Annotation Highlighting**: Highlight referenced text in main content
3. **User Annotations**: Allow readers to add their own notes
4. **Annotation Search**: Filter/search through annotations
5. **Analytics**: Track which annotations are most engaged with
6. **Rich Media**: Support video/audio embeds in annotations
