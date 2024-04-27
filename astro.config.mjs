import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import { h, s } from "hastscript";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from "@shikijs/transformers";
import { addCopyButton } from "./shiki-transformer-copy-button.mjs";
import sectionize from "@hbsnow/rehype-sectionize";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://nick.winans.io",
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt(),
    icon(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        sectionize,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "before",
            content: h("span.icon-link.text-primary", [
              s(
                "svg",
                {
                  ariaHidden: true,
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 448 512",
                },
                [
                  s("path", {
                    fill: "currentColor",
                    d: "M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z",
                  }),
                ]
              ),
            ]),
            properties: { ariaHidden: true, tabIndex: -1 },
            group: h("div.heading-group.font-display"),
          },
        ],
      ],
      remarkPlugins: [remarkReadingTime],
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-palenight",
      },
      transformers: [
        transformerMetaHighlight(),
        transformerMetaWordHighlight(),
        addCopyButton(),
      ],
    },
  },
  prefetch: true,
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
