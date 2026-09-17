import './App.css'
import { JotaiTodo } from './jotai-todo'
import JotaiMultiDemo from './JotaiMultiDemo'
import ZustandTodos from './zustand-todo'

function App() {
  return (
    <>
      <JotaiTodo />
      <ZustandTodos />
      <JotaiMultiDemo />
    </>
  )
}

export default App
