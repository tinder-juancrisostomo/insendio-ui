/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/daisyui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/typography/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/insendio-app/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/charts/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-daisyui/dist/**/*.js',
    './node_modules/daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
