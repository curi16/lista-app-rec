import './App.css'
import React from 'react';

function Menu() {
  const pratos = [
    { nome: "Strogonoff de Frango", preco: 20.00, descricao: "arroz, molho strogonoff, pimenta, salada e purê de batata"},
    { nome: "Bife à milanesa", preco: 36.50, descricao: "arroz, feijão, bife à milanesa e batata frita"},
    { nome: "Tradicional Americano", preco: 80.00, descricao: "X-tudo, batata frita, ketchup, mais um X-tudo"},
  ]
return (
  <div>
    <h1> Menu: </h1>
    <div className="menu-grid">
      {pratos.map((prato, index) => (<div key={index} className='prato-card'>
        <h3>{prato.nome}</h3>
        <p className="preco">R$ {prato.preco.toFixed(2)}</p>
        <p className="descricao">{prato.descricao}</p>
        </div>
        ))}
    </div>
  </div>
 )
}
export default Menu