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
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
