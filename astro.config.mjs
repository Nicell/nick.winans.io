// @ts-check
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';
import rehypeSlug from "rehype-slug";
import rehypeHeadingAnchors from "./src/plugins/heading-anchors";
import copyAudioFiles from "./src/plugins/copy-audio";

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  trailingSlash: "always",
  integrations: [sitemap(), copyAudioFiles()],
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
