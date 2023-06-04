import { type Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        custom: "15px",
      },
      colors: {
        light: "#FAFAFA",
        midnight: "#121212",
        midnightLight: "#1D1D1D",
      },
    },
  },
  plugins: [],
} satisfies Config
