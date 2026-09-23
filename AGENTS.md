<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project uses Bun for package management and to run the Vite+ CLI. Vite+ provides Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Use the Bun scripts in `package.json` for checks, tests, and builds. Run the globally installed `portless` command to start the `dev` script through its proxy at `https://umd-uroc.localhost` (or the configured proxy port). Run `bun run dev` to start Vite+ directly. Run `bun node_modules/vite-plus/bin/vp help` for Vite+ command details.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`bun node_modules/vite-plus/bin/vp <name>` runs a Vite+ built-in command. Use `bun run <script>` for project scripts. Check `package.json` and `vite.config.ts` before choosing a command.

## Tool Versions

Run `bun node_modules/vite-plus/bin/vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`bun node_modules/vite-plus/bin/vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`bun node_modules/vite-plus/bin/vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `bun install` after pulling remote changes and before getting started.
- [ ] Run `bun run check` and `bun run test` to format, lint, type check and test changes.
- [ ] Check `package.json` scripts and `vite.config.ts` tasks for validation; run project scripts with Bun.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `bun node_modules/vite-plus/bin/vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Commits

Include `Co-authored-by: Codex <codex@openai.com>` in every commit created by Codex for this repository.
