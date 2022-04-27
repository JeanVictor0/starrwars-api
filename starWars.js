// Vamos usar axios em vez de http. Para puxar os dados e tals.

const axios = require('axios')
// Tambem usaremos uma template engine para fazer uma interpolacao de variaveis
const engine =  (template, ...data) => {
    return template.map((s,i) => {
        s + '${data[i] || "}'
    })
}

const count = 82

const items = [{
    // Preguiça. mas sera um template de como devera retornar. Chaves e tals
}]

// Ou usamos markdown para transformar isso em html
const marked = require('marked')

// Usaremos a mesma engine

const render = (result) => {
    const title = 'Star Wars API'
    const count = result.data.count
    const items = result.data.results
    const markdown = engine``

}

// Demos um get de forma simples
axios.get('https://swapi.dev/api/people')
    .then(result => {
        console.log(result.data.results)
    }).then(result => {
        process.exit()
    })

// Nao tem muito que explicar aqui. Exceto que o result retorna json normal e buscamos 82 pessoas.

