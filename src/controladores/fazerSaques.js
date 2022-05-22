const { banco } = require("../bancodedados")
let bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")


const fazerSaques = (req, res) => {
    const data = Date().slice(4, -38)
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta) {
        return res.status(401).json({ mensagem: "Conta ou senha não foram informadas. Verifique as informações enviadas." })
    }
    if (!valor || valor <= 0) {
        return res.status(401).json({
            "mensagem": "O valor não pode ser menor que zero!"
        })
    }
    const contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.body.numero_conta)
    })
    if (!contaAchada) {
        return res.status(404).json(mensagens.contaInexistente)
    }
    if (contaAchada.usuario.senha !== senha.toString()) {
        return res.status(401).json({
            "mensagem": "Senha incorreta!"
        })
    }
    if (contaAchada.saldo < valor) {
        return res.status(404).json({
            "mensagem": "Saldo insuficiente"
        })
    }
    contaAchada.saldo -= Number(valor)
    const registro = {
        data,
        numero_conta,
        valor,
    }
    bancoDeDados.saques.push(registro)
    res.status(201).json()

}


module.exports = fazerSaques