import { pages } from "./pages";
import { legacyRoutes } from "./site-map";

const sourceRoutes = new Map(pages.map((page) => [page.source, page.path]));

export function cleanPath(path: string): string {
  return decodeURI(path)
    .replace(/\/$/, "")
    .replace(/\.html$/, "");
}

export function routeForPath(path: string): string {
  const clean = cleanPath(path);
  return legacyRoutes[clean] ?? (clean || "/");
}

export function resolveDocLink(href: string, source: string): string {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [path, hash = ""] = href.split("#");
  if (!path) return href;
  const resolved = decodeURI(new URL(path, `https://docs.local/${source}`).pathname).replace(
    /^\//,
    "",
  );
  const legacy = legacyRoutes[`/${resolved.replace(/\.md$/, "")}`];
  return `${sourceRoutes.get(resolved) ?? legacy ?? href}${hash ? `#${hash}` : ""}`;
}
