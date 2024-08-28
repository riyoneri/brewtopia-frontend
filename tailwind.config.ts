import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A27B5C",
        secondary: "#3F4E4F",
        tertiary: "#DCD7C9",
        accent: {
          yellow: "#FFA90B",
          green: "#22D7A6",
          red: "#F14C35",
          blue: "#129BFF",
          purple: "#5A3CF3",
        },
      },
      backgroundImage: {},
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [daisyui, tailwindScrollbar],
  daisyui: {
    themes: false,
    darkTheme: false,
    prefix: "dui-",
    logs: false,
  },
};
export default config;
