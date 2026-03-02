/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Exclude my-app (nested Next.js) - only scan component files at src root
    '../../packages/shadcn-ui/src/*.{js,ts,jsx,tsx}',
    '../../packages/typography/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/insendio-app/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/charts/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
