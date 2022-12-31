/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "480px",
      md: "512px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
      "3xl": "1440px",
    },
    extend: {
      colors: {
        "cGray-100": "#FFFFFF",
        "cGray-200": "#EEEEEE",
        "cGray-300": "#B4B4B4",
        "cGray-400": "#7D7D7D",
        "cGray-500": "#333333",
      },
    },
  },
  plugins: [],
};
