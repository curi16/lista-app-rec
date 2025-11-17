import { useState } from 'react';

function PlacarJogos() {
    const [nomeTime, setNomeTime] = useState('');
    const [pontuacao, setPontuacao] = useState('');
    const [placar, setPlacar] = useState([]);

    const adicionarTime = () => {
        if (nomeTime.trim() && pontuacao) {
            const novoTime = {
                nome: nomeTime.trim(),
                pontos: parseInt(pontuacao, 10)
            };

            const novoPlacar = [...placar, novoTime];
            novoPlacar.sort((a, b) => b.pontos - a.pontos);
            setPlacar(novoPlacar);
            setNomeTime('');
            setPontuacao('');
        }
    };

    return (
        <div>
            <h1>Placar de Jogos</h1>
            <input
                type="text"
                value={nomeTime}
                onChange={(e) => setNomeTime(e.target.value)}
                placeholder="Nome do Time"
            />
            <input
                type="number"
                value={pontuacao}
                onChange={(e) => setPontuacao(e.target.value)}
                placeholder="Pontuação"
            />
            <button onClick={adicionarTime}>Adicionar Time</button>
            <ol>
                {placar.map((time, index) => (
                    <li key={index}>
                        {time.nome} - <strong>{time.pontos}</strong> pontos
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default PlacarJogos;