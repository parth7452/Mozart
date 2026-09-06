import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1714",
        paper: "#f4efe6",
        cream: "#fbf7f0",
        rule: "#d8cfc0",
        crimson: "#9b1d2e",
        gold: "#a67c2d",
        pass: "#2f6d4f",
        review: "#8a6414",
        fail: "#9b1d2e",
      },
      fontFamily: {
        serif: ["Fraunces", "Iowan Old Style", "Palatino", "Georgia", "serif"],
        sans: ["IBM Plex Sans", "Helvetica Neue", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
