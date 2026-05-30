# Todo State Management Examples

This is a React + TypeScript + Vite project for comparing basic Jotai and Zustand state management patterns in Todo and shared-state examples.

## Pages

### Jotai Todos

File: `src/jotai-todo.tsx`

This page demonstrates how to manage a Todo list with Jotai.

- Uses `atomWithStorage` to create `todoListAtom` and persist the list in `localStorage`.
- Type a Todo and click Add to create a new item.
- Click a Todo text item to toggle it between completed and incomplete.
- Completed Todos are displayed with a strikethrough.

### Zustand Todos

File: `src/zustand-todo.tsx`

This page demonstrates how to manage a Todo list with Zustand.

- Uses `create` to define `useTodoStore`, which stores `todos`, `addTodo`, `toggleTodo`, and `removeTodo`.
- Uses `persist` and `createJSONStorage` to persist the list in `localStorage`.
- Type a Todo and click Add Todo to create a new item.
- Check the checkbox to toggle the completed state.
- Click Remove to delete a Todo.

### Jotai Counter Demo

File: `src/JotaiMultiDemo.tsx`

This page demonstrates how multiple components can share the same Jotai atom.

- `ComponentA` and `ComponentB` both read from the same `sharedDataAtom`.
- Both components display the current counter value.
- Clicking Increment Counter in either component updates the counter in both components.
- This page focuses on the basic pattern for sharing state across components with Jotai.

## App Entry

File: `src/App.tsx`

`App` renders these three pages in order:

1. `JotaiTodo`
2. `ZustandTodos`
3. `JotaiMulitDemo`

The project does not currently use routing, so all three pages are shown on the same browser page.

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
