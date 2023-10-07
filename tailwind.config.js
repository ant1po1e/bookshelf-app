/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './dist/js/*.js'],
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        softblue: "#f9fbfc",
        blue: "#3a38ff",
        softpurple: "#e5e4ff",
        navy: "#111849",
        darkgrey: "#949293",
        darkgrey2: "#e7ebed",
        grey: "#dfe2e7",
        purple: "#6261d8",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
}

