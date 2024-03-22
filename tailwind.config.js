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
        "primary-colour": "rgba(13, 170, 226, 1)",
        "secondary-colour": "rgba(14, 38, 60, 1)",
        "secondary-colour-hover": "rgb(24, 65, 103)",
        "text-colour-main": "rgba(55, 55, 55, 1)",
      },
      // Extending fontFamily
      fontFamily: {
        // Existing custom font family
        "body-text-small": ["Rubik", "Helvetica", "sans-serif"],
        // Adding new font families from Figma
        rubik: ["Rubik", "Helvetica", "sans-serif"],
      },
      // Extending fontSize
      fontSize: {
        // Existing custom font sizes
        sm: "14px",
        xl: "20px",
        base: "16px",
        inherit: "inherit",
        // Adding new font sizes from Figma
        "body-lg-mob": "18px",
        "body-md-mob": "14px",
        "body-sm-mob": "11px",
        "body-text-large": "20px",
        "body-text-medium": "16px",
        "body-text-small": "14px", // Note: This was already defined, consider if you need to adjust
        "body-text-xsmall": "11px",
        h1: "90px",
        "h1-mob": "28px",
        h2: "32px",
        h3: "28px",
        "h3-mob": "20px",
        h4: "25px",
        "h4-mob": "20px",
      },
      // You can also extend lineHeight, fontWeight, letterSpacing as needed
      fontWeight: {
        normal: 400,
        semibold: 600,
        // Define any custom weights from Figma if needed
      },
      lineHeight: {
        normal: "normal",
        // Define custom line heights from Figma if needed
      },
      letterSpacing: {
        normal: "0px",
        // Define custom letter spacings from Figma if needed
      },
      // Any other extensions from Figma...
    },
  },
  corePlugins: {
    preflight: false,
  },
};
