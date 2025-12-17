/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "great-vibes": ['"Great Vibes"', "cursive"],
        playwrite: ['"Playwrite US Modern"', "Arial", "sans-serif"],
      },
      colors: {
        "navidad-rojo": "#b52f1c",
        "navidad-azul-oscuro": "#1e3843",
        "navidad-azul-medio": "#295361",
        "navidad-azul-claro": "#3a6f82",
      },
    },
  },
  plugins: [],
};
