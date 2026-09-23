# UROC Open Source

Documentation for University of Maryland UROC projects, built with Vite+. Install the Vite+ `vp` CLI and [Portless](https://github.com/vercel-labs/portless) globally for local development.

## Local development

```sh
vp install
portless
```

The globally installed `portless` command runs this project's `dev` script through its proxy; it is not a project dependency. Portless prints the site URL when it starts (normally **https://umd-uroc.localhost**, or the same host on your configured proxy port). On first use, Portless may ask to trust its local certificate authority. Worktrees get their own subdomain automatically.

Run `vp run dev` to start the development server directly, without the Portless proxy. Vite+ selects the project's pinned Bun package manager when installing dependencies.

## Validation

```sh
vp check
vp test
vp build
```

The production site is static and is deployed from `dist` by GitHub Pages.

## Repository layout

- `index.html` is the only HTML source file.
- `src/content/` contains the Markdown documentation; `src/pages.ts` adds page titles and navigation metadata.
- `src/site-map.ts` lists published paths and old URL aliases. The Vite+ plugin in `vite.config.ts` creates their HTML entry files in `dist/` during the build.
- `public/` holds images and the favicon.
