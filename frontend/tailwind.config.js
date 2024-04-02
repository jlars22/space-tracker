/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        blue: {
          900: "#0036ad",
          800: "#1440c5",
          700: "#1c48dc",
          600: "#2757f7",
          400: "#3061f6",
          300: "#4675f5",
          200: "#6d95f6",
          100: "#a1bbf7",
        },
        gray: {
          900: "#1e2124",
          800: "#282b30",
          700: "#36393e",
          600: "#424549",
        },
      },
    },
  },
  plugins: [],
});
