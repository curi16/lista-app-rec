import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Contador() {
  const [count, setcount] = useState(20);

  const getColor = (temp) => {
    if (temp < 0) return "#4a90e2"; // Azul - Frio
    if (temp < 30) return "#f5a623"; // Laranja - Moderado
    return "#d0021b"; // Vermelho - Quente
  };

  return (
    <div>
      <h2 style={{ color: getColor(count) }}>Contador: {count}°C</h2>
      <button onClick={() => setcount(count + 2)}>+2°C</button>
      <button onClick={() => setcount(count - 2)}>-2°C</button>
    </div>
  );
}

export default Contador