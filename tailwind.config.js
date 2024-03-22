/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-outer": "#262626",
        "bg-main": "#2e2e2e",
        "text-colour-secondary": "#cbcbcb",
        "text-colour-primary": "#f5f5f5",
      },
      spacing: {},
      fontFamily: {
        "body-text-small": "Rubik",
      },
    },
    fontSize: {
      sm: "14px",
      xl: "20px",
      base: "16px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
