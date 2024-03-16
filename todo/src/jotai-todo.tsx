import React from 'react'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

// Create an atom with localStorage persistence
const todoListAtom = atomWithStorage<TodoItem[]>('todoList', [])

const TodoList = () => {
  const [todos, setTodos] = useAtom(todoListAtom)

  const addTodo = (text: string) => {
    setTodos((oldTodos) => [
      ...oldTodos,
      { id: Date.now(), text, completed: false },
    ])
  }

  const toggleTodo = (id: number) => {
    setTodos((oldTodos) =>
      oldTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <div>
      <TodoInput addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

const TodoInput = ({ addTodo }: { addTodo: (text: string) => void }) => {
  const [input, setInput] = React.useState('')

  const submit = () => {
    addTodo(input)
    setInput('')
  }

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={submit}>Add</button>
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