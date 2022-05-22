let bancoDeDados = require("../bancodedados")
const mensagens = require("../mensagens")
const express = require("express")
let proximonumero = 3
const saldo = 0

const criarContas = (req, res) => {
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
    if (cpfRepetido) {
        return res.status(400).json(mensagens.duplicidadeCpf)
    } else if (emailRepetido) {
        return res.status(400).json(mensagens.duplicidadeEmail)
    }
    const novoUsuario = {
        numero: proximonumero,
        saldo,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    bancoDeDados.contas.push(novoUsuario)
    res.status(201).json()
    proximonumero++
}


module.exports = criarContas