/**
 * Utility functions for image optimization
 */

/**
 * Generate srcset for responsive images
 * @param baseUrl - Base URL of the image
 * @param widths - Array of widths to generate
 * @returns srcset string
 */
export const generateSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths
    .map((width) => {
      // If using a CDN or image service, append width parameter
      // Example: `${baseUrl}?w=${width} ${width}w`
      return `${baseUrl} ${width}w`;
    })
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param breakpoints - Object with breakpoint sizes
 * @returns sizes string
 */
export const generateSizes = (breakpoints?: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string => {
  const defaults = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  };

  const sizes = { ...defaults, ...breakpoints };

  return `(max-width: 640px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`;
};

/**
 * Preload critical images
 * @param imageUrl - URL of the image to preload
 */
export const preloadImage = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = imageUrl;
  });
};

/**
 * Check if WebP is supported
 * @returns Promise that resolves to boolean
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};
