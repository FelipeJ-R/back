const bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")

const atualizarContas = (req, res) => {
    const id = req.query.numeroConta
    const contaAchada = bancoDeDados.contas.find(conta => {
        return conta.id == id
    })
    if (!contaAchada.usuario) {
        return res.status(404).send(mensagens.contaInexistente)
    }
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Nome, cpf, data_nascimento, telefone, email e senha são essenciais para o cadastro. Verifique as informações enviadas." })
    }
    const emailRepetido = bancoDeDados.contas.find(conta => {
        return conta.usuario.email === email
    })
    const cpfRepetido = bancoDeDados.contas.find(conta => {
        return conta.usuario.cpf == cpf
    })
    if (cpfRepetido || emailRepetido) {
        return res.status(400).json(mensagens.duplicidade)
    }
    contaAchada.usuario = req.body
    res.status(204).json()
}

module.exports = atualizarContas