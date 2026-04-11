import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06070B",
        panel: "#0D1020",
        line: "#1F263A",
        steel: "#D2D8E8",
        iris: "#9A8CFF",
        cobalt: "#80A7FF"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(154, 140, 255, 0.22), 0 26px 60px -24px rgba(86, 120, 255, 0.5)"
      },
      backgroundImage: {
        "radial-premium":
          "radial-gradient(circle at 18% -5%, rgba(120, 108, 255, 0.22), transparent 38%), radial-gradient(circle at 86% 12%, rgba(104, 151, 255, 0.18), transparent 36%)"
      }
    }
  },
  plugins: []
};

export default config;
