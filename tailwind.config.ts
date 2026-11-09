import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#0a0a0f", neon: { purple: "#a855f7", cyan: "#22d3ee" } },
    },
  },
  plugins: [],
};

export default config;
