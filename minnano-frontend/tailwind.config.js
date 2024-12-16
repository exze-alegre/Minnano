/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  colors: {
    red: {
      100: "#f8d7da",
      200: "#f5c6cb",
      300: "#f1aeb2",
      400: "#e76a6a",
      500: "#dc3545", // This is the default red in Bootstrap
      600: "#c82333",
      700: "#bd2130",
      800: "#9b1c2f",
      900: "#721c24",
    },
  },
  plugins: [],
};
