import rss from '@astrojs/rss';
const SITE_TITLE = 'Nick Winans';
const SITE_DESCRIPTION = `Hey! I'm Nick. I'm a software engineer and keyboard hobbyist turned business owner.`;

export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: import.meta.glob('./blog/**/*.mdx'),
	});
