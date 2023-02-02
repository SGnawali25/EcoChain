/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('../public/landingPage.svg')",
        backgroundImage: "url('../public/bgImage.svg')",
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
