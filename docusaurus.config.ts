import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'UMD UROC FOSS',
  tagline: '#FEARLESSFLIGHT',
  favicon: 'https://uroc.umd.edu/sites/uroc.umd.edu/files/favicon_0.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://umd-uroc.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'umd-uroc', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  // deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
              'https://github.com/umd-uroc/umd-uroc.github.io/tree/develop/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
              'https://github.com/umd-uroc/umd-uroc.github.io/tree/develop/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      // title: 'UMD UROC FOSS',
      title: '',
      logo: {
        alt: 'My Site Logo',
        src: 'https://uroc.umd.edu/sites/uroc.umd.edu/themes/engrcenter_sub_uas/images/logo-uroc.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Projects',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/umd-uroc/umd-uroc.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {
              label: 'MAVInsight',
              to: 'MAVInsight',
            },
            {
              label: 'SSH Operations Hub',
              to: 'SSH Operations Hub',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/umd-uroc/',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/UMDUROC/',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/umd_uroc/',
            },
            {
              label: 'X',
              href: 'https://x.com/UMD_UROC',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/umd-uroc/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} UMD UROC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
