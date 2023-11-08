/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "near-white": "#F9FDFE",
      "gray-blue": "#BBD6E2",
      "light-blue": "#C6E7F6",
      "tailwind-blue": "#37BCF8",
      "dark-blue": "#00628E",
      "blue-black": "#00293B",
    },
    fontFamily: {
      sans: ["Inter"],
    },
  },
  plugins: [],
};
