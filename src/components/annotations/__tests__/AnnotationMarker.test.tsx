import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnotationMarker } from '../AnnotationMarker';
import { Annotation } from '../../../types';

describe('AnnotationMarker', () => {
  const mockAnnotation: Annotation = {
    id: 'test-1',
    title: 'Test Annotation',
    content: 'Test content',
    position: 100,
  };

  describe('Toggle behavior', () => {
    it('should toggle annotation when clicked', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button', { name: /expand annotation/i });
      await user.click(button);

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should display plus icon when collapsed', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button', { name: /expand annotation/i });
      expect(button).toHaveTextContent('+');
    });

    it('should display minus icon when expanded', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={true}
          onToggle={onToggle}
          position={100}
        />
      );

      const button = screen.getByRole('button', { name: /collapse annotation/i });
      expect(button).toHaveTextContent('−');
    });

    it('should show annotation panel when active', () => {
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
      expect(panel).toHaveTextContent('Test content');
    });

    it('should hide annotation panel when inactive', () => {
      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationMarker
          annotation={mockAnnotation}
          isActive={false}
          onToggle={onToggle}
          position={100}
        />
      );

      const panel = container.querySelector('.annotation-panel-container');
      expect(panel).toHaveClass('max-h-0');
      expect(panel).toHaveClass('opacity-0');
    });
  });
});
