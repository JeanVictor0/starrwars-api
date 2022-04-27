const { schema } = require('moongoose')
const Stoormtroppers = new schema({
    name: String,
    nickname:String,
    divisions: [String],
    patent: {
        type: String,
        enum: ['General','Colonel']
    }
})

module.exports = Stoormtroppers