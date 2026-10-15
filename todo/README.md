# Todo State Management Examples

This is a React + TypeScript + Vite project for comparing basic Jotai, Zustand, and Signals state management patterns in Todo examples.

## Pages

### Jotai Todos

File: `src/jotai-todo.tsx`

This page demonstrates how to manage a Todo list with Jotai.

- Uses `atomWithStorage` to create `todoListAtom` and persist the list in `localStorage`.
- Keeps the current filter in a plain `filterAtom`, and derives the rendered list in `visibleTodoListAtom`, which Jotai recomputes whenever the list or the filter changes.
- Type a Todo and click Add to create a new item. Blank input is ignored.
- Check the checkbox to toggle the completed state.
- Completed Todos are displayed with a strikethrough.
- Click All, Active, or Completed to filter the list. The filter is view state, so it is not persisted and resets to All on reload.
- Click Remove to delete a Todo.

### Zustand Todos

File: `src/zustand-todo.tsx`

This page demonstrates how to manage a Todo list with Zustand.

- Uses `create` to define `useTodoStore`, which stores `todos`, `filter`, `addTodo`, `toggleTodo`, `removeTodo`, and `setFilter`.
- Reads `todos` and `filter` with selectors (`useTodoStore((state) => state.todos)`). Actions are stable, so they come from `useTodoStore.getState()` instead of a whole-store subscription.
- Filters with `useMemo` in the component instead of inside a selector: a selector that builds a new array hands back a fresh reference on every read, so the store would look changed on every render. `useShallow` is the other way out.
- Uses `persist` and `createJSONStorage` to persist the list in `localStorage`, with `partialize` limiting the persisted state to `todos`.
- Type a Todo and click Add Todo to create a new item.
- Check the checkbox to toggle the completed state.
- Click All, Active, or Completed to filter the list. The filter is view state, so it is not persisted and resets to All on reload.
- Click Remove to delete a Todo.

### Signals Todos

File: `src/signals-todo.tsx`

This page demonstrates how to manage a Todo list with Signals, using `@preact/signals-react`.

- Keeps the list in a module-level `todoList` signal and the current filter in a `filter` signal, so components read and write them directly without a provider or prop drilling.
- Derives the rendered list with `computed`, which re-runs only when the list or the filter changes.
- Persists the list with an `effect` that writes `todoList` to `localStorage` whenever it changes. The filter is view state, so it is not persisted and resets to All on reload.
- Calls `useSignals()` from `@preact/signals-react/runtime` at the top of every component that reads a signal, instead of setting up the Babel transform. Each component re-renders only for the signals it reads, and the page shell reads none.
- Keeps the input draft in `React.useState`, because it is local to the input. Writing to a `useSignal` value from a component trips the `react(immutability)` lint rule.
- Replaces the array on every update instead of mutating it, because signals compare values by reference.
- Type a Todo and click Add to create a new item. Blank input is ignored.
- Check the checkbox to toggle the completed state.
- Click All, Active, or Completed to filter the list.
- Click Remove to delete a Todo.

## App Entry

File: `src/App.tsx`

`App` renders these three pages in order:

1. `JotaiTodo`
2. `ZustandTodos`
3. `SignalsTodos`

The project does not currently use routing, so all pages are shown on the same browser page.

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
