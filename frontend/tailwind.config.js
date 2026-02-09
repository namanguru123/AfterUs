/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#072D44',
        secondary: '#064469',
        accent: '#5790AB',
        light: '#9CCDDB',
        neutral: '#D0D7E1',
      },
    },
  },
  plugins: [],
}
