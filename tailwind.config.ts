import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "#EAEAEA",
        text_dark: "#444444",
        primary: "#F30067",
        secondary: "#00D1CD",
        danger: "#808080",
      },
    },
  },
  plugins: [],
};
export default config;
