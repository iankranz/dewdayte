import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pewrple: "#5E17EB",
      },
      fontFamily: {
        spline: ["Spline Sans Mono", "Courier New"],
      },
    },
  },
  plugins: [],
} satisfies Config;
