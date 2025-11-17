import './App.css';
import React, { useState } from "react";

function TextoComprimental() {
    const [texto, setTexto] = useState('');
    const Validacao = texto.length * 2 >= 10;
    const mostrarMensagem = texto.length > 0;
    const mensagem = Validacao ? 'Senha válida!' : 'A senha requer pelo menos 3 caracteres';
    const MensagemCor = Validacao ? 'green' : 'red';
    const Senha = (texto.split('').reverse().join('')) + ((texto.length + 1) * 3);
    const Forca = Validacao ? 'A senha é Forte' : 'A senha é Fraca';

    return (
        <div style={{
            fontFamily: 'comic sans ms',
            margin: '75px',
            padding: '20px',
            background: 'linear-gradient(to right, rgba(62, 187, 237, 1), #0fceebff)',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 12px 100px rgba(255, 255, 255, 1)',
            border: '2px solid #FFFFff',
            maxWidth: '500px',
        }}>
            <h1>Gerador automático de senhas</h1>
            <input
                type="text"
                id="meuInput"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Mínimo de 3 caracteres..."
                style={{ border: mostrarMensagem ? `2px solid ${MensagemCor}` : '1px solid #ccc', fontSize: "30px" }}
            />

            <h2>A sua Senha baseada em palavra chave é:</h2>
            <h3 style={{
                padding: '10px',
                backgroundColor: '#0a0606ff',
                borderRadius: '5px',
                display: 'inline-block',
                marginTop: '10px',
                alignItems: 'center',
                justifyContent: 'center',
            }}> {Senha} </h3>
            {mostrarMensagem && (
                <p style={{ color: MensagemCor, marginTop: '5px' }}>
                    {mensagem} {Forca}
                </p>
            )}
        </div>
    );
}

export default TextoComprimental;
