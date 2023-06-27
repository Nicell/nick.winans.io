import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkReadingTime } from './remark-reading-time.mjs';
import {h, s} from 'hastscript'
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch"; 

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  build: {
    inlineStylesheets: 'auto'
  },
  integrations: [tailwind(), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), robotsTxt(), prefetch(), mdx({
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'before',
      content: h('span.icon-link', [
        s('svg', {ariaHidden: true, width: 32, height: 32, xmlns: 'http://www.w3.org/2000/svg', viewbox: '0 0 640 523'}, [
          s('path', {fill: 'currentColor', d: 'M60.2 448.8a144.6 144.6 0 0 1 0-204.5l112.3-113.2a145.1 145.1 0 0 1 203.6 0c50 50 57.4 129.7 16.3 187.2l-1.1 1.6a32 32 0 0 1-52.1-37.2l1.1-1.6a80.6 80.6 0 0 0-122.6-103.9L105.5 289.5a80.6 80.6 0 0 0 103.8 122.6l1.6-2a33 33 0 0 1 44.6 8.3 32 32 0 0 1-7.4 44.7l-1.6 1.1a144.6 144.6 0 0 1-186.3-15.4z'}),
          s('path', {fill: 'currentColor', opacity: 0.4, d: 'M579.8 63.2a144.5 144.5 0 0 1 0 204.5L467.5 380a144.6 144.6 0 0 1-219.9-186.3l1.1-1.6c9.4-14.3 29.4-17.7 44.6-7.4 14.4 9.4 17.8 29.4 7.5 44.6l-1.1 1.6a80.7 80.7 0 0 0 122.6 103.9l112.2-112.3A80.6 80.6 0 0 0 430.7 99.9l-1.6 1.1a32.7 32.7 0 0 1-44.6-7.4 32 32 0 0 1 7.4-44.7l1.6-1a144.6 144.6 0 0 1 186.3 15.3z'})
        ])
      ]),
      properties: {ariaHidden: true, tabIndex: -1},
      group: h('section.heading-group')
  }]],
    remarkPlugins: [remarkReadingTime]
  })],
  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight'
    }
  }
});