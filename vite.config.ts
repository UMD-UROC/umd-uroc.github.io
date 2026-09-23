import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite-plus";
import { canonicalPaths, generatedHtmlPaths, legacyRoutes } from "./src/site-map.ts";

const developmentPaths = new Set([
  ...canonicalPaths,
  ...Object.keys(legacyRoutes).map((path) => `${path}.html`),
  "/development-standards.html",
  "/404.html",
]);

export default defineConfig({
  plugins: [
    {
      name: "static-documentation-routes",
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url) {
            const url = new URL(request.url, "http://localhost");
            const path = decodeURI(url.pathname).replace(/\/$/, "");
            if (developmentPaths.has(path)) request.url = `/index.html${url.search}`;
          }
          next();
        });
      },
      async writeBundle(options) {
        const outputDirectory = options.dir ?? resolve("dist");
        const html = await readFile(resolve(outputDirectory, "index.html"));
        await Promise.all(
          generatedHtmlPaths.map(async (path) => {
            const destination = resolve(outputDirectory, path);
            await mkdir(dirname(destination), { recursive: true });
            await writeFile(destination, html);
          }),
        );
      },
    },
  ],
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://viteplus.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  staged: { "*": "bun run check --fix" },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
