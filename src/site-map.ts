export const canonicalPaths = [
  "/projects",
  "/projects/mavinsight",
  "/projects/mavinsight/setup",
  "/projects/ssh-operations-hub",
  "/projects/ssh-operations-hub/quick-start",
  "/projects/ssh-operations-hub/contents",
  "/projects/ssh-operations-hub/reference/configuration",
  "/projects/ssh-operations-hub/reference/script-reference",
  "/projects/ssh-operations-hub/reference/script-reference/client-ip-addresses",
  "/projects/ssh-operations-hub/reference/script-reference/client-ip-prefix",
  "/projects/ssh-operations-hub/reference/script-reference/client-user-names",
  "/projects/ssh-operations-hub/reference/script-reference/command-to-run",
  "/development-standards",
] as const;

export const legacyRoutes: Record<string, string> = {
  "/umd-uroc-projects": "/projects",
  "/MAVInsight": "/projects/mavinsight",
  "/MAVInsight/Setup": "/projects/mavinsight/setup",
  "/SSH Operations Hub": "/projects/ssh-operations-hub",
  "/SSH Operations Hub/quick-start": "/projects/ssh-operations-hub/quick-start",
  "/SSH Operations Hub/SUMMARY": "/projects/ssh-operations-hub/contents",
  "/SSH Operations Hub/Reference/configuration":
    "/projects/ssh-operations-hub/reference/configuration",
  "/SSH Operations Hub/Reference/script-reference/README":
    "/projects/ssh-operations-hub/reference/script-reference",
  "/SSH Operations Hub/Reference/script-reference/passing-client-ip-addresses":
    "/projects/ssh-operations-hub/reference/script-reference/client-ip-addresses",
  "/SSH Operations Hub/Reference/script-reference/passing-client-ip-prefix":
    "/projects/ssh-operations-hub/reference/script-reference/client-ip-prefix",
  "/SSH Operations Hub/Reference/script-reference/passing-client-user-names":
    "/projects/ssh-operations-hub/reference/script-reference/client-user-names",
  "/SSH Operations Hub/Reference/script-reference/passing-command-to-be-run-on-client":
    "/projects/ssh-operations-hub/reference/script-reference/command-to-run",
};

export const generatedHtmlPaths = [
  "404.html",
  ...canonicalPaths.map((path) => `${path.slice(1)}/index.html`),
  ...Object.keys(legacyRoutes).map((path) => `${path.slice(1)}.html`),
  "development-standards.html",
];
