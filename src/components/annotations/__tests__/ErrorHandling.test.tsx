import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { AnnotationSidebar } from '../AnnotationSidebar';
import { Annotation } from '../../../types';

describe('Error Handling', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('Invalid annotation data validation', () => {
    it('should log warning and skip annotation with missing id', () => {
      const invalidAnnotations = [
        {
          id: '',
          content: 'Valid content',
          position: 100,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid annotation detected'),
        expect.anything()
      );

      // Should not render any markers
      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(0);
    });

    it('should log warning and skip annotation with missing content', () => {
      const invalidAnnotations = [
        {
          id: 'test-1',
          content: '',
          position: 100,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid annotation detected'),
        expect.anything()
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(0);
    });

    it('should log warning and skip annotation with invalid position', () => {
      const invalidAnnotations = [
        {
          id: 'test-1',
          content: 'Valid content',
          position: NaN,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid annotation detected'),
        expect.anything()
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(0);
    });

    it('should log warning and skip annotation with negative position', () => {
      const invalidAnnotations = [
        {
          id: 'test-1',
          content: 'Valid content',
          position: -100,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('negative position')
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(0);
    });

    it('should log warning for extremely large position values', () => {
      const invalidAnnotations = [
        {
          id: 'test-1',
          content: 'Valid content',
          position: 60000,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('unusually large position')
      );
    });

    it('should render valid annotations and skip invalid ones', () => {
      const mixedAnnotations = [
        {
          id: 'valid-1',
          content: 'Valid content 1',
          position: 100,
        } as Annotation,
        {
          id: '',
          content: 'Invalid - no id',
          position: 200,
        } as Annotation,
        {
          id: 'valid-2',
          content: 'Valid content 2',
          position: 300,
        } as Annotation,
        {
          id: 'invalid-3',
          content: '',
          position: 400,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={mixedAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // Should render only 2 valid annotations
      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(2);

      // Should log warnings for invalid annotations (at least 2)
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(consoleWarnSpy.mock.calls.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Fallback behavior', () => {
    it('should return null when all annotations fail validation', () => {
      const invalidAnnotations = [
        {
          id: '',
          content: 'No id',
          position: 100,
        } as Annotation,
        {
          id: 'test-2',
          content: '',
          position: 200,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // Should not render sidebar at all
      const sidebar = container.querySelector('.annotation-sidebar');
      expect(sidebar).not.toBeInTheDocument();

      // Should log warning about all annotations failing
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('All 2 annotation(s) failed validation')
      );
    });

    it('should return null when annotations array is empty', () => {
      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={[]}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const sidebar = container.querySelector('.annotation-sidebar');
      expect(sidebar).not.toBeInTheDocument();
    });

    it('should handle null or undefined annotation properties gracefully', () => {
      const invalidAnnotations = [
        {
          id: null,
          content: 'Content',
          position: 100,
        } as unknown as Annotation,
        {
          id: 'test-2',
          content: null,
          position: 200,
        } as unknown as Annotation,
        {
          id: 'test-3',
          content: 'Content',
          position: undefined,
        } as unknown as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={invalidAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      // Should not render any markers
      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(0);

      // Should log warnings for all invalid annotations
      expect(consoleWarnSpy).toHaveBeenCalledTimes(4); // 3 invalid + 1 all failed
    });
  });

  describe('Edge cases', () => {
    it('should handle annotation with only required fields', () => {
      const minimalAnnotations = [
        {
          id: 'test-1',
          content: 'Minimal content',
          position: 100,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={minimalAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(1);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should handle annotation with position at boundary (0)', () => {
      const boundaryAnnotations = [
        {
          id: 'test-1',
          content: 'Content at top',
          position: 0,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={boundaryAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(1);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should handle annotation with very large but valid position', () => {
      const largePositionAnnotations = [
        {
          id: 'test-1',
          content: 'Content far down',
          position: 45000,
        } as Annotation,
      ];

      const onToggle = vi.fn();

      const { container } = render(
        <AnnotationSidebar
          annotations={largePositionAnnotations}
          activeAnnotationId={null}
          onToggle={onToggle}
        />
      );

      const markers = container.querySelectorAll('.annotation-marker');
      expect(markers.length).toBe(1);
      // Should still render but may log a warning
    });
  });
});
