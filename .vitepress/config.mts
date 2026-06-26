import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "en-US",
  title: "UMD UROC FOSS",
  description: "#FEARLESSFLIGHT",
  appearance: false,
  srcExclude: ["AGENTS.md"],

  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "INVALID_ANNOTATION" && warning.message.includes("@vueuse/core")) {
            return;
          }

          warn(warning);
        },
      },
    },
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/img/favicon.ico",
      },
    ],
    ["meta", { property: "og:title", content: "UMD UROC FOSS" }],
    ["meta", { property: "og:description", content: "#FEARLESSFLIGHT" }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Projects", link: "/umd-uroc-projects" },
      { text: "MAVInsight", link: "/MAVInsight" },
      { text: "SSH Operations Hub", link: "/SSH%20Operations%20Hub" },
      { text: "UROC", link: "https://uroc.umd.edu" },
    ],

    sidebar: [
      {
        text: "UROC",
        items: [
          { text: "Projects", link: "/umd-uroc-projects" },
          { text: "Development Standards", link: "/development-standards" },
        ],
      },
      {
        text: "MAVInsight",
        items: [
          { text: "Overview", link: "/MAVInsight" },
          { text: "Installation & Setup", link: "/MAVInsight/Setup" },
        ],
      },
      {
        text: "SSH Operations Hub",
        items: [
          { text: "Overview", link: "/SSH%20Operations%20Hub" },
          { text: "Quick Start", link: "/SSH%20Operations%20Hub/quick-start" },
          { text: "Table of Contents", link: "/SSH%20Operations%20Hub/SUMMARY" },
          { text: "Configuration", link: "/SSH%20Operations%20Hub/Reference/configuration" },
          {
            text: "Script Reference",
            collapsed: false,
            items: [
              {
                text: "Overview",
                link: "/SSH%20Operations%20Hub/Reference/script-reference/README",
              },
              {
                text: "Client IP Addresses",
                link: "/SSH%20Operations%20Hub/Reference/script-reference/passing-client-ip-addresses",
              },
              {
                text: "Client IP Prefix",
                link: "/SSH%20Operations%20Hub/Reference/script-reference/passing-client-ip-prefix",
              },
              {
                text: "Client User Names",
                link: "/SSH%20Operations%20Hub/Reference/script-reference/passing-client-user-names",
              },
              {
                text: "Command To Run",
                link: "/SSH%20Operations%20Hub/Reference/script-reference/passing-command-to-be-run-on-client",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/UMD-UROC/umd-uroc.github.io",
      },
    ],

    logo: "/img/logo-uroc.svg",
    siteTitle: false,

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/UMD-UROC/umd-uroc.github.io/edit/main/:path",
    },

    footer: {
      message: "Built with VitePress.",
      copyright: `Copyright © ${new Date().getFullYear()} UMD UROC.`,
    },
  },
});
