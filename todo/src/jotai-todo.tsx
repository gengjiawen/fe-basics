import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
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

// Create an atom with localStorage persistence
const todoListAtom = atomWithStorage<TodoItem[]>('todoList', [])

// The filter is view state, so it lives in a plain atom and resets on reload
const filterAtom = atom<TodoFilter>('all')

// A derived atom: Jotai recomputes it whenever the list or the filter changes
const visibleTodoListAtom = atom((get) => {
  const todos = get(todoListAtom)
  const filter = get(filterAtom)

  if (filter === 'active') {
    return todos.filter((todo) => !todo.completed)
  }
  if (filter === 'completed') {
    return todos.filter((todo) => todo.completed)
  }
  return todos
})

const TodoList = () => {
  const setTodos = useSetAtom(todoListAtom)
  const visibleTodos = useAtomValue(visibleTodoListAtom)

  const addTodo = (text: string) => {
    setTodos((oldTodos) => [...oldTodos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos((oldTodos) =>
      oldTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }

  const removeTodo = (id: number) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jotai Todos</h1>
      <TodoInput addTodo={addTodo} />
      <TodoFilters />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="ml-auto bg-red-500 text-white p-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const TodoInput = ({ addTodo }: { addTodo: (text: string) => void }) => {
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
    <div>
      <form onSubmit={submit} className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

const TodoFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom)

  return (
    <div className="flex gap-2 mb-4">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`p-1 rounded ${value === filter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export const JotaiTodo = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}
