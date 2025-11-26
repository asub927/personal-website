import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});
