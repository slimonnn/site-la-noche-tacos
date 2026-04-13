/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff6e8",
          100: "#ffe9c2",
          300: "#ffc15a",
          500: "#ff8a1f",
          700: "#df4e17",
          900: "#7d1f0f",
        },
        chili: "#b42318",
        corn: "#ffd166",
        crema: "#fff8ef",
        ink: "#2f1d14",
      },
      boxShadow: {
        float: "0 18px 45px rgba(125, 31, 15, 0.18)",
      },
    },
  },
  plugins: [],
};
