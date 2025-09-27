import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // You can extend shadcn-like tokens here later
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      }
    },
  },
  plugins: [],
} satisfies Config