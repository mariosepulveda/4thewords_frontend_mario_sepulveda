import Button from './src/components/Button';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          inika: ["Inika", "serif"], //fuentes personalizadas
          sans: ["Open Sans", "sans-serif"],
        },
      },
    },
    typography: {
      DEFAULT: {
        css: {
          h1: {
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#1a202c",
          },
          h2: {
            fontSize: "1.875rem",
            fontWeight: "semibold",
            color: "#0d5988",
            
          },
          button: {
          }
        },
      },
    },
    plugins: [],
  };