const Pessoa = require('../models/pessoas')

module.exports = (app) => {
    app.post('/cadastro', (req, res) => {
        const pessoa = req.body
        Pessoa.adiciona(pessoa)
        res.send("você cadastrou um usuário:)")
    })

    app.get('/pessoas/:id', (req, res) => {
        const {id} = req.params
        Pessoa.listaId(id, res)
    })

    app.get('/pessoas', (req, res) => {
        const {limit, offset} = req.query
        Pessoa.lista(res, limit, offset)
    })

    app.delete('/remove/:id', (req, res) => {
        const {id} = req.params
        Pessoa.remove(id, res)
    })
}