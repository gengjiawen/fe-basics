# Back to FE Basics

This repository collects small frontend examples. Each directory focuses on one topic. Every example is deployed at <https://fe-basics.vercel.app>.

## Projects

### todo

React state management examples using the same Todo scenario across different state libraries. [Live demo](https://fe-basics.vercel.app/todo/).

- Jotai Todo: manages a Todo list with atoms, filters it through a derived atom, and persists the data to localStorage.
- Zustand Todo: manages Todo creation, completion toggling, deletion, and status filtering with a store persisted to localStorage.

### preact-react-virtual

Preact virtual list example for checking whether a React ecosystem virtual scrolling library works through Preact compat. [Live demo](https://fe-basics.vercel.app/preact-react-virtual/).

- Displays a virtualized list of 10,000 job records.
- Supports filtering by job status.
- Shows both the total row count and the number of mounted rows, making it easy to see whether virtualization is active.
- Keeps Preact, Preact compat, and the React-facing virtualizer path on readable source modules during development, so behavior can be inspected without the extra noise from Vite dependency pre-bundling or Preact's optimized package output.

## Preview

The examples are deployed together as a single static site: the generated index page lists them, and each one is served from its own directory, for example `/todo/`. Run `pnpm build:site` to produce the same site locally in `dist/`; `scripts/build-site.mjs` discovers the examples from the pnpm workspace, so a new package shows up on the index page once it has a `build` script and a `description` in its `package.json`.
