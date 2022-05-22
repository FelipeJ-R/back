const { banco } = require("../bancodedados")
let bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")


const fazerDepositos = (req, res) => {
    const data = Date().slice(4, -38)
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor || valor <= 0) {
        return res.status(400).json({ mensagem: "Valor ou conta informados não são válidos para o depósito . Verifique as informações enviadas." })
    }
    const contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.body.numero_conta)
    })
    if (!contaAchada) {
        return res.status(404).send(mensagens.contaInexistente)
    }
    contaAchada.saldo += Number(valor)
    const registro = {
        data,
        numero_conta,
        valor,
    }
    bancoDeDados.depositos.push(registro)
    res.status(201).json()

}


module.exports = fazerDepositos