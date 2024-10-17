/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'courier': ['"Courier New"', 'monospace'],
      },
      colors: {
        txt_main: "#ebebeb",
        txt_secondary: "#888888",
        bg_main: "#111111",
      },
    },
  },
  plugins: [],
}