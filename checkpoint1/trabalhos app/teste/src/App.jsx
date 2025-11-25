import React from 'react';
import './App.css';

function SaudacaoComandante({ nomeComandante }) {
    return <h1 style={{ color: '#00d8ff' }}>Bem-vindo(a) ao painel, Comandante {nomeComandante}!</h1>;
}


function DataGalactica({ nomePlaneta }) {
    const agora = new Date();
    const anoGalactico = agora.getFullYear() + 738;
    const cicloLunar = Math.floor((agora.getDate() * 2) / 3);
    const horaFormatada = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`;

    return (
        <div style={{ color: '#a9a9a9', border: '1px solid #333', padding: '10px', borderRadius: '8px' }}>
            <h3>Data Estelar - {nomePlaneta}</h3>
            <p>Ano Galáctico: {anoGalactico}</p>
            <p>Ciclo Lunar: {cicloLunar}</p>
            <p>Horário Sincronizado: {horaFormatada}</p>
        </div>
    );
}

function StatusMissao({ distanciaPercorrida, distanciaTotal }) {
    const progresso = Math.min((distanciaPercorrida / distanciaTotal) * 100, 100);
    const corBarra = progresso < 40 ? '#d0021b' : progresso < 80 ? '#f5a623' : '#7ed321';

    return (
        <div>
            <h2>Status da Missão: {distanciaPercorrida} / {distanciaTotal} Parsecs</h2>
            <div style={{ width: '100%', backgroundColor: '#333', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                    width: `${progresso}%`,
                    height: '30px',
                    backgroundColor: corBarra,
                    transition: 'all 0.5s ease'
                }}>
                </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '5px' }}>{progresso.toFixed(1)}% Completo</p>
        </div>
    );
}

function InfoPlaneta({ planeta }) {
    const getIconeClima = (clima) => {
        const icones = {
            'desértico': '🏜️',
            'gelado': '❄️',
            'temperado': '🌍',
            'gasoso': '☁️'
        };
        return icones[clima.toLowerCase()] || '❓';
    };

    return (
        <div style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px' }}>
            <h2>Planeta de Destino: {planeta.nome} {getIconeClima(planeta.clima)}</h2>
            <p><strong>Temperatura Média:</strong> {planeta.temperatura}°C</p>
            <p><strong>Gravidade:</strong> {planeta.gravidade} G</p>
            <p><strong>Descrição:</strong> {planeta.descricao}</p>
        </div>
    );
}

function PrevisaoEspacial({ previsao }) {
    const getIconePrevisao = (clima) => {
        const icones = {
            'calmo': '🌌',
            'tempestade solar': '☀️',
            'chuva de meteoros': '☄️',
            'nebulosa densa': '🌫️'
        };
        return icones[clima.toLowerCase()] || '✨';
    };

    return (
        <div style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px' }}>
            <h3>Previsão do Tempo Espacial {getIconePrevisao(previsao.clima)}</h3>
            <p><strong>Clima:</strong> {previsao.clima}</p>
            <p><strong>Umidade Solar:</strong> {previsao.umidadeSolar}%</p>
            <p><strong>Radiação Cósmica:</strong> {previsao.radiacaoCosmica} mSv</p>
        </div>
    );
}

function RelatorioBordo({ eventos }) {
    return (
        <div>
            <h2>Relatório de Bordo</h2>
            <ol style={{ border: '1px solid #333', padding: '20px 30px', borderRadius: '8px' }}>
                {eventos.map((evento, index) => (
                    <li key={index} style={{ paddingBottom: '5px' }}>{evento}</li>
                ))}
            </ol>
        </div>
    );
}

export default function DashboardEspacial() {

    const dadosMissao = {
        comandante: 'Felipe ',
        planetaDestino: {
            nome: 'Kepler',
            clima: 'Temperado',
            temperatura: '22',
            gravidade: '1.1',
            descricao: 'Um exoplaneta potencialmente habitável, conhecido por sua vegetação avermelhada.'
        },
        status: {
            distanciaPercorrida: 873,
            distanciaTotal: 1200
        },
        previsao: {
            clima: 'Tempestade Solar',
            umidadeSolar: 88,
            radiacaoCosmica: 4.5
        },
        relatorio: [
            'Decolagem bem-sucedida da Estação Orbital.',
            'Primeiro salto hiperespacial concluído.',
            'Desvio de rota para evitar campo de asteroides.',
            'Coleta de amostras de poeira cósmica.'
        ]
    };

    const dashboardStyle = {
        backgroundColor: '#1a1a1a',
        color: 'white',
        fontFamily: 'monospace',
        padding: '20px',
        maxWidth: '900px',
        margin: '20px auto',
        border: '2px solid #00d8ff',
        borderRadius: '15px',
        display: 'grid',
        gap: '20px'
    };

    return (
        <div style={dashboardStyle}>
            <header>
                <SaudacaoComandante nomeComandante={dadosMissao.comandante} />
            </header>
            <main style={{ display: 'grid', gap: '20px' }}>
                <StatusMissao
                    distanciaPercorrida={dadosMissao.status.distanciaPercorrida}
                    distanciaTotal={dadosMissao.status.distanciaTotal}
                />
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <InfoPlaneta planeta={dadosMissao.planetaDestino} />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <PrevisaoEspacial previsao={dadosMissao.previsao} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <RelatorioBordo eventos={dadosMissao.relatorio} />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <DataGalactica nomePlaneta={dadosMissao.planetaDestino.nome} />
                    </div>
                </div>
            </main>
        </div>
    );
}