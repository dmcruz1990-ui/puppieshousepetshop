import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf6f1",
          100: "#f3e9dd",
          200: "#e6d2bb",
          300: "#d6b591",
          400: "#c49467",
          500: "#b67c4c",
          600: "#a86a41",
          700: "#8a5337",
          800: "#714433",
          900: "#5d392c",
          950: "#321d16",
        },
        cream: "#fcfaf7",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
