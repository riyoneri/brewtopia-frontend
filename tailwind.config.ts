import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
