import './App.css'
import React from 'react';

function ListaComidas() {
  const comidas = ['Parmegiana', 'Pizza', 'Açaí', 'Lasanha', 'Empadão'];
  return (
    <div>
      <h2>Minhas Comidas Favoritas</h2>
      <ol>
        {comidas.map((comida, index) => (
          <li key={index}>{comida}</li>
        ))}
      </ol>
    </div>
  );
}

export default ListaComidas;