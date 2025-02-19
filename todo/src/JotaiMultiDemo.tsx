import { atom, useAtom } from 'jotai';

// Shared atom state for demo
const sharedDataAtom = atom<number>(0);

// ComponentA displays the shared data
function ComponentA() {
  const [data, setData] = useAtom(sharedDataAtom);
  // Function to increment the counter by 1
  const updateData = () => {
    setData(data + 1);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Component A</h2>
      <p className="text-base">Counter: {data}</p>
      <button onClick={updateData} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Increment Counter</button>
    </div>
  );
}

// ComponentB allows updating the shared data
function ComponentB() {
  const [data, setData] = useAtom(sharedDataAtom);

  const updateData = () => {
    // Increment the counter by 1
    setData(data + 1);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Component B</h2>
      <p className="text-base mb-2">Counter: {data}</p> 
      <button onClick={updateData} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Increment Counter</button>
    </div>
  );
}

export default function JotaiDemo() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Jotai Counter Demo</h1>
      <ComponentA />
      <ComponentB />
    </div>
  );
} 