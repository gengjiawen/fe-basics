import './App.css'
import { JotaiTodo } from './jotai-todo'
import { SignalsTodos } from './signals-todo'
import ZustandTodos from './zustand-todo'

function App() {
  return (
    <>
      <JotaiTodo />
      <ZustandTodos />
      <SignalsTodos />
    </>
  )
}

export default App
