import { useState } from 'react';
import './App.css';

function CalculadoraArea() {
    const [altura, setAltura] = useState(0);
    const [comprimento, setComprimento] = useState(0);
    const [area, setArea] = useState(0);

    const calcular = () => {
        const res = Number(altura) * Number(comprimento);
        setArea(res);
    };

    return (
        <div>
            <h2>Calcular a Área</h2>
            <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder='Altura'
            />
            <input
                type="number"
                value={comprimento}
                onChange={(e) => setComprimento(e.target.value)}
                placeholder='Comprimento'
            />
            <button onClick={calcular}>Calcular</button>

            <h2>Resultado: {area}</h2>
        </div>
    );
}

export default CalculadoraArea;