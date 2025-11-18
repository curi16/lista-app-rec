import React, { useState } from 'react';

const OPCOES_CABELO = ['Loiro', 'Castanho', 'Preto', 'Ruivo'];
const OPCOES_OLHOS = ['Azuis', 'Verdes', 'Castanhos', 'Mel'];
const OPCOES_ACESSORIOS = ['Óculos', 'Chapéu', 'Cachecol', 'Máscara'];

function CriadorAvatar() {
    const [cabelo, setCabelo] = useState(OPCOES_CABELO[0]);
    const [olhos, setOlhos] = useState(OPCOES_OLHOS[0]);
    const [acessorios, setAcessorios] = useState([]);

    const handleCabeloChange = (e) => {
        setCabelo(e.target.value);
    };

    const handleOlhosChange = (e) => {
        setOlhos(e.target.value);
    };

    const handleAcessorioChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setAcessorios([...acessorios, value]);
        } else {
            setAcessorios(acessorios.filter(acc => acc !== value));
        }
    };

    const avatarTextual = `👤 Cabelo: ${cabelo} | Olhos: ${olhos} | Acessórios: ${acessorios.length > 0 ? acessorios.join(', ') : 'Nenhum'
        }`;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>

            <h2>🛠️ Construtor de Avatar</h2>

            <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                <legend>Cor do Cabelo (Dropdown)</legend>
                <label htmlFor="cabelo-select">Escolha a cor:</label>
                <select id="cabelo-select" value={cabelo} onChange={handleCabeloChange}>
                    {OPCOES_CABELO.map(cor => (
                        <option key={cor} value={cor}>{cor}</option>
                    ))}
                </select>
            </fieldset>

            <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                <legend>Cor dos Olhos (Radio Buttons)</legend>
                {OPCOES_OLHOS.map(cor => (
                    <label key={cor} style={{ marginRight: '15px' }}>
                        <input
                            type="radio"
                            name="olhos"
                            value={cor}
                            checked={olhos === cor}
                            onChange={handleOlhosChange}
                        />
                        {cor}
                    </label>
                ))}
            </fieldset>

            <fieldset style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
                <legend>Acessórios (Checkboxes)</legend>
                {OPCOES_ACESSORIOS.map(acessorio => (
                    <label key={acessorio} style={{ marginRight: '15px' }}>
                        <input
                            type="checkbox"
                            name="acessorios"
                            value={acessorio}
                            checked={acessorios.includes(acessorio)}
                            onChange={handleAcessorioChange}
                        />
                        {acessorio}
                    </label>
                ))}
            </fieldset>

            <div style={{ border: '2px solid #333', padding: '15px', backgroundColor: '#f9f9f9', marginTop: '30px' }}>
                <h3>✨ Seu Avatar (Atualização em Tempo Real)</h3>
                <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                    {avatarTextual}
                </p>
            </div>

        </div>
    );
}

export default CriadorAvatar;