import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        origo: {
          black: "#0a0a0a",
          charcoal: "#111111",
          gold: "#febe5d",
          "gold-glow": "rgba(254, 190, 93, 0.15)",
          white: "#ffffff",
          grey: "#a3a3a3",
          border: "#262626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Manrope", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(254, 190, 93, 0.3)",
        laser: "0 0 10px #febe5d",
      },
      backdropBlur: {
        luxury: "40px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;