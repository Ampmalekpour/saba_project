import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0f1420",
        panel: "#161b29",
        border: "#232a3b",
        online: "#22c55e",
        offline: "#64748b",
        warning: "#f59e0b",
        critical: "#ef4444",
      },
    },
  },
  plugins: [],
};

export default config;
