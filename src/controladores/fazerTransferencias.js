const { banco } = require("../bancodedados")
let bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")


const fazerTransferencias = (req, res) => {
    const data = Date().slice(4, -38)
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !numero_conta_destino || !senha) {
        return res.status(401).json({ mensagem: "Contas ou senha informadas não são válidas. Verifique as informações enviadas." })
    }
    if (!valor || valor <= 0) {
        return res.status(400).json({
            "mensagem": "O valor não pode ser menor que zero!"
        })
    }
    const contaAchada1 = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.body.numero_conta_origem)
    })
    const contaAchada2 = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.body.numero_conta_destino)
    })
    if (!contaAchada1) {
        return res.status(404).json({
            "mensagem": "A conta de origem não foi encontrada. Verifique as informações submetidas!"
        })
    }
    if (!contaAchada2) {
        return res.status(404).json({
            "mensagem": "A conta de destino não foi encontrada. Verifique as informações submetidas!"
        })
    }
    if (contaAchada1.usuario.senha !== senha.toString()) {
        return res.status(401).json({
            "mensagem": "Senha incorreta!"
        })
    }
    if (contaAchada1.saldo < valor) {
        return res.status(404).json({
            "mensagem": "Saldo insuficiente"
        })
    }
    contaAchada1.saldo -= Number(valor)
    contaAchada2.saldo += Number(valor)
    const registro = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    }
    bancoDeDados.transferencias.push(registro)
    res.status(201).json(bancoDeDados)
}


module.exports = fazerTransferencias