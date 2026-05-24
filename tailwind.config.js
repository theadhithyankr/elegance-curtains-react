/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Theme-aware tokens — values come from CSS variables in index.css,
           flipped by [data-theme="light"]. Names keep their semantic role:
           obsidian = base surface, warmwhite = primary text, champagne = accent. */
        obsidian: 'rgb(var(--c-obsidian) / <alpha-value>)',
        onyx: 'rgb(var(--c-onyx) / <alpha-value>)',
        coal: 'rgb(var(--c-coal) / <alpha-value>)',
        smoke: 'rgb(var(--c-smoke) / <alpha-value>)',
        champagne: 'rgb(var(--c-champagne) / <alpha-value>)',
        warmwhite: 'rgb(var(--c-warmwhite) / <alpha-value>)',
        void: 'rgb(var(--c-void) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
    },
  },
  plugins: [],
};
