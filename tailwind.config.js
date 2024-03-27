/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-outer": "var(--bg-outer)",
        "bg-main": "var(--bg-main)",
        "bg-main-transparent": "var(--bg-main-transparent)",
        "text-colour-secondary": "var(--text-colour-secondary)",
        "text-colour-primary": "var(--text-colour-primary)",
        "primary-colour": "rgba(13, 170, 226, 1)",
        "forecast-colour": "var(--forecast-colour)",
        "secondary-colour": "rgba(14, 38, 60, 1)",
        "secondary-colour-hover": "rgb(24, 65, 103)",
        "red": "var(--red)",
        "green": "var(--green)",
      },
      boxShadow: {
        'inner-menu': 'var(--shadow-inner-menu)',
      },
      backgroundImage: theme => ({
        'primaryGradient1': 'linear-gradient(to right, #6ED1F4, #0DAAE2)',
        'greenGradient': 'linear-gradient(to right, rgba(6, 73, 0, 0.1), rgba(14, 175, 0, 0.3))',
        'redGradient': 'linear-gradient(to right, rgba(255, 61, 49, 0.05), rgba(255, 61, 49, 0.25))',
      }),
      // Extending fontFamily
      fontFamily: {
        // Existing custom font family
        "body-text-small": ["Rubik", "Helvetica", "sans-serif"],
        // Adding new font families from Figma
        rubik: ["Rubik", "Helvetica", "sans-serif"],
      },
      // Extending fontSize
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }], // Extra small text
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // Small text
        base: ['1rem', { lineHeight: '1.5rem' }], // Base text size for mobile
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // Large text
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // Extra large text
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 2x large text
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 3x large text
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 4x large text
        '5xl': ['3rem', { lineHeight: '1' }], // 5x large text
        '6xl': ['3.75rem', { lineHeight: '1' }], // 6x large text
        '7xl': ['4.5rem', { lineHeight: '1' }], // 7x large text
        '8xl': ['6rem', { lineHeight: '1' }], // 8x large text
        '9xl': ['8rem', { lineHeight: '1' }],  // 9x large text
      },
      // You can also extend lineHeight, fontWeight, letterSpacing as needed
      fontWeight: {
        light: 200,
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
    screens: {
      'sm': '768px', 
      'md': '768px', 
      'lg': '1024px', 
      'xl': '1280px', 
      '2xl': '1536px', 
      '3xl': '1920px', 
    },
  },
  corePlugins: {
    preflight: false,
  },
};
