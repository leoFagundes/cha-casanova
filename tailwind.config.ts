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
        cream: "#faf6f0",
        "warm-white": "#fffdf9",
        blush: "#e8c4b0",
        rose: "#c9866d",
        "deep-rose": "#a05c47",
        terracotta: "#8b4a35",
        sage: "#8a9e89",
        dark: "#2c1e1a",
        "text-main": "#4a3028",
        "text-light": "#7a5c52",
        gold: "#c9a96e",
        "gold-light": "#e8d4b0",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        jost: ["var(--font-jost)", "sans-serif"],
      },
      animation: {
        drift: "drift 12s ease-in-out infinite alternate",
        "drift-reverse": "drift 15s ease-in-out infinite alternate-reverse",
        fadeUp: "fadeUp 0.8s forwards",
        scrollDot: "scrollDot 1.8s ease-in-out infinite",
        steamRise: "steamRise 1.8s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          from: { transform: "translate(0,0) scale(1)" },
          to: { transform: "translate(30px,20px) scale(1.05)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollDot: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)", opacity: "1" },
          "80%": { transform: "translateX(-50%) translateY(10px)", opacity: "0" },
        },
        steamRise: {
          "0%, 100%": { opacity: "0", transform: "translateY(0)" },
          "30%": { opacity: "0.7" },
          "80%": { opacity: "0", transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
