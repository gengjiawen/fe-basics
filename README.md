# Back to FE Basics

This repository collects small frontend examples. Each directory focuses on one topic.

## Projects

### todo

React state management examples using the same Todo and counter scenarios across different state libraries.

- Jotai Todo: manages a Todo list with atoms and persists the data to localStorage.
- Zustand Todo: manages Todo creation, completion toggling, and deletion with a store persisted to localStorage.
- Jotai Counter Demo: shares one atom across two components to show cross-component state synchronization.

### preact-react-virtual

Preact virtual list example for checking whether a React ecosystem virtual scrolling library works through Preact compat.

- Displays a virtualized list of 10,000 job records.
- Supports filtering by job status.
- Shows both the total row count and the number of mounted rows, making it easy to see whether virtualization is active.
- Keeps Preact, Preact compat, and the React-facing virtualizer path on readable source modules during development, so behavior can be inspected without the extra noise from Vite dependency pre-bundling or Preact's optimized package output.
