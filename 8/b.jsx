import { useState } from 'react';

function TodoList() {
    const [novaTarefa, setNovaTarefa] = useState('');
    const [tarefas, setTarefas] = useState([]);

    const adicionarNovaTarefa = () => {
        if (novaTarefa.trim()) {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa('');
        }
    };

    return (
        <div>
            <h1>Minha Lista de Afazeres</h1>
            <input
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder="Digite uma nova tarefa"
            />

            <button onClick={adicionarNovaTarefa}>Nova Tarefa</button>

            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index}>{tarefa}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;