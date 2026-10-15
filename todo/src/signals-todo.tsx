import { computed, effect, signal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'
import React from 'react'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

type TodoFilter = 'all' | 'active' | 'completed'

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const STORAGE_KEY = 'signals-todo-list'

const loadTodos = (): TodoItem[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

// Signals live at module level, outside any component, so every component
// below reads and writes them directly without a provider or prop drilling
const todoList = signal<TodoItem[]>(loadTodos())

// The filter is view state, so it is not persisted and resets on reload
const filter = signal<TodoFilter>('all')

// A computed signal: it re-runs only when the list or the filter changes
const visibleTodoList = computed(() => {
  const todos = todoList.value

  if (filter.value === 'active') {
    return todos.filter((todo) => !todo.completed)
  }
  if (filter.value === 'completed') {
    return todos.filter((todo) => todo.completed)
  }
  return todos
})

// An effect tracks the signals it reads, so this writes the list back to
// localStorage on every change
effect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList.value))
})

// Signals compare by reference, so the actions replace the array rather than
// mutating it in place
const addTodo = (text: string) => {
  todoList.value = [...todoList.value, { id: Date.now(), text, completed: false }]
}

const toggleTodo = (id: number) => {
  todoList.value = todoList.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  )
}

const removeTodo = (id: number) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id)
}

// Without the Babel transform, a component subscribes to the signals it reads
// only after calling `useSignals()`. Each component re-renders for its own
// signals: the list for `visibleTodoList`, the filters for `filter`.
const TodoList = () => {
  useSignals()

  return (
    <ul>
      {visibleTodoList.value.map((todo) => (
        <li key={todo.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-2"
          />
          <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
          <button
            onClick={() => removeTodo(todo.id)}
            className="ml-auto bg-red-500 text-white p-1 rounded"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

// The draft is local to this input, so it stays in plain React state
const TodoInput = () => {
  const [input, setInput] = React.useState('')

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) {
      return
    }
    addTodo(input)
    setInput('')
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </form>
  )
}

const TodoFilters = () => {
  useSignals()

  return (
    <div className="flex gap-2 mb-4">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => {
            filter.value = value
          }}
          className={`p-1 rounded ${value === filter.value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// The shell reads no signals, so it never re-renders when the Todos change
export const SignalsTodos = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signals Todos</h1>
      <TodoInput />
      <TodoFilters />
      <TodoList />
    </div>
  )
}
