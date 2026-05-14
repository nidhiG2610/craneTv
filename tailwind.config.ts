import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Satoshi', 'sans-serif']
      },
      fontSize: {
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        sm: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
        base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1rem + 0.75vw, 1.5rem)',
        xl: 'clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem)'
      },
      colors: {
        page: '#F7F4EE',
        surface: '#FCFAF6',
        surface2: '#F0ECE4',
        ink: '#1C1C1E',
        muted: '#66625C',
        primary: '#0D6E75',
        primaryHover: '#0A575D',
        accent: '#C9960C'
      },
      borderColor: {
        soft: 'rgba(28,28,30,0.1)'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(23, 28, 33, 0.08)'
      },
      borderRadius: {
        panel: '1rem'
      }
    }
  },
  plugins: []
} satisfies Config;
