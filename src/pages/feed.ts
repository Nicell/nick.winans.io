import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { parse } from "node-html-parser";
import { getImage } from "astro:assets";
const parser = new MarkdownIt();
const imageImports = import.meta.glob("../blog/**/*.{jpeg,jpg,png,gif,webp}");

async function postContent(context, post) {
  const body = parser.render(post.body);
  const html = parse(body);
  const images = html.querySelectorAll("img");

  for (const img of images) {
    const src = img.getAttribute("src")!;

    if (src.startsWith("./")) {
      const imagePath = `../blog/${post.id}/${src.slice(2)}`;
      const image = (await imageImports[imagePath]())?.default;

      if (image) {
        const optimizedImg = await getImage({ src: image });
        img.setAttribute("src", `${context.site}${optimizedImg.src.slice(1)}`);
      }
    }
  }

  return sanitizeHtml(html.toString(), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
}

export async function GET(context) {
  const blog = await getCollection("blog");
  blog.sort((a, b) => b.data.pubDate - a.data.pubDate);

  const feed = []
  for (const post of blog) {
    feed.push({
      link: `/blog/${post.id}/`,
      content: await postContent(context, post),
      ...post.data,
    })
  }

  return rss({
    title: "Nick Winans",
    description: "A blog by Nick Winans",
    site: context.site,
    stylesheet: "/styles.xsl",
    items: feed,
  });
}
