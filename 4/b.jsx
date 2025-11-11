import './App.css'
import React from 'react';

function CartaoLivro({ titulo, autor, ano, genero }) {
  return (
    <div className="cartão-livro">
      <h2>{titulo}</h2>
      <p><strong>autor:</strong> {autor}</p>
      <p><strong>gênero:</strong> {genero}</p>
      <p><strong>ano:</strong> {ano}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <CartaoLivro titulo="Raibow High" autor="Clarice Lispect" genero="Queer" ano={2008} />
    </div>
  );
}

export default App;