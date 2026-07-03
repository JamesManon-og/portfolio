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
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-typewriter-body)", "Courier New", "monospace"],
        display: ["var(--font-typewriter)", "Courier New", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      colors: {
        // Kraft evidence board
        bg: {
          DEFAULT: "#b1946b",
          subtle: "#a8895f",
          card: "#9c7d55",
          deep: "#7d6242",
        },
        // Cream paper scraps
        paper: {
          DEFAULT: "#f2e8cf",
          aged: "#e9dcb8",
          dark: "#ddcca2",
          edge: "#c9b485",
        },
        // Typewriter ink
        ink: {
          DEFAULT: "#2e2418",
          dim: "#57452f",
          dimmer: "#7d6a4f",
        },
        line: {
          DEFAULT: "rgba(46,36,24,0.22)",
          strong: "rgba(46,36,24,0.4)",
        },
        // "KEEP CONFIDENTIAL" rubber-stamp red
        stamp: {
          DEFAULT: "#9b2c20",
          bright: "#b53a2c",
          dark: "#6f1d15",
          faded: "rgba(155,44,32,0.55)",
        },
        tape: "rgba(244,236,205,0.65)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "blink-caret": "blinkCaret 1s steps(2, start) infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        blinkCaret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        paper:
          "0 1px 2px rgba(46,36,24,0.18), 0 6px 16px -6px rgba(46,36,24,0.35)",
        "paper-lift":
          "0 2px 4px rgba(46,36,24,0.2), 0 14px 28px -10px rgba(46,36,24,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
