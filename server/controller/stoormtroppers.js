const repository = require('../repository/stormtrooper')
const { createError }= require('http-errors')

const handleNotFound = result => {
    if (!result) {
        throw createError(404,'trooper not found')
    } 
    return result
}

// Criara uma lista e puxara o repository do repository. Criando funcao adicionando a dict. Ai exportando. Adicionaremos como controladores no app.js
const stormtrooper = {
    list(req,res,next){
        const { q, page } = req.query
        repository.list(q,page)
            .then(result => {
                res.json(result)
            })
            .catch(next)
    },
    byId(req,res,next) {
        repository.byId(req.params.id)
        .then(result => {
            const id = req.params.id

            if (!/^[0-9a]{24}$/.test(id)){

                return next(createError(422,'Invalid id'))
            } 
            try {
                const result = repository.byid(id).then(handleNotFound)
                res.json(result)
            } catch(e) {
                next(e)
            }

        })
    },
    verifyId(req,res,next){
        const id = req.params.id 
        if (/^[0-9a-f]{24}$/.test(id)) {
            return next((createError(422,'Invalid id')))
        } 
        next()
    
    },
    create(req,res,next){
        repository.create(req.body)
        .then(result => res.status(201).json(result))
    },
    updateById(req,res,next) {
        repository.updateById(req.params.id,req.body)
        .then(result => res.json(result))
        .catch(next)
    },
    deleteById(req,res,next) {
        repository.deleteById(req.params.id)
        .then(_ => res.sendStatus(204))
        .catch(next)
    }
}

module.exports = stormtrooper