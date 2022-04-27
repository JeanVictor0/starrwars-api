// Criaremos um CRUD tendo todas as 5 rotas

const { Router } = require('express')
const controller = require('../controller/stoormtroppers')

const trooperRoutes = Router()

// As funcoes no controler usando repository e tals sera usado aqui. Usando callback e o respondendo

trooperRoutes.get('/',controller.list)

trooperRoutes.get('/:id',controller.verifyId ,controller.byId)

trooperRoutes.post('/:id',controller.verifyId,controller.create)

trooperRoutes.put('/:id',controller.verifyId, controller.updateById)

trooperRoutes.delete('/:id',controller.verifyId,controller.deleteById)

module.exports = trooperRoutes