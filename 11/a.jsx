import { useState } from 'react'
import './App.css'

function FormularioTempoReal() {
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        idade: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados({
            ...dados,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Formulário</h2>
            <form>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={dados.nome}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={dados.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Idade:</label>
                    <input
                        type="number"
                        name="idade"
                        value={dados.idade}
                        onChange={handleChange}
                    />
                </div>
            </form>

            <div>
                <h3>Dados preenchidos</h3>
                <p><strong>Nome: {dados.nome}</strong></p>
                <p><strong>Email: {dados.email}</strong></p>
                <p><strong>Idade: {dados.idade}</strong></p>
            </div>
        </div>
    );
}

export default FormularioTempoReal