/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: 'var(--color-yellow)', dark: 'var(--color-yellow-dark)' },
        dark: {
          DEFAULT: 'var(--color-bg)',
          card: 'var(--color-card)',
          row: 'var(--color-row)',
          border: 'var(--color-border)',
        },
        surface: 'var(--color-surface)',
        theme: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          faint: 'var(--color-text-faint)',
        },
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
