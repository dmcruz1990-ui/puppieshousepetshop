import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Turquesa de la marca (texto, bordes y superficies oscuras)
        brand: {
          50: "#eff8f7",
          100: "#d6efeb",
          200: "#b0e0d9",
          300: "#7fccc3",
          400: "#48b0a6",
          500: "#2b9489",
          600: "#237b72",
          700: "#21645d",
          800: "#20524d",
          900: "#1c423e",
          950: "#0e2625",
        },
        // Turquesa vibrante para botones y acentos principales
        accent: {
          50: "#e8faf6",
          100: "#c6f2ea",
          200: "#93e5da",
          300: "#5bd5c7",
          400: "#2cbfb2",
          500: "#15a99b",
          600: "#0e8e82",
          700: "#0c726a",
        },
        // Morado de la marca (formulario "Solicita información")
        grape: {
          50: "#f7eaf7",
          100: "#eed1ef",
          200: "#dca7de",
          300: "#c574c8",
          400: "#a647aa",
          500: "#86278b",
          600: "#6f1d74",
          700: "#5a1760",
          800: "#49134e",
          900: "#3b0f40",
        },
        cream: "#f4fbfa",
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
