import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#5E17EB",
        "midnight-purple": "#2A105C",
        "grey-lightest": "#F6F6FC",
      },
      fontFamily: {
        spline: ["Spline Sans Mono", "Courier New"],
      },
    },
  },
  plugins: [],
} satisfies Config;
