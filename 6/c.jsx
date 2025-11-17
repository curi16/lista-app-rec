import { useState } from 'react'
import './App.css'

function Contador() {

  const [mostrar, setMostrar] = useState(true);
  const buttonClass = mostrar ? '' : 'abrir-cofre';

  return (
    <div className="Contador-container">
      <h1>Cofre Super Seguro</h1>

      {mostrar && (
        <div className="lista-cofre">
          <h2>||:Lista de Compras:||</h2>
          <ol>
            <li>Coração</li>
            <li>Figado</li>
            <li>Lingua</li>
          </ol>
        </div>
      )}
      <p></p>
      <button onClick={() => setMostrar(!mostrar)} className={buttonClass}>
        {mostrar ? 'Fechar Cofre 🔒' : 'Abrir Cofre 🔓'}
      </button>
    </div>
  );
}

export default Contador