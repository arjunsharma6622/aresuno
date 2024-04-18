/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          "light-blue-500": "#2563EB",
          "light-blue-700": "#134cc9",
          "salmon-500": "#FDEEFF",
          "teal-500": "#C5FFB6",
          "sky-500": "#36B7FF",
          neutral: "#787878",
          "neutral-light": "#D5D5D5",
          "warning-red": "#FF5858",
          "allowing-green": "#34A853",
        },
      },
      gridTemplateColumns: {
        "auto-32": "repeat(auto-fit, minmax(32px, 10fr))",
        "auto-150": "repeat(auto-fit, minmax(150px, 10fr))",
        "auto-250": "repeat(auto-fit, minmax(250px, 10fr))",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};
