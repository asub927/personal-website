import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AnnotationMarker } from '../AnnotationMarker';
import { AnnotationSidebar } from '../AnnotationSidebar';
import { Annotation } from '../../../types';

describe('Accessibility - ARIA Attributes', () => {
  const mockAnnotation: Annotation = {
    id: 'test-1',
    title: 'Test Annotation',
    content: 'Test content',
    position: 100,
  };

  describe('AnnotationMarker ARIA attributes', () => {
    it('should have aria-expanded="false" when collapsed', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when expanded', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-controls pointing to panel id', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-controls', 'annotation-panel-test-1');
    });

    it('should have descriptive aria-label when collapsed', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Expand annotation: Test Annotation');
    });

    it('should have descriptive aria-label when expanded', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Collapse annotation: Test Annotation');
    });

    it('should have role="region" on annotation panel', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const panel = screen.getByRole('region');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute('id', 'annotation-panel-test-1');
    });

    it('should have aria-labelledby on panel when title exists', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('aria-labelledby', 'annotation-title-test-1');
    });
  });

  describe('AnnotationSidebar ARIA live region', () => {
    const mockAnnotations: Annotation[] = [
      {
        id: 'annotation-1',
        title: 'First Annotation',
        content: 'First content',
        position: 100,
      },
      {
        id: 'annotation-2',
        title: 'Second Annotation',
        content: 'Second content',
        position: 300,
      },
    ];

    it('should have aria-live region for announcements', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    });

    it('should announce when annotation is expanded', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // Expand first annotation
      rerender(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-1"
          onToggle={onToggle}
        />
      );

      await waitFor(() => {
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent('Annotation expanded: First Annotation');
      });
    });

    it('should announce when annotation is collapsed', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-1"
          onToggle={onToggle}
        />
      );

      // Collapse annotation
      rerender(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      await waitFor(() => {
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent('Annotation collapsed');
      });
    });

    it('should have aria-label on sidebar', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const sidebar = screen.getByRole('complementary');
      expect(sidebar).toHaveAttribute('aria-label', 'Article annotations');
    });
  });

  describe('Focus indicators', () => {
    it('should have visible focus styles on button', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:ring-2');
      expect(button).toHaveClass('focus:ring-accent');
    });
  });

  describe('ARIA attribute updates on state change', () => {
    it('should update aria-expanded when toggling from collapsed to expanded', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      
      // Initially collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-label', 'Expand annotation: Test Annotation');

      // Simulate state change to expanded
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      // Should update to expanded
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute('aria-label', 'Collapse annotation: Test Annotation');
    });

    it('should update aria-expanded when toggling from expanded to collapsed', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      
      // Initially expanded
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute('aria-label', 'Collapse annotation: Test Annotation');

      // Simulate state change to collapsed
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      // Should update to collapsed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-label', 'Expand annotation: Test Annotation');
    });

    it('should update aria-label dynamically when state changes', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      
      // Check initial aria-label
      expect(button).toHaveAttribute('aria-label', 'Expand annotation: Test Annotation');

      // Toggle to expanded
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      // aria-label should update
      expect(button).toHaveAttribute('aria-label', 'Collapse annotation: Test Annotation');

      // Toggle back to collapsed
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      // aria-label should update again
      expect(button).toHaveAttribute('aria-label', 'Expand annotation: Test Annotation');
    });

    it('should maintain aria-controls attribute across state changes', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button');
      const expectedPanelId = 'annotation-panel-test-1';
      
      // Check initial aria-controls
      expect(button).toHaveAttribute('aria-controls', expectedPanelId);

      // Toggle to expanded
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      // aria-controls should remain the same
      expect(button).toHaveAttribute('aria-controls', expectedPanelId);

      // Toggle back to collapsed
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      // aria-controls should still be the same
      expect(button).toHaveAttribute('aria-controls', expectedPanelId);
    });

    it('should show/hide panel region based on state', async () => {
      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      // Panel should be in DOM but with max-h-0 when collapsed
      const panelCollapsed = screen.getByRole('region');
      expect(panelCollapsed).toBeInTheDocument();
      expect(panelCollapsed).toHaveClass('max-h-0');
      expect(panelCollapsed).toHaveClass('opacity-0');

      // Toggle to expanded
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      // Panel should be visible when expanded
      const panelExpanded = screen.getByRole('region');
      expect(panelExpanded).toBeInTheDocument();
      expect(panelExpanded).toHaveAttribute('id', 'annotation-panel-test-1');
      expect(panelExpanded).not.toHaveClass('max-h-0');
      expect(panelExpanded).toHaveClass('opacity-100');

      // Toggle back to collapsed
      rerender(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      // Panel should be collapsed again
      const panelCollapsedAgain = screen.getByRole('region');
      expect(panelCollapsedAgain).toHaveClass('max-h-0');
      expect(panelCollapsedAgain).toHaveClass('opacity-0');
    });

    it('should update aria-live announcements when sidebar state changes', async () => {
      const mockAnnotations: Annotation[] = [
        {
          id: 'annotation-1',
          title: 'First Annotation',
          content: 'First content',
          position: 100,
        },
        {
          id: 'annotation-2',
          title: 'Second Annotation',
          content: 'Second content',
          position: 300,
        },
      ];

      const onToggle = vi.fn();

      const { rerender } = render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const liveRegion = screen.getByRole('status');
      
      // Initially empty
      expect(liveRegion).toHaveTextContent('');

      // Expand first annotation
      rerender(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-1"
          onToggle={onToggle}
        />
      );

      // Should announce expansion
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Annotation expanded: First Annotation');
      });

      // Switch to second annotation
      rerender(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-2"
          onToggle={onToggle}
        />
      );

      // Should announce new expansion
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Annotation expanded: Second Annotation');
      });

      // Collapse all
      rerender(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // Should announce collapse
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Annotation collapsed');
      });
    });
  });
});
