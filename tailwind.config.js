const forms = require("@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F70EF",
        "background-light": "#f6f7f8",
        // "background-light": "#F0F3FA",
        "background-dark": "#101c22",
        "text-light": "#101c22",
        "text-dark": "#f6f7f8",
        "text-muted-light": "#6b7280",
        "text-muted-dark": "#9ca3af",
        "icon-background-light": "#e5e7eb",
        "icon-background-dark": "#1f2937",
      },
      boxShadow: {
        elevation1: "0 1px 2px 0 rgba(0,51,160,0.15)",
      },
      fontFamily: {
        display: ["Nunito sans", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};
