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
          50: '#F8F9FA',
          100: '#F1F3F5',
        },
        // McKinsey Navy
        navy: {
          DEFAULT: '#003366',
          light: '#004080',
          dark: '#002244',
          50: '#E6EBF0',
          100: '#CCE0F0',
        },
        // Text colors - Professional hierarchy
        text: {
          DEFAULT: '#1A1A1A',
          secondary: '#4A5568',
          tertiary: '#718096',
          light: '#A0AEC0',
        },
        // McKinsey Teal - Accent
        accent: {
          DEFAULT: '#00A3A1',
          light: '#33B8B6',
          dark: '#008785',
          50: '#E6F7F7',
          100: '#B3E8E7',
          600: '#00A3A1',
          700: '#008785',
        },
        // Gold accent
        gold: {
          DEFAULT: '#C9A961',
          light: '#D4BA7F',
          dark: '#B89543',
        },
        // Border colors
        border: {
          DEFAULT: '#E2E8F0',
          light: '#EDF2F7',
          dark: '#CBD5E0',
        },
        // Semantic colors
        success: {
          DEFAULT: '#00A86B',
          light: '#D4F4E2',
          dark: '#008556',
        },
        error: {
          DEFAULT: '#C41E3A',
          light: '#F8E1E6',
          dark: '#9E1830',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        // Modular scale (1.333 ratio) for typography
        'xs': ['0.75rem', { lineHeight: '1.4' }],       // 12px - Caption/Meta
        'sm': ['0.875rem', { lineHeight: '1.5' }],      // 14px - Body Small
        'base': ['1rem', { lineHeight: '1.6' }],        // 16px - Body Regular
        'lg': ['1.125rem', { lineHeight: '1.7' }],      // 18px - Body Large
        'xl': ['1.5rem', { lineHeight: '1.4' }],        // 24px - H4
        '2xl': ['2.25rem', { lineHeight: '1.3' }],      // 36px - H3
        '3xl': ['3rem', { lineHeight: '1.2' }],         // 48px - H2
        '4xl': ['4.5rem', { lineHeight: '1.1' }],       // 72px - H1
      },
      spacing: {
        // Generous spacing scale (8px base unit)
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '36': '9rem',     // 144px
        '40': '10rem',    // 160px
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.3',
        'relaxed': '1.5',
        'comfortable': '1.6',
        'loose': '1.7',
      },
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'normal': '-0.01em',
        'slight': '-0.005em',
        'wide': '0.02em',
        'wider': '0.1em',
      },
      fontWeight: {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'black': '900',
      },
    },
  },
  plugins: [],
}
