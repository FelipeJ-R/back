const mensagens = require("./mensagens")
const bancoDeDados = require("./bancodedados")

const autenticadoPeloBanco = (req, res, next) => {
    if (req.query.senha_banco !== "Cubos123") {
        return res.status(401).json(mensagens.senhaDoBanco)
    } else { next() }
}
const autenticadoPeloUsuario = (req, res, next) => {
    const numeroConta = req.query.numero_conta
    const senhaConta = req.query.senha
    let contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(numeroConta)
    })
    if (!contaAchada) {
        return res.status(404).send(mensagens.contaInexistente)
    }
    if (contaAchada.usuario.senha != senhaConta) {
        res.status(401).send()
    }
    else { next() }
}

module.exports = {
    autenticadoPeloBanco,
    autenticadoPeloUsuario
}

