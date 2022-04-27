// Aqui ficara amazenado as rotas, Fica mais dinamico e controlado. Menos sujo o codigo
const express = require('express')
const trooperRoutes = require('./stoormtroppers')
const login = require("./login")
const router = express.Router()

// No index setamos todas as rotas. Por exemplo dos stormmtroppers
router.use('/troppers',trooperRoutes)

router.use('/login',login)

router.get('/teste',(req,res,next)=> {
    // Vamos fazer aqui, como indentificar se alguem usou accept para json via req
    if (req.accepted === 'json'){
        res.json({resposta:'Pronto'})
    } else {
        res.send('pronto')
    }
})

module.exports = router