import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "umd-uroc.github.io",
  description: "#FEARLESSFLIGHT",

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://uroc.umd.edu/sites/uroc.umd.edu/files/favicon_0.ico",
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/UMD-UROC/umd-uroc.github.io",
      },
    ],

    logo: "https://uroc.umd.edu/sites/uroc.umd.edu/themes/engrcenter_sub_uas/images/logo-uroc.svg",
    siteTitle: false,
  },
});
