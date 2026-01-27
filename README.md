# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Prerequisites

- Node.js 18+ (see package.json engines)
- Bun (this repo is configured to use Bun via the `packageManager` field)

## Installation

```bash
bun install
```

## Local Development

```bash
bun start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
bun build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true bun deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> bun deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the
`gh-pages` branch. A GitHub Actions workflow is also provided to build and deploy automatically using Bun.
