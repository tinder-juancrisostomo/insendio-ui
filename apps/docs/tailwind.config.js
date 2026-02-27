/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shadcn/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/hero-ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/daisyui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/mui/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ds: {
          'bg-page': 'var(--ds-bg-page)',
          'bg-surface': 'var(--ds-bg-surface)',
          'text-primary': 'var(--ds-text-primary)',
          'text-secondary': 'var(--ds-text-secondary)',
          'text-link': 'var(--ds-text-link)',
          'border-default': 'var(--ds-border-default)',
          'focus': 'var(--ds-border-focus)',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
