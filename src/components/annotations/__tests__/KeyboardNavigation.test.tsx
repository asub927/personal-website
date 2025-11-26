import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnnotationMarker } from '../AnnotationMarker';
import { AnnotationSidebar } from '../AnnotationSidebar';
import { Annotation } from '../../../types';

describe('Keyboard Navigation', () => {
  const mockAnnotation: Annotation = {
    id: 'test-1',
    title: 'Test Annotation',
    content: 'Test content',
    position: 100,
  };

  describe('AnnotationMarker keyboard events', () => {
    it('should toggle annotation when Enter key is pressed', async () => {
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

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should toggle annotation when Space key is pressed', async () => {
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

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should close annotation when Escape key is pressed and annotation is active', async () => {
      const user = userEvent.setup();
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
      button.focus();
      await user.keyboard('{Escape}');

      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it('should not trigger toggle when Escape is pressed on inactive annotation', async () => {
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

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Escape}');

      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('Tab navigation between annotations', () => {
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

    it('should allow Tab navigation between annotation markers', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const buttons = screen.getAllByRole('button');

      // Focus first button
      buttons[0].focus();
      expect(document.activeElement).toBe(buttons[0]);

      // Tab to second button
      await user.keyboard('{Tab}');
      expect(document.activeElement).toBe(buttons[1]);

      // Tab to third button
      await user.keyboard('{Tab}');
      expect(document.activeElement).toBe(buttons[2]);
    });

    it('should allow Shift+Tab navigation backwards between annotation markers', async () => {
      const user = userEvent.setup();
      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={mockAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const buttons = screen.getAllByRole('button');

      // Focus third button
      buttons[2].focus();
      expect(document.activeElement).toBe(buttons[2]);

      // Shift+Tab to second button
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(document.activeElement).toBe(buttons[1]);

      // Shift+Tab to first button
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(document.activeElement).toBe(buttons[0]);
    });
  });
});
