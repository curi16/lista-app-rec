import React, { useState } from 'react';

function InputComValidacao() {
    const [texto, setTexto] = useState('');

    const ehValido = texto.length >= 8;
    const mostrarMensagem = texto.length > 0;
    const mensagem = ehValido ? 'Texto válido!' : 'Digite pelo menos 3 caracteres';
    const corMensagem = ehValido ? 'green' : 'red';

    const handleInputChange = (e) => {
        setTexto(e.target.value);
    };

    return (
        <div>
            <label htmlFor="meuInput">Digite seu texto:</label>
            <input
                type="text"
                id="meuInput"
                value={texto}
                onChange={handleInputChange}
                placeholder="Mínimo de 8 caracteres..."
                style={{ border: mostrarMensagem ? `2px solid ${corMensagem}` : '1px solid #ccc' }}
            />
            {mostrarMensagem && (
                <p style={{ color: corMensagem, marginTop: '5px' }}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default InputComValidacao;