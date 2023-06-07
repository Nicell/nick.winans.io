/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Geologica", "Geologica Fallback", "ui-sans-serif", "system-ui"],
      mono: ["JetBrains Mono", "monospace"],
      display: ["Lexend Deca", "Lexend Deca Fallback", "ui-sans-serif", "system-ui"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ['light', 'night']
  }
};
