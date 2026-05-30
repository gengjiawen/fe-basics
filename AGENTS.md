# Repository Guidelines

## Project Structure & Module Organization

This repository is a pnpm workspace for small frontend examples. Packages are listed in `pnpm-workspace.yaml`:

- `todo/`: React + TypeScript + Vite examples for Jotai and Zustand state management.
- `preact-react-virtual/`: Preact + Vite example using `@tanstack/react-virtual`.

Each app keeps source code in `src/`, static files in `public/`, and imported assets in `src/assets/`. Package-level Vite and TypeScript configs live beside each package's `package.json`. The root owns `pnpm-lock.yaml`; do not add package-local lockfiles.

## Build, Test, and Development Commands

- `pnpm install`: install workspace dependencies.
- `pnpm lint`: lint all workspace source from the root with Oxlint.
- `pnpm build`: run every package build via `pnpm -r build`.
- `pnpm dev:todo`: start the React todo app with Vite.
- `pnpm dev:preact-react-virtual`: start the Preact virtual list app with Vite.
- `pnpm --filter <package> build`: build one package, e.g. `pnpm --filter preact-react-virtual build`.
- `pnpm --filter <package> preview`: preview a built Vite package locally.

## Coding Style & Naming Conventions

Use TypeScript for app code and keep components small enough to read in one file. Use 2-space indentation. Match the package style: `preact-react-virtual` uses no semicolons, while some `todo` files use semicolons.

Name React/Preact components in `PascalCase`, hooks with a `use` prefix, and types/interfaces in `PascalCase`. Keep package CSS in `src/*.css`; use Tailwind utilities in `todo` where existing components already do.

## Testing Guidelines

There is no test runner configured yet. Treat Oxlint and TypeScript builds as the required correctness checks and run `pnpm lint` plus `pnpm build` before submitting changes.

If adding tests, colocate them near covered code as `*.test.ts` or `*.test.tsx`, and add a package `test` script for `pnpm --filter <package> test`.

## Commit & Pull Request Guidelines

Recent commits use short imperative messages, sometimes with prefixes such as `docs:`, `chore:`, and `feat:`. Prefer `type: summary`, for example `feat: add virtual row filter`; otherwise keep the subject concise.

Pull requests should name the affected package, summarize behavior changes, link issues, and include screenshots or recordings for UI changes. List commands run, especially `pnpm build`, lint, or package-specific checks.

## Agent-Specific Notes

Keep changes scoped to the package being modified. Preserve user changes in the working tree, avoid unrelated formatting churn, and update root workspace files only when adding or removing packages. Write repository documentation and contributor-facing text in English only unless maintainers explicitly request another language.
