import React, { useState } from 'react';

function BotaoFavoritar({ contagemInicial = 150 }) {
    const [contagemFavoritos, setContagemFavoritos] = useState(contagemInicial);
    const [favoritado, setFavoritado] = useState(false);

    const handleClick = () => {
        setFavoritado(prev => !prev);

        setContagemFavoritos(prev => prev + (favoritado ? -1 : 1));
    };

    const icone = favoritado ? '⭐️' : '✩'; '🌙'; '🌑'
    const classeBotao = `botao-favoritar ${favoritado ? 'favoritado' : ''}`;

    return (
        <div className="container-favoritar">
            <button className={classeBotao} onClick={handleClick}>
                {icone} {favoritado ? 'Desfavoritar' : 'Favoritar'}
            </button>
            <p>Total de Favoritos: **{contagemFavoritos}**</p>
        </div>
    );
}
export default BotaoFavoritar
