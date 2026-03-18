/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: '#F5C518', dark: '#d4a800' },
        dark: { DEFAULT: '#1a1a1a', card: '#2c2c2c', row: '#333333', border: '#444444' }
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
