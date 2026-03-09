/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'barlow': ['"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        'navy-dark': '#070b16',
        'gold': '#ffd700',
      },
    },
  },
  plugins: [],
};
