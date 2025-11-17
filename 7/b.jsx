import React, { useState } from 'react';

function InputMaiusculo() {
    const [texto, setTexto] = useState('');

    const handleInputChange = (e) => {
        setTexto(e.target.value.toUpperCase());
    };

    return (
        <div>
            <input
                type="text"
                value={texto}
                onChange={handleInputChange}
                placeholder="Digite algo..."
            />
            <h2>{texto}</h2>
        </div>
    );
}

export default InputMaiusculo;