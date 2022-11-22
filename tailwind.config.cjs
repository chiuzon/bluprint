/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        dark: {
          0: "#18181c",
          1: "#1b1a1f",
          2: "#222124",
          3: "#26262a",
          4: "#3b3b3f",
        },
      },
    },
  },
  plugins: [],
};
