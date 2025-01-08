/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        easy: "repeat(15, 1fr)",
        medium: "repeat(17, 1fr)",
        hard: "repeat(20, 1fr)",
        "easy-responsive": "repeat(10, 1fr)",
      },
    },
  },
  plugins: [],
};
