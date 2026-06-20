import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        light: {
          bg: '#FAF9F6',
          text: '#1A1A1A',
        },
        dark: {
          bg: '#0A0A0A',
          text: '#E8E4DF',
        },
      },
    },
  },
  plugins: [],
};

export default config;