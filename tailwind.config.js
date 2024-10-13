/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'courier': ['"Courier New"', 'monospace'], // Aggiungi la font-family qui
      },
    },
  },
  plugins: [],
}