import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

const rehypeHeadingAnchors: RehypePlugin = () => {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (/^h[2-6]$/.test(node.tagName)) {
        const id = node.properties?.id;
        if (id) {
          const anchor: Element = {
            type: "element",
            tagName: "a",
            properties: {
              href: `#${id}`,
              className: ["heading-anchor"],
            },
            children: [{ type: "text", value: "#" }],
          };
          node.children.push(anchor);
        }
      }
    });
  };
}

export default rehypeHeadingAnchors;
