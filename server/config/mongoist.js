const mongoist = require('mongoist')
const debug = require('debug')
const config = require('config')
const log = degub('livro_nodejs:config:mongoist')

// Usaremos biblioteca config para usar default.json. Ficar mais limpo codigo. Sendo mais versatil para configurar
const db = mongoist(config.get('mongo.uri'))

db.on('error',(err) => {
    log('MongoDB error: ',err)
})

module.exports = db
