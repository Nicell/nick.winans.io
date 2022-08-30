import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  integrations: [tailwind(), sitemap(), mdx({
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
  })],
});