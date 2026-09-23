import MarkdownIt from "markdown-it";
import { pages, type Page } from "./pages";
import { cleanPath, resolveDocLink, routeForPath } from "./routes";
import { legacyRoutes } from "./site-map";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing application root");

const currentPath = routeForPath(location.pathname);
const page = pages.find((item) => item.path === currentPath);
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
  );
const icon = (
  name: "arrow" | "search" | "menu" | "github" | "external" | "copy" | "check",
  size = 20,
) => {
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    github:
      '<path d="M9 19c-4 1-4-2-6-2m12 4v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6A4.6 4.6 0 0 0 18.4 6 4.2 4.2 0 0 0 18.3 3S17.3 2.7 15 4.5a11 11 0 0 0-6 0C6.7 2.7 5.7 3 5.7 3A4.2 4.2 0 0 0 5.6 6 4.6 4.6 0 0 0 4.3 9.6c0 4.7 2.8 5.7 5.5 6a2.8 2.8 0 0 0-.8 2.2V21"/>',
    external: '<path d="M13 5h6v6m0-6-9 9"/><path d="M19 13v6H5V5h6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderDoc(doc: Page) {
  const headings: { label: string; id: string; level: number }[] = [];
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const href = token.attrGet("href");
    if (typeof href === "string") {
      const url = resolveDocLink(href, doc.source);
      token.attrSet("href", url);
      if (/^https?:/.test(url)) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noopener noreferrer");
      }
    }
    return self.renderToken(tokens, index, options);
  };
  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const src = token.attrGet("src");
    if (typeof src === "string" && src.startsWith("./img/"))
      token.attrSet("src", src.replace("./img/", "/img/mavinsight/"));
    token.attrSet("alt", token.content);
    token.attrSet("loading", "lazy");
    return self.renderToken(tokens, index, options);
  };
  md.renderer.rules.heading_open = (tokens, index, options, env, self) => {
    const label = tokens[index + 1].content;
    const baseId = slugify(label);
    let id = baseId;
    let suffix = 2;
    while (headings.some((heading) => heading.id === id)) id = `${baseId}-${suffix++}`;
    tokens[index].attrSet("id", id);
    headings.push({ label, id, level: Number(tokens[index].tag.slice(1)) });
    return self.renderToken(tokens, index, options);
  };
  let content = doc.markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
  const blocks: string[] = [];
  content = content.replace(
    /^::: (warning|info|tip|danger)(?: ([^\n]+))?\n([\s\S]*?)\n:::/gm,
    (_match, tone: string, label: string | undefined, body: string) => {
      const html = `<aside class="callout callout-${tone}"><strong>${escapeHtml(label ?? tone)}</strong>${md.render(body)}</aside>`;
      const index = blocks.push(html) - 1;
      return `UROCCALLOUT${index}END`;
    },
  );
  const html = md
    .render(content)
    .replace(/<p>UROCCALLOUT(\d+)END<\/p>/g, (_match, index: string) => blocks[Number(index)]);
  return { html, headings };
}

function header() {
  return `<header class="site-header"><a class="brand" href="/" aria-label="UROC Open Source home"><img class="brand-logo" src="/img/logo-uroc.svg" alt="University of Maryland UAS Research and Operations Center" /><span class="brand-site-label">OPEN SOURCE</span></a><nav class="desktop-nav" aria-label="Main navigation"><a href="/projects" class="${currentPath.startsWith("/projects") ? "active" : ""}">Projects</a><a href="/development-standards" class="${currentPath === "/development-standards" ? "active" : ""}">Standards</a><a href="https://uroc.umd.edu" target="_blank" rel="noopener noreferrer">About UROC ${icon("external", 14)}</a></nav><div class="header-actions"><button class="search-trigger" type="button" aria-label="Search documentation">${icon("search", 18)}<span>Search docs</span><kbd>⌘ K</kbd></button><a class="github-link" href="https://github.com/UMD-UROC" target="_blank" rel="noopener noreferrer" aria-label="UROC on GitHub">${icon("github", 20)}</a><button class="mobile-menu-button" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu", 23)}</button></div><nav class="mobile-nav" aria-label="Mobile navigation" hidden><a href="/projects">Projects</a><a href="/development-standards">Development standards</a><a href="https://uroc.umd.edu">About UROC</a></nav></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-top"><div><img class="footer-logo" src="/img/logo-uroc.svg" alt="University of Maryland UAS Research and Operations Center" /><div class="footer-brand">OPEN SOURCE DOCUMENTATION</div><p>Tools, guides, and ideas from the University of Maryland Unmanned Research Operations Center.</p></div><div class="footer-links"><div><strong>Explore</strong><a href="/projects">All projects</a><a href="/projects/mavinsight">MAVInsight</a><a href="/projects/ssh-operations-hub">SSH Operations Hub</a></div><div><strong>Connect</strong><a href="https://uroc.umd.edu">UROC website</a><a href="https://github.com/UMD-UROC">GitHub</a><a href="/development-standards">Development standards</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} UMD UROC</span><span>Built with Vite+</span></div></footer>`;
}

function droneArt() {
  return `<div class="hero-art" aria-hidden="true"><div class="art-grid"></div><div class="art-cross art-cross-one">+</div><div class="art-cross art-cross-two">+</div><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-label top-label"><span class="status-dot"></span> FIELD NOTES / 001</div><svg class="drone" viewBox="0 0 540 340" fill="none"><g stroke="#e9e6df" stroke-width="2"><circle cx="93" cy="84" r="69"/><circle cx="447" cy="84" r="69"/><circle cx="93" cy="256" r="69"/><circle cx="447" cy="256" r="69"/></g><g stroke="#26352f" stroke-width="18" stroke-linecap="round"><path d="M238 153 113 96M302 153 427 96M238 187 113 244M302 187 427 244"/></g><g fill="#26352f"><circle cx="93" cy="84" r="23"/><circle cx="447" cy="84" r="23"/><circle cx="93" cy="256" r="23"/><circle cx="447" cy="256" r="23"/></g><g stroke="#ce2639" stroke-width="10" stroke-linecap="round"><path d="M46 84h94M400 84h94M46 256h94M400 256h94"/></g><path d="M227 134h86l22 36-22 36h-86l-22-36 22-36Z" fill="#26352f"/><path d="M248 154h44l10 16-10 16h-44l-10-16 10-16Z" fill="#f9f7f1"/><circle cx="270" cy="170" r="9" fill="#ce2639"/><path d="M248 206h44l-9 26h-26l-9-26Z" fill="#26352f"/></svg><div class="art-coordinate">38° 59′ 26.3″ N<br>76° 56′ 10.1″ W</div><div class="art-label bottom-label">RESEARCH IN MOTION <span>↗</span></div></div>`;
}

function projectCard(kind: "mav" | "ssh") {
  const mav = kind === "mav";
  return `<a class="project-card ${kind}" href="${mav ? "/projects/mavinsight" : "/projects/ssh-operations-hub"}"><div class="card-top"><span class="card-number">0${mav ? "1" : "2"} / PROJECT</span><span class="card-arrow">↗</span></div><div class="card-graphic ${kind}-graphic" aria-hidden="true">${mav ? '<div class="wave wave-one"></div><div class="wave wave-two"></div><div class="wave wave-three"></div><span>TELEMETRY / LIVE</span>' : '<div class="terminal-lines"><i></i><i></i><i></i></div><span class="terminal-prompt">$ _</span><span>REMOTE / OPERATIONS</span>'}</div><div class="card-copy"><div class="card-tags"><span>${mav ? "MAVLINK" : "SSH"}</span><span>${mav ? "ROS 2" : "AUTOMATION"}</span></div><h3>${mav ? "MAVInsight" : "SSH Operations Hub"}</h3><p>${mav ? "Visualize live flight data with PX4, MAVROS, PlotJuggler, and Foxglove." : "Coordinate commands across multiple clients with flexible grouping and validation."}</p><span class="card-link">Explore documentation ${icon("arrow", 18)}</span></div></a>`;
}

function home() {
  document.title = "UROC Open Source · University of Maryland";
  return `<main><section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="eyebrow-line"></span> UNIVERSITY OF MARYLAND · UROC</div><h1>Open tools for<br><em>fearless flight.</em></h1><p>Documentation for the projects, systems, and shared practices powering unmanned research at UMD.</p><div class="hero-actions"><a class="button button-dark" href="/projects">Explore projects ${icon("arrow", 19)}</a><a class="text-link" href="https://uroc.umd.edu" target="_blank" rel="noopener noreferrer">Meet UROC <span>↗</span></a></div><div class="hero-index"><span>01 — 03</span><span>RESEARCH / ENGINEERING / OPEN SOURCE</span></div></div>${droneArt()}</section><section class="intro-strip"><span class="strip-marker">✳</span><p>We build in the open so ideas can travel further.</p><span class="strip-right">EXPLORE THE WORK ↓</span></section><section class="featured section-shell"><div class="section-heading"><div><span class="section-kicker">01 / THE WORK</span><h2>Built for the field.<br><em>Shared with everyone.</em></h2></div><p>Practical tools and documentation from our research and operations teams.</p></div><div class="project-grid">${projectCard("mav")}${projectCard("ssh")}</div><a class="all-projects" href="/projects">View all projects <span>↗</span></a></section><section class="standards-banner"><div><span class="section-kicker">02 / HOW WE WORK</span><h2>Good work is<br><em>repeatable work.</em></h2><p>Our development standards keep projects clear, maintainable, and easy to build on.</p><a class="button button-light" href="/development-standards">Read the standards ${icon("arrow", 18)}</a></div><div class="standards-decoration" aria-hidden="true"><span>U</span><span>R</span><span>O</span><span>C</span></div></section></main>`;
}

function projectsPage() {
  document.title = "Projects · UROC Open Source";
  return `<main class="listing-page"><div class="listing-header section-shell"><span class="section-kicker">OPEN SOURCE / PROJECTS</span><h1>Projects in<br><em>motion.</em></h1><p>Explore the tools and guides that support unmanned research and day to day operations at UROC.</p></div><div class="project-grid section-shell">${projectCard("mav")}${projectCard("ssh")}</div><div class="listing-more section-shell"><span>ALSO IN THE LIBRARY</span><a href="/development-standards">Development standards ${icon("arrow", 18)}</a></div></main>`;
}

function sidebarLink(item: Page) {
  return `<a href="${item.path}" class="${item.path === currentPath ? "selected" : ""}" ${item.path === currentPath ? 'aria-current="page"' : ""}>${escapeHtml(item.title)}</a>`;
}

function docsPage(doc: Page) {
  document.title = `${doc.title} · UROC Open Source`;
  const { html, headings } = renderDoc(doc);
  const groupPages = pages.filter((item) => item.group === doc.group);
  const index = groupPages.findIndex((item) => item.path === doc.path);
  const previous = groupPages[index - 1];
  const next = groupPages[index + 1];
  const editLink = `https://github.com/UMD-UROC/umd-uroc.github.io/edit/main/src/content/${doc.group === "UROC" ? "development-standards.md" : doc.group === "MAVInsight" ? doc.source.replace("MAVInsight", "mavinsight").replace(/\.md$/, ".md").replace("mavinsight/Setup", "mavinsight/setup").replace("mavinsight.md", "mavinsight/overview.md") : doc.source.replace("SSH Operations Hub", "ssh").replace("/SUMMARY.md", "/contents.md").replace("/Reference", "/reference").replace("/script-reference/README.md", "/script-reference/README.md").replace("/quick-start.md", "/quick-start.md").replace("ssh.md", "ssh/overview.md")}`;
  return `<main class="docs-layout"><aside class="docs-sidebar"><div class="sidebar-inner"><a class="sidebar-back" href="/projects">← All projects</a><div class="sidebar-group"><div class="sidebar-label">MAVINSIGHT</div>${pages
    .filter((item) => item.group === "MAVInsight")
    .map(sidebarLink)
    .join(
      "",
    )}</div><div class="sidebar-group"><div class="sidebar-label">SSH OPERATIONS HUB</div>${pages
    .filter((item) => item.group === "SSH Operations Hub")
    .map(sidebarLink)
    .join("")}</div><div class="sidebar-group"><div class="sidebar-label">UROC</div>${pages
    .filter((item) => item.group === "UROC")
    .map(sidebarLink)
    .join(
      "",
    )}</div></div></aside><div class="docs-main"><div class="docs-breadcrumb"><a href="/projects">Projects</a><span>/</span><span>${escapeHtml(doc.group)}</span></div><div class="docs-heading"><span class="docs-overline">DOCUMENTATION / ${escapeHtml(doc.group.toUpperCase())}</span><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(doc.description)}</p></div><article class="prose">${html}</article><div class="docs-end"><a href="${editLink}" target="_blank" rel="noopener noreferrer">Edit this page on GitHub ${icon("external", 15)}</a></div><div class="page-pager">${previous ? `<a href="${previous.path}"><small>← PREVIOUS</small><strong>${escapeHtml(previous.title)}</strong></a>` : "<span></span>"}${next ? `<a href="${next.path}"><small>NEXT →</small><strong>${escapeHtml(next.title)}</strong></a>` : "<span></span>"}</div></div><aside class="docs-toc"><div class="toc-inner"><strong>ON THIS PAGE</strong>${headings
    .filter((heading) => heading.level > 1 && heading.level < 4)
    .map(
      (heading) =>
        `<a class="level-${heading.level}" href="#${heading.id}">${escapeHtml(heading.label)}</a>`,
    )
    .join("")}</div></aside></main>`;
}

function notFound() {
  document.title = "Page not found · UROC Open Source";
  return `<main class="not-found"><span class="section-kicker">404 / LOST SIGNAL</span><h1>We lost this<br><em>flight path.</em></h1><p>This page could not be found. Head back to the project library and pick up the trail.</p><a class="button button-dark" href="/projects">Explore projects ${icon("arrow", 18)}</a></main>`;
}

app.innerHTML = `${header()}${currentPath === "/" ? home() : currentPath === "/projects" ? projectsPage() : page ? docsPage(page) : notFound()}${footer()}<div class="search-overlay" hidden><div class="search-backdrop"></div><div class="search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation"><div class="search-input-wrap">${icon("search", 21)}<input class="search-input" type="search" placeholder="Search projects and guides…" aria-label="Search projects and guides"/><button class="search-close" type="button" aria-label="Close search">ESC</button></div><div class="search-results"></div><div class="search-hint">TYPE TO SEARCH · PRESS ENTER TO OPEN</div></div></div>`;

const menuButton = document.querySelector<HTMLButtonElement>(".mobile-menu-button");
const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
menuButton?.addEventListener("click", () => {
  if (!mobileNav) return;
  mobileNav.hidden = !mobileNav.hidden;
  menuButton.setAttribute("aria-expanded", String(!mobileNav.hidden));
});

const overlay = document.querySelector<HTMLElement>(".search-overlay");
const searchInput = document.querySelector<HTMLInputElement>(".search-input");
const results = document.querySelector<HTMLElement>(".search-results");
const searchables = [
  {
    path: "/projects",
    title: "All projects",
    description: "Browse UROC open source projects",
    group: "Explore",
    markdown: "",
  },
  ...pages,
];
function updateSearch() {
  if (!results || !searchInput) return;
  const query = searchInput.value.trim().toLowerCase();
  const matches = searchables
    .filter((item) =>
      `${item.title} ${item.description} ${item.group} ${item.markdown}`
        .toLowerCase()
        .includes(query),
    )
    .slice(0, 8);
  results.innerHTML = matches.length
    ? matches
        .map(
          (item) =>
            `<a href="${item.path}"><span><small>${escapeHtml(item.group.toUpperCase())}</small><strong>${escapeHtml(item.title)}</strong><em>${escapeHtml(item.description)}</em></span>${icon("arrow", 18)}</a>`,
        )
        .join("")
    : '<div class="no-results">No matching pages. Try another term.</div>';
}
function closeSearch() {
  if (overlay) overlay.hidden = true;
}
function openSearch() {
  if (overlay) overlay.hidden = false;
  searchInput?.focus();
  updateSearch();
}
document.querySelector(".search-trigger")?.addEventListener("click", openSearch);
document.querySelector(".search-close")?.addEventListener("click", closeSearch);
document.querySelector(".search-backdrop")?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", updateSearch);
searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter")
    document.querySelector<HTMLAnchorElement>(".search-results a")?.click();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
  if (event.key === "Escape") closeSearch();
});

document.querySelectorAll<HTMLElement>(".prose pre").forEach((pre) => {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.setAttribute("aria-label", "Copy code");
  button.innerHTML = icon("copy", 15);
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? "");
    button.innerHTML = icon("check", 15);
    button.setAttribute("aria-label", "Copied");
    setTimeout(() => {
      button.innerHTML = icon("copy", 15);
      button.setAttribute("aria-label", "Copy code");
    }, 1800);
  });
  pre.append(button);
});

if (legacyRoutes[cleanPath(location.pathname)])
  history.replaceState(null, "", currentPath + location.hash);
