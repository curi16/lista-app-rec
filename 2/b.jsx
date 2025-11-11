import './App.css'
import React from 'react';

function BoasVindas({ usuario }) {
  return <h1>Bem vindo de volta, {usuario}!</h1>
}

export default function MyApp() {
  let usuario2 = prompt("Qual é o seu nome ?")
  return <BoasVindas usuario={usuario2} />
}