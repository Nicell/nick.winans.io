import rss, { pagesGlobToRssItems } from '@astrojs/rss';
const SITE_TITLE = 'Nick Winans | Blog';
const SITE_DESCRIPTION = `Hey! I'm Nick. I'm a software engineer and keyboard hobbyist turned business owner.`;

export async function get(context) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: (
      await pagesGlobToRssItems(import.meta.glob("./blog/**/index.mdx"))
    ).sort(
      (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
    ),
    customData: `<language>en-us</language>`,
  });
}
