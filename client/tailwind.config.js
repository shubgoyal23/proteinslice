/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      cormorant: ["Cormorant Garamond"],
      league: ["League Gothic"],
      poppins: ["Poppins"],
    },
  },
};
