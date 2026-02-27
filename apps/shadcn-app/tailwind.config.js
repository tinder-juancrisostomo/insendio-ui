/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shadcn/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/typography/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/insendio-app/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
