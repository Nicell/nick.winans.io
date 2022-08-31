import rss from '@astrojs/rss';
const SITE_TITLE = 'Nick Winans';
const SITE_DESCRIPTION = `I'm Nick. I design and build web apps. You can find some of my skills and projects here. I'm constantly learning, so I can refine my user interfaces, make my code easier to maintain, and optimize my deployments.`;

export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: import.meta.glob('./blog/**/*.md'),
	});
