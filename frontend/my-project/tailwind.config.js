/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'Harvard': "url('/images/Harvard.jpg')",
        'search' : "url('/images/search.jpg')"
      }
    },
  },
  plugins: [],
}