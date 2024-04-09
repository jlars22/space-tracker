/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        red: {
          600: "#FF5733",
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
