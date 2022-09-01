class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarPessoas()
    }
    criarPessoas() {
        const query = "create table if not exist pessoas (id int(11) auto_increment primary key, name varchar(255), idade int(11))"
        this.conexao.query((query, error) => {
            error ? console.log(error) : console.log("tabela pessoas criada com sucesso")
        })
    }
}

