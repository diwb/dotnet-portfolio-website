import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./tools/**/*.ts"],
  theme: {
    extend: {
      colors: {
        surface: "#0d1117",
        panel: "#141b24",
        ink: "#e7edf5",
        muted: "#9fb0c2",
        accent: "#39d0a4",
        amber: "#f5b74f",
        line: "rgba(231,237,245,0.14)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(57,208,164,0.22), 0 24px 80px rgba(0,0,0,0.36)"
      }
    }
  },
  plugins: []
};

export default config;
