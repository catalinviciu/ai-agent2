/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"neue-haas-grotesk"', 'sans-serif'],
        'neue-display': ['"Neue Haas Grotesk Display Std"', 'sans-serif'],
        'neue-text': ['"Neue Haas Grotesk Text Std"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
