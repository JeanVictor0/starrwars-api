const { Router } = require('express')
const controller = require('../controller/')

const login = Router()

login.get('/', controller.login)

login.post('/:name', controller.registro)

login.put('/:token', controller.atualizar)

login.delete('/:token', controller.deletar)

module.exports = login