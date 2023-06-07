/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Geologica", "ui-sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
      display: ["Lexend Deca", "ui-sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ['light', 'night']
  }
};
