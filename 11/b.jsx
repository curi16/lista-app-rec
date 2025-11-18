function App() {
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        idade: 0
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    };


    const vIdade = dados.idade >= 18 ? 'Idade válida' : 'Idade inválida, tenha no minimo 18 anos';
    const vEmail = dados.email.includes('@') ? ' Email válido' : 'Endereço de Email inválido';
    return (
        <div>
            <h2>Formulário </h2>
            <form>
                <div>
                    <div>
                        <label>Nome:</label>
                        <imput type="text" name='nome' value={dados.nome} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email::</label>
                        <imput type="text" name='email' value={dados.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Idade:</label>
                        <imput type="number" name='idade' value={dados.idade} onChange={handleChange} />
                    </div>
                </div>
            </form>


            <div>
                <h2>Dados Preenchidos</h2>
                <p><strong>Nome: {dados.nome}</strong></p>
                <p><strong>Email: {dados.email} {vEmail}</strong></p>
                <p><strong>Idade: {dados.idade} {vIdade}</strong></p>
            </div>
        </div>
    )
}
export default App