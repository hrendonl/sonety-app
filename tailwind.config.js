/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sonetyDark: {
          bg: '#121212',
          'secondary-bg': '#212121',
          text: '#e0e0e0',
          subtext: '#9e9e9e',
          accent: '#f57a0c',
          border: '#333333',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // permite usar la clase 'dark' para modo oscuro
}