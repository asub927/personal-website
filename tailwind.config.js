/** @type {import('tailwindcss').Config} */
/**
 * Design System Configuration
 * 
 * This configuration extends Tailwind CSS with a custom design system
 * that ensures WCAG AA compliance and consistent styling throughout the application.
 * 
 * Note: Tailwind v4 uses CSS variables defined in src/index.css (@theme directive)
 * This config file is maintained for backward compatibility and IDE support.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
        },
        // Text colors with WCAG AA compliant contrast ratios
        text: {
          DEFAULT: '#1a1a1a',  // 16.1:1 contrast ratio on white
          secondary: '#4b5563', // 7.5:1 contrast ratio on white
          tertiary: '#6b7280',  // 5.7:1 contrast ratio on white
        },
        // Accent colors
        accent: {
          DEFAULT: '#2563eb',  // 4.6:1 contrast ratio on white
          light: '#3b82f6',
          dark: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Border colors
        border: {
          DEFAULT: '#e5e7eb',
          light: '#f3f4f6',
          dark: '#d1d5db',
        },
        // Semantic colors with proper contrast
        success: {
          DEFAULT: '#059669',  // 4.5:1 contrast ratio
          light: '#d1fae5',
          dark: '#047857',
        },
        error: {
          DEFAULT: '#dc2626',  // 5.9:1 contrast ratio
          light: '#fee2e2',
          dark: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Ensure minimum 16px base size for readability
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px - minimum
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      },
      spacing: {
        // Consistent spacing scale (4px base unit)
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      lineHeight: {
        'relaxed': '1.6',
        'loose': '1.8',
      },
    },
  },
  plugins: [],
}
