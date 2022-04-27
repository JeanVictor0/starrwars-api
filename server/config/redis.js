const redis = require('redis');
const { promisify } = require('util');
const config = require('config')

const client = redis.createClient(config.get('redis.config'))

//Promisify ele sera uma forma mais simples de usar set,get e tals. Como pg e outros usam. Ja que aqui nao tem muito simples

const set = promisify(client.set).bind(client)
const get = promisify(client.get).bind(client)

const db = {set,get}

module.exports = db