import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnotationSidebar } from '../AnnotationSidebar';
import { Annotation } from '../../../types';

describe('AnnotationSidebar', () => {
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
    {
      id: 'annotation-3',
      title: 'Third Annotation',
      content: 'Third content',
      position: 500,
    },
  ];

  describe('Only one annotation open at a time', () => {
    it('should only have one annotation expanded at a time', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-1"
          onToggle={onToggle}
        />
      );

      // First annotation should be expanded
      const firstButton = screen.getByRole('button', { name: /collapse annotation: first annotation/i });
      expect(firstButton).toHaveTextContent('−');

      // Second annotation should be collapsed
      const secondButton = screen.getByRole('button', { name: /expand annotation: second annotation/i });
      expect(secondButton).toHaveTextContent('+');

      // Click second annotation
      await user.click(secondButton);

      // onToggle should be called with the second annotation's id
      expect(onToggle).toHaveBeenCalledWith('annotation-2');
    });

    it('should render all annotations with correct initial states', () => {
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId="annotation-2"
          onToggle={onToggle}
        />
      );

      // First annotation should be collapsed
      const firstButton = screen.getByRole('button', { name: /expand annotation: first annotation/i });
      expect(firstButton).toHaveTextContent('+');

      // Second annotation should be expanded
      const secondButton = screen.getByRole('button', { name: /collapse annotation: second annotation/i });
      expect(secondButton).toHaveTextContent('−');

      // Third annotation should be collapsed
      const thirdButton = screen.getByRole('button', { name: /expand annotation: third annotation/i });
      expect(thirdButton).toHaveTextContent('+');
    });

    it('should allow toggling between different annotations', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // All annotations should be collapsed initially
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveTextContent('+');
      });

      // Click first annotation
      await user.click(buttons[0]);
      expect(onToggle).toHaveBeenCalledWith('annotation-1');

      // Click third annotation
      await user.click(buttons[2]);
      expect(onToggle).toHaveBeenCalledWith('annotation-3');
    });
  });
});
