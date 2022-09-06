const conexao = require('../infraestrutura/conexao')

class Pessoas {
    adiciona(pessoas) {
        const query = "insert into pessoas set ?"

        conexao.status(201).query(query, pessoas, (erro, resultado) => {
            erro ? console.log(erro) : console.log(resultado)
        })
    }
    lista(res, limit, offset) {
        const query = `select * from pessoas limit ${limit} offset ${offset}`
        const query1 = "select count(*) as quantidade from pessoas"
        
        conexao.query(query, (erro, resultado1) => {
            if (erro) {
                resultado1.status(400).json(erro)
            } else {
                conexao.query(query1, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({
                        data: resultado1,
                        _meta: {
                            count: resultado,
                            offset: offset,
                            limit: limit
                        }
                    })
                }
            })
        }
        })
    }
    listaId(id, res) {
        const query = `select * from pessoas where id = ${id}`
        conexao.query(query, (erro, resultado) => {
            erro ? res.status(400).json(erro) : res.status(200).json(resultado)
        })
    }
    remove(id, res) {
        const queryDelete = `delete from pessoas where id = ${id}`
        const queryExists = `select * from pessoas where id = ${id}`

        conexao.query(queryExists, (erro, resultado) => {
            console.log(erro, resultado)
            if (resultado.length === 0 ) {
                res.status(200).json({data: 'usuário inexistente'})
            } else {
                conexao.query(queryDelete, (erro, res) => {
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json({data: "DELETADO"})
                    }
                })
            }
        })
    }
    update(id, body, res) {
        const query = `update pessoas set ? where id = ?`

        conexao.query(query, [body, id], (erro, resultado) => {
            erro ? res.status(400).json({data: "não foi possível atualizar usuário"}) : res.status(200).json({...body, id}) 
        })
    }
}

module.exports = new Pessoas