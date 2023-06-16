/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        home: "url('./assets/bg.svg')",
        hero: "url('./assets/hero_illustration.webp')",
        homeMobile: "url('./assets/bg_mobile.webp')",
        glass: "url('./assets/glass.webp')",
      }),
      fontFamily: {
        sans: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
