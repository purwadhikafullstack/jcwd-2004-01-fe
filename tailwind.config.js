/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackPrimary: "#1A191B",
        grayDisable: "#ACADAF",
        bluesky: "#ffe3b7",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    require("daisyui"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
