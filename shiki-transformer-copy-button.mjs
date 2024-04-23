import { h } from "hastscript";

export function addCopyButton() {
  return {
    name: "shiki-transformer-copy-button",
    pre(node) {
      const button = h(
        "button",
        {
          class: "copy",
          name: "Copy",
          "data-code": this.source,
          onclick: `
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add('copied');
          setTimeout(() => this.classList.remove('copied'), ${toggleMs})
        `,
        },
        [h("span", { class: "ready" }), h("span", { class: "success" })]
      );

      node.children.push(button);
    },
  };
}
