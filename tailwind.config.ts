import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
        warn: "var(--warn)",
        success: "var(--success)",
        "brand-red": "#D2232A",
        "brand-navy": "#0B4C8C",
        "brand-green": "#009444",
        "brand-amber": "#F9A01B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "800" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "heading-xl": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading-lg": ["clamp(1.375rem, 2vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "heading-md": ["clamp(1.125rem, 1.5vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "0em", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.65", fontWeight: "400" }],
        "body-md": ["clamp(0.875rem, 1vw, 1rem)", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["clamp(0.75rem, 0.875vw, 0.875rem)", { lineHeight: "1.55", fontWeight: "400" }],
        "label-xs": ["clamp(0.625rem, 0.75vw, 0.75rem)", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;
