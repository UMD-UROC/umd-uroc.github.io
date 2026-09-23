<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project uses Vite+ for dependency management, development, checks, tests, and builds. Vite+ provides Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Run the globally installed `portless` command to start the `dev` script through its proxy at `https://umd-uroc.localhost` (or the configured proxy port). Run `vp run dev` to start the server directly. Use `vp help` for Vite+ command details. Vite+ selects the pinned Bun package manager for dependency operations.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a Vite+ built-in command. Use `vp run <script>` for project scripts. Check `package.json` and `vite.config.ts` before choosing a command.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+ release. Add a tool name to select part of the graph. For example, run `vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use `vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check `package.json` scripts and `vite.config.ts` tasks for validation; run project scripts with `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Commits

Include `Co-authored-by: Codex <codex@openai.com>` in every commit created by Codex for this repository.
