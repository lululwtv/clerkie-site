import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))", 
      },
      colors: {
        theme: "#091928",
        menu: "#424242",
        textcolor: "#D7D7D7",
        click: "#424242",
        bordercolor: "#ABABAB",
        cfbg: '#DFEFFF',
        cft: "#3399FF",
        scfbg: "#DCFFE6",
        scft: "#19B444",
        checked: "#3399FF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
export default config;
