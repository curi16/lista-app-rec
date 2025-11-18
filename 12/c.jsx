import React, { useState } from 'react';

function MedidorFelicidade() {
    const [nivelFelicidade, setNivelFelicidade] = useState(0);

    const emojisFelicidade = [
        '😐',
        '🙂',
        '😊',
        '😁',
        '🤩',
    ];

    const handleClickSorrir = () => {
        setNivelFelicidade(prev => Math.min(prev + 1, emojisFelicidade.length - 1));
    };

    const emojiAtual = emojisFelicidade[nivelFelicidade];
    const proximoNivel = nivelFelicidade + 1;

    return (
        <div className="container-felicidade">
            <h3>Medidor de Felicidade</h3>
            <div style={{ fontSize: '4em' }}>
                {emojiAtual}
            </div>

            <p>Nível de Felicidade: **{nivelFelicidade}**</p>

            {nivelFelicidade < emojisFelicidade.length - 1 ? (
                <button onClick={handleClickSorrir}>
                    Sorrir (Clique para Nível {proximoNivel})
                </button>
            ) : (
                <p>🎉 **Felicidade Máxima!** 🎉</p>
            )}
        </div>
    );
}

export default MedidorFelicidade