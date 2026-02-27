/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/daisyui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/typography/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/insendio-app/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
