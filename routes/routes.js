const express = require('express')
const routes = express();

routes.get('/', function (req, res) {
    res.render('login', {layout : 'layout', title: 'Login'})
})

routes.get('/verify-email', function (req, res) {
    res.render('verificar-email', {layout : 'layout', title: 'Verificando Email'})
})

routes.get('/update-email', function (req, res) {
    res.render('verificar-email', {layout : 'layout', title: 'Verificando Atualização de Email'})
})

routes.get('/password-recover', function (req, res) {
    res.render('recuperar-senha', {layout : 'layout', title: 'Recuperar Senha'})
})

routes.get('/cadastrar-despesas', function (req, res) {
    res.render('cadastrar-despesa', {layout : 'layout-login', title: 'Cadastrar Despesa'})
})

routes.get('/consultar-despesas', function (req, res) {
    res.render('consultar-despesas', {layout : 'layout-login-search', title: 'Consultar Despesa'})
})

routes.get('/configuracoes-usuario', function (req, res) {
    res.render('config-usuario', {layout : 'layout-login', title: 'Configurações do Usuário'})
})

module.exports = routes