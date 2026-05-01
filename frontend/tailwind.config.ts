import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          green: "#0B3D2E",
          emerald: "#116149",
          mint: "#D9F6EC",
          black: "#121514",
          red: "#C8102E",
          teal: "#12B8A6",
          blue: "#1677FF",
          line: "#DCE7E2",
          soft: "#F6FAF8",
        },
      },
      boxShadow: {
        soft: "0 18px 50px rgba(8, 40, 32, 0.11)",
        panel: "0 12px 30px rgba(11, 61, 46, 0.08)",
      },
      fontFamily: {
        sans: [
          "Tahoma",
          "Arial",
          "Helvetica Neue",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
