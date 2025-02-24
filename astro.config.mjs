// @ts-check
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';
import rehypeSlug from "rehype-slug";
import rehypeHeadingAnchors from "./src/plugins/heading-anchors";

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  integrations: [sitemap()],
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  markdown: {
    rehypePlugins: [rehypeSlug, rehypeHeadingAnchors],
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
  },
});
