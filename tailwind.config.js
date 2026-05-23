/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Black-on-black palette with champagne accent */
        obsidian: '#070708',   // page base — deepest black
        onyx: '#0F0F11',       // primary dark surface
        coal: '#16161A',       // elevated surface (cards, footer top)
        smoke: '#22222A',      // borders, dividers
        champagne: '#C9A55C',  // accent
        warmwhite: '#FAF6F0',  // light text on dark
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
