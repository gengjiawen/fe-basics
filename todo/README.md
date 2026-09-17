# Todo State Management Examples

This is a React + TypeScript + Vite project for comparing basic Jotai and Zustand state management patterns in Todo and shared-state examples.

## Pages

### Jotai Todos

File: `src/jotai-todo.tsx`

This page demonstrates how to manage a Todo list with Jotai.

- Uses `atomWithStorage` to create `todoListAtom` and persist the list in `localStorage`.
- Type a Todo and click Add to create a new item. Blank input is ignored.
- Click a Todo text item to toggle it between completed and incomplete.
- Completed Todos are displayed with a strikethrough.
- Click Remove to delete a Todo.

### Zustand Todos

File: `src/zustand-todo.tsx`

This page demonstrates how to manage a Todo list with Zustand.

- Uses `create` to define `useTodoStore`, which stores `todos`, `addTodo`, `toggleTodo`, and `removeTodo`.
- Reads `todos` with a selector (`useTodoStore((state) => state.todos)`). Actions are stable, so they come from `useTodoStore.getState()` instead of a whole-store subscription.
- Uses `persist` and `createJSONStorage` to persist the list in `localStorage`.
- Type a Todo and click Add Todo to create a new item.
- Check the checkbox to toggle the completed state.
- Click Remove to delete a Todo.

### Jotai Counter Demo

File: `src/JotaiMultiDemo.tsx`

This page demonstrates how multiple components can share the same Jotai atom.

- Component A and Component B are two instances of the same `CounterPanel`, and both read from the same `sharedDataAtom`.
- Both components display the current counter value.
- Clicking Increment Counter in either component updates the counter in both components.
- The update uses the functional form `setData((count) => count + 1)`, so the next value is derived from the current one rather than from the value captured by the render that created the handler.
- This page focuses on the basic pattern for sharing state across components with Jotai.

## App Entry

File: `src/App.tsx`

`App` renders these three pages in order:

1. `JotaiTodo`
2. `ZustandTodos`
3. `JotaiMultiDemo`

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
