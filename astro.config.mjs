// @ts-check
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  integrations: [sitemap()],
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
  },
});
