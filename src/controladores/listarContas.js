const bancoDeDados = require("../bancodedados")


const listarContas = (req, res) => {

    res.json(bancoDeDados.contas)
}

module.exports = listarContas