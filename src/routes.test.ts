import { describe, expect, it } from "vite-plus/test";
import { pages } from "./pages";
import { resolveDocLink, routeForPath } from "./routes";
import { canonicalPaths, generatedHtmlPaths, legacyRoutes } from "./site-map";

const paths = new Set(["/", "/projects", ...pages.map((page) => page.path)]);

describe("documentation routes", () => {
  it("generates a static entry for every page and alias", () => {
    expect(new Set(canonicalPaths)).toEqual(
      new Set(["/projects", ...pages.map((page) => page.path)]),
    );
    for (const path of canonicalPaths) {
      expect(generatedHtmlPaths).toContain(`${path.slice(1)}/index.html`);
    }
    for (const [alias, target] of Object.entries(legacyRoutes)) {
      expect(paths.has(target), alias).toBe(true);
      expect(generatedHtmlPaths).toContain(`${alias.slice(1)}.html`);
    }
    expect(new Set(generatedHtmlPaths).size).toBe(generatedHtmlPaths.length);
  });

  it("has a valid path for every old documentation URL", () => {
    expect(routeForPath("/MAVInsight/Setup.html")).toBe("/projects/mavinsight/setup");
    expect(routeForPath("/SSH%20Operations%20Hub/quick-start")).toBe(
      "/projects/ssh-operations-hub/quick-start",
    );
  });

  it("resolves all local markdown links to published pages", () => {
    for (const page of pages) {
      const links = [...page.markdown.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
      for (const link of links) {
        if (/^(https?:|mailto:|#)/.test(link) || link.startsWith("./img/")) continue;
        const resolved = resolveDocLink(link, page.source).split("#")[0];
        expect(paths.has(resolved), `${page.source}: ${link} → ${resolved}`).toBe(true);
      }
    }
  });
});
