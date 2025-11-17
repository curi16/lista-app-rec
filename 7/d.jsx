import { useState } from 'react';
import './App.css';

function Contador() {
    const [texto, setTexto] = useState('');
    return (
        <div>
            <h2>Você digitou: {texto}</h2>

            <input type="text" value={texto} onChange={(e) => e.target.value.length < 50 ? setTexto(e.target.value) : setTexto(texto)}
                placeholder='Digite algo...' />
            <h2>Tamanho: {texto.length}/50</h2>
        </div>
    );
}

export default Contador;