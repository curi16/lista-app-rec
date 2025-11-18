import { useState } from 'react'
import './App.css'

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100px',
        padding: '8px',
        margin: '0 5px',
        boxSizing: 'border-box',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    result: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
};

function CalculadoraSimples() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [resultado, setResultado] = useState(0);

    const parseInputs = () => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        return [n1 || 0, n2 || 0];
    };

    const handleSoma = () => {
        const [n1, n2] = parseInputs();
        setResultado(n1 + n2);
    };

    const handleSubtracao = () => {
        const [n1, n2] = parseInputs();
        setResultado(n1 - n2);
    };

    const handleMultiplicacao = () => {
        const [n1, n2] = parseInputs();
        setResultado(n1 * n2);
    };

    const handleDivisao = () => {
        const [n1, n2] = parseInputs();
        if (n2 === 0) {

            setResultado('Erro: Divisão por zero');
        } else {
            setResultado(n1 / n2);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Calculadora Simples</h2>

            <div style={styles.inputGroup}>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.buttonGroup}>
                <button onClick={handleSoma} style={styles.button}>+</button>
                <button onClick={handleSubtracao} style={styles.button}>-</button>
                <button onClick={handleMultiplicacao} style={styles.button}>*</button>
                <button onClick={handleDivisao} style={styles.button}>/</button>
            </div>

            <h2 style={styles.result}>Resultado: {resultado}</h2>
        </div>
    );
}
export default CalculadoraSimples;

