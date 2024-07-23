/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      keyframes: {
        slideDown:{
          '0%': {transform: "translateY(-10px)", opacity: '0'},
          '100%': {transform: "translateY(0px)", opacity: '1'}
        },
        slideUp: {
          '0%': {transform: "translateY(0px)", opacity: '1'},
          '100%': {transform: "translateY(-10px)", opacity: '0'}
        }
      },
      animation: {
        "slide-down": "slideDown 0.2s linear",
        "slide-up": "slideUp 0.2s linear"
      }
    },
  },
  plugins: [],
};
