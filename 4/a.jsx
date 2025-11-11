import './App.css'
import React from 'react';

function CartaoPessoa({ nome, idade, profissao }) {
  return (
    <div className="cartão-pessoa">
      <h2>{nome}</h2>
      <p><strong>Idade:</strong> {idade} anos</p>
      <p><strong>Profissão:</strong> {profissao}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <CartaoPessoa nome="Maria" idade={30} profissao="Desenvolvedora" />
    </div>
  );
}

export default App;