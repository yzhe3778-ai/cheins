/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1220",
        slate: "#1f2937",
        mist: "#94a3b8"
      }
    }
  },
  plugins: []
};
