import { atom, useAtom } from 'jotai'

// Shared atom state for demo
const sharedDataAtom = atom<number>(0)

// One panel, rendered twice below. Both instances read and write the same
// atom, which is the point of the demo.
function CounterPanel({ title }: { title: string }) {
  const [data, setData] = useAtom(sharedDataAtom)

  // Increment the counter by 1. The functional form derives the next value
  // from the current one instead of the `data` captured by this render, so
  // repeated updates in the same tick cannot overwrite each other.
  const updateData = () => {
    setData((count) => count + 1)
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-base mb-2">Counter: {data}</p>
      <button
        onClick={updateData}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Increment Counter
      </button>
    </div>
  )
}

export default function JotaiDemo() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Jotai Counter Demo</h1>
      <CounterPanel title="Component A" />
      <CounterPanel title="Component B" />
    </div>
  )
}
