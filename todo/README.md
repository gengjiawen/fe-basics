# Todo State Management Examples

This is a React + TypeScript + Vite project for comparing basic Jotai and Zustand state management patterns in Todo examples.

## Pages

### Jotai Todos

File: `src/jotai-todo.tsx`

This page demonstrates how to manage a Todo list with Jotai.

- Uses `atomWithStorage` to create `todoListAtom` and persist the list in `localStorage`.
- Keeps the current filter in a plain `filterAtom`, and derives the rendered list in `visibleTodoListAtom`, which Jotai recomputes whenever the list or the filter changes.
- Type a Todo and click Add to create a new item. Blank input is ignored.
- Click a Todo text item to toggle it between completed and incomplete.
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

## App Entry

File: `src/App.tsx`

`App` renders these two pages in order:

1. `JotaiTodo`
2. `ZustandTodos`

The project does not currently use routing, so both pages are shown on the same browser page.

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
