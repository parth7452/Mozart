import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        paper: "#f3f4f6",
        cream: "#ffffff",
        rule: "#e5e7eb",
        crimson: "#b91c1c",
        pass: "#047857",
        review: "#b45309",
        fail: "#b91c1c",
        stone: "#F3EEE4",
        soot: "#141210",
        ledger: "#1A3C32",
        brass: "#9A7348",
        hairline: "#D6CDBE",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
        marketing: [
          "var(--font-marketing-sans)",
          "IBM Plex Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: ["var(--font-marketing-serif)", "Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
