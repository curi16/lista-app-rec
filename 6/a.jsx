import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Contador() {
  const [mostrar, setMostrar] = useState(true);
  return (
    <div>
      {mostrar && <p>Eu fico escondido!</p>}
      <button onClick={() => setMostrar(!mostrar)}>{mostrar ? 'Esconder' : 'Mostrar'}</button>
    </div>
  );
}

export default Contador