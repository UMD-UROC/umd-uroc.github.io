import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import "./custom.css";

const footerGroups = [
  {
    title: "Projects",
    items: [
      { text: "MAVInsight", link: "/MAVInsight" },
      { text: "SSH Operations Hub", link: "/SSH%20Operations%20Hub" },
    ],
  },
  {
    title: "Community",
    items: [
      { text: "Facebook", link: "https://www.facebook.com/UMDUROC/" },
      { text: "Instagram", link: "https://www.instagram.com/umd_uroc/" },
      { text: "X", link: "https://x.com/UMD_UROC" },
      { text: "LinkedIn", link: "https://www.linkedin.com/company/umd-uroc/" },
    ],
  },
  {
    title: "More",
    items: [{ text: "GitHub", link: "https://github.com/umd-uroc/" }],
  },
];
const copyright = `Copyright © ${new Date().getFullYear()} UMD UROC.`;

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () =>
        h("footer", { class: "uroc-footer" }, [
          h(
            "div",
            { class: "uroc-footer-links" },
            footerGroups.map((group) =>
              h("section", { class: "uroc-footer-group" }, [
                h("h2", group.title),
                h(
                  "ul",
                  group.items.map((item) =>
                    h(
                      "li",
                      h(
                        "a",
                        {
                          href: item.link,
                          target: item.link.startsWith("http") ? "_blank" : undefined,
                          rel: item.link.startsWith("http") ? "noopener noreferrer" : undefined,
                        },
                        item.text,
                      ),
                    ),
                  ),
                ),
              ]),
            ),
          ),
          h("div", { class: "uroc-footer-meta" }, [
            h("p", "Built with VitePress."),
            h("p", copyright),
          ]),
        ]),
    });
  },
};
