import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#5E17EB",
        "midnight-purple": "#2A105C",
        "grey-lightest": "#F6F6FC",
        screw: "#C6C2D4",
        spray: "#F6F6FC",
        pewter: "#6D687E",
        roseway: "#FFC2E7",
        "near-black": "#0E0526",
      },
      fontFamily: {
        spline: ["Spline Sans Mono", "Courier New"],
      },
    },
  },
  plugins: [],
} satisfies Config;
