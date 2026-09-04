/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(200, 70%, 45%)', // blue accent
          dark: 'hsl(200, 70%, 35%)',
        },
        background: {
          light: 'hsl(210, 20%, 98%)',
          dark: 'hsl(210, 20%, 12%)',
        },
        foreground: {
          light: 'hsl(210, 15%, 20%)',
          dark: 'hsl(210, 15%, 90%)',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideUp: 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
