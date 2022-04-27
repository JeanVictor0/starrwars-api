const db = require('../config/mongoist')

// Usando conexao da config/mongoist criamos uma list() e retornamos uma lista dos stormtroppers.
const Stoormtroppers = {
    list (q,page = 1) {
        const query = {}
        const DEFAULT_LIMIT = 5
        const skip = Math.abs(page - 1) * DEFAULT_LIMIT
        if (q) query.name = new RegExp(q,'i')
        return db.Stoormtroppers.find(query,{},{skip,limit:DEFAULT_LIMIT})
    },
    create({ name, nickname, patent, divisions}) {
        return db.Stoormtroppers.insert({ name, nickname, patent, divisions })
    },
    updateById(id,{ name, nickname, patent, divisions}) {
        return db.Stoormtroppers.update({_id:mongoist.ObjectId(id)},{$set : { name, nickname, patent, divisions}})
    },
    deleteById(id) {
        return db.Stoormtroppers.remove({_id: monogoist.ObjectId(id)})
    },
}