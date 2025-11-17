import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Contador() {
  const [mostrar, setMostrar] = useState(true);
  return (
    <div>
      {mostrar && <img src="https://blog.aleh.com.br/wp-content/uploads/2015/06/ferngif.gif" alt="" />}
      <p></p>
      <button onClick={() => setMostrar(!mostrar)}>{mostrar ? 'Esconder gif' : 'Exibir gif'}</button>
    </div>
  );
}

export default Contador