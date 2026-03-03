import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        dark: {
          900: "#0A0A0F",
          800: "#111118",
          700: "#1A1A25",
          600: "#252533",
        },
        neon: {
          cyan: "#00FFFF",
          magenta: "#FF00FF",
          blue: "#3B82F6",
          pink: "#EC4899",
          purple: "#a955ff",
          mint: "#80FF72",
          orange: "#FF9966",
        },
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "border-beam": "borderBeam 4s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 255, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(0, 255, 255, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        borderBeam: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
