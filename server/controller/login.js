const db = require("../config/redis")
const { createError }= require('http-errors')

const handleNotFound = result => {
    if (!result) {
        throw createError(404,'token not found')
    } 
    return result
}


const login = {
    login (req,res,next){
        var token = db.get(req.params.id)
        if ( token == -2) {
            return
        } else {

        }
    },
    registro (req,res,next) {
        
    },
    atualizar (req,res,next) {},
    deletar (req,res,next) {}
}

module.exports = login