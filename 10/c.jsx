import React, { useState } from 'react';

const Taxas = {
    BRL: { USD: 0.20, EUR: 0.18, BRL: 1.00 },
    USD: { BRL: 5.00, EUR: 0.90, USD: 1.00 },
    EUR: { BRL: 5.55, USD: 1.11, EUR: 1.00 },
};

function ConversorMoedas() {
    const [val, setVal] = useState(0);
    const [mOrig, setMOrig] = useState('BRL');
    const [mDest, setMDest] = useState('USD');
    const [resul, setResult] = useState(0);

    const formatarResultado = (val, moeda) => {
        return `${val.toFixed(2)} ${moeda}`;
    };

    const Calcular = () => {
        const valNum = parseFloat(val);

        if (isNaN(valNum) || valNum < 0) {
            setResult(0);
            return;
        }

        const taxa = Taxas[mOrig]?.[mDest];

        if (taxa !== undefined) {
            const resultCal = valNum * taxa;
            setResult(resultCal);
        } else {
            setResult(0);
        }
    };

    return (
        <div>
            <h2>Conversor de Moedas</h2>

            <p>Valor a ser convertido:</p>
            <input
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder='Insira o valor'
            />

            <p>Converter de:</p>
            <select value={mOrig} onChange={(e) => setMOrig(e.target.value)}>
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            </select>

            <p>Converter para:</p>
            <select value={mDest} onChange={(e) => setMDest(e.target.value)}>
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            </select>

            <div>
                <button onClick={Calcular}>CALCULAR CONVERSÃO</button>
            </div>

            <h2 id='resul'>
                Resultado: {formatarResultado(resul, mDest)}
            </h2>
        </div>
    );
}

export default ConversorMoedas;