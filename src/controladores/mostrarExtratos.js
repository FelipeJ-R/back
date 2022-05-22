const bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")


const mostrarExtratos = (req, res) => {
    const contaAchada = bancoDeDados.contas.find(conta => {
        return conta.numero === Number(req.query.numero_conta)
    })
    const depositos = bancoDeDados.depositos.filter(conta => {
        return conta.numero_conta !== contaAchada.numero
    })
    const saques = bancoDeDados.saques.filter(conta => {
        return conta.numero_conta !== contaAchada.numero
    })
    const transferenciasEnviadas = bancoDeDados.saques.filter(conta => {
        return conta.numero_conta_origem !== contaAchada.numero
    })
    const transferenciasRecebidas = bancoDeDados.depositos.filter(conta => {
        return conta.numero_conta_destino !== contaAchada.numero
    })
    res.json({
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas
    })
}

module.exports = mostrarExtratos