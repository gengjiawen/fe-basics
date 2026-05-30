import './App.css'
import { JotaiTodo } from './jotai-todo'
import JotaiMulitDemo from './JotaiMultiDemo'
import ZustandTodos from './zustand-todo'

function App() {
  return (
    <>
      <JotaiTodo />
      <ZustandTodos />
      <JotaiMulitDemo />
    </>
  )
}

export default App
