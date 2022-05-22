const bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")


const mostrarSaldos = (req, res) => {
    const contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.query.numero_conta)
    })
    res.json({ "saldo": contaAchada.saldo })
}

module.exports = mostrarSaldos