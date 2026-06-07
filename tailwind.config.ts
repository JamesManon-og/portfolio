import type { Config } from "tailwindcss";

const config: Config = {
  // Only apply `hover:` styles on devices that actually support hover, so
  // hover effects don't get "stuck" after a tap on touchscreens.
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#030604",
          subtle: "#060a07",
          card: "#080d09",
        },
        ink: {
          DEFAULT: "#d8ffe0",
          dim: "#7fbf8b",
          dimmer: "#3f6a48",
        },
        line: {
          DEFAULT: "rgba(74,222,128,0.12)",
          strong: "rgba(74,222,128,0.22)",
        },
        phosphor: {
          50: "#e8ffec",
          100: "#c4ffd0",
          200: "#86ffa1",
          300: "#4ade80",
          400: "#22c55e",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          DEFAULT: "#4ade80",
          glow: "rgba(74,222,128,0.55)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        scan: "scan 8s linear infinite",
        flicker: "flicker 5s steps(2, end) infinite",
        "crt-flicker": "crtFlicker 0.15s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.6" },
        },
        crtFlicker: {
          "0%": { opacity: "0.95" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.97" },
        },
      },
      boxShadow: {
        phosphor:
          "0 0 0 1px rgba(74,222,128,0.18), 0 0 24px -4px rgba(74,222,128,0.35), 0 0 64px -16px rgba(74,222,128,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
