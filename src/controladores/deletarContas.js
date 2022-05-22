const { filter } = require("minimatch")
const bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")

const deletarContas = (req, res) => {
    const numeroConta = req.params.numeroConta
    let contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(numeroConta)
    })
    if (!contaAchada) {
        return res.status(404).send(mensagens.contaInexistente)
    }
    if (contaAchada.saldo > 0) {
        return res.status(403).json({
            "mensagem": "A conta só pode ser removida se o saldo for zero!"
        })
    }
    bancoDeDados.contas = bancoDeDados.contas.filter(element => {
        return element !== contaAchada
    })
    res.status(204).send()

}

module.exports = deletarContas