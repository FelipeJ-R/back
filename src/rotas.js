const express = require("express")
const bodyParser = require("body-parser")



const listarContas = require("./controladores/listarContas")
const criarContas = require("./controladores/criarContas")
const atualizarContas = require("./controladores/atualizarContas")
const deletarContas = require("./controladores/deletarContas")
const intermediarios = require("./intermediarios")
const mostrarSaldos = require("./controladores/mostrarSaldos")
const fazerDepositos = require("./controladores/fazerDepositos")
const fazerSaques = require("./controladores/fazerSaques")
const fazerTransferencias = require("./controladores/fazerTransferencias")
const mostrarExtratos = require("./controladores/mostrarExtratos")


const rotas = express()
rotas.use(bodyParser.json())


rotas.get("/contas", intermediarios.autenticadoPeloBanco, listarContas)
rotas.get("/contas/extrato", intermediarios.autenticadoPeloUsuario, mostrarExtratos)
rotas.get("/contas/saldo", intermediarios.autenticadoPeloUsuario, mostrarSaldos)
rotas.post("/contas", criarContas)
rotas.put("/contas/:numeroConta/usuario", atualizarContas)
rotas.delete("/contas/:numeroConta", deletarContas)
rotas.post("/transacoes/depositar", fazerDepositos)
rotas.post("/transacoes/sacar", fazerSaques)
rotas.post("/transacoes/transferir", fazerTransferencias)




module.exports = rotas