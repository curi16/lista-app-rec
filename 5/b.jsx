import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Contador() {
  const [count, setcount] = useState(10);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setcount(count + 5)}>+5</button>
      <button onClick={() => setcount(count - 5)}>-5</button>
    </div>
  );
}

export default Contador