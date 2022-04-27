// Aqui chamamos o express e criamos o app. E outras depedencias
const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.js')
const log = require('debug')('express-node')
const cluster = require('cluster')
const os = roquire('os')
const cpu = os.cpus()
const dns = require('dns')
const http = require('http')
const https = require('https')
const dnscache = require('dnscache')
const controller = require('./controller/home')

const app = express()

// O express usa http e https. Toda vez que envia e recebe, abre nova conexao. Para otimizar, seria melhor deixar em aberto
http.globalAgent.keepAlive = true
https.globalAgent.keepAlive = true


// Dns cache, uma forma de cache que sera mais rapido para resposta de envio. Pois em vez descobrir dominio e mil coisas, ja estara em cache para se utilizar
dnscache({
    "enable": true,
    "ttl":300,
    "cachesize":1000
})

// Se um work dar falha e morrer vai dar um log qual problema deu para futuro conserto
const onWorkerError = (code, signal) => {
    log(code,signal)
}

// Cluster vai criar threads usando os nucleos do processador. Se o nucleo ja tiver sendo usado vai para outro, senao cria so ate outros. Assim, foco usar maximo da cpu e evitar o master pois ele que ira controlar os outros
if (cluster.isMaster) {
    cpu.forEach( _ => {
        // Criando um trabalhador/work
        const work = cluster.fork()
        // Vendo se deu erro, e mostrar o erro que deu
        work.on('error',onWorkerError)
        // Se o worker sair por erro e tals, criara um novo e mostrara o pid dele. O exit e tals sao flags
        cluster.on('exit',(err) => {
            const newWorker = cluster.fork()
            newWorker.on('error', onWorkerError)
            log('Um novo worker nasceu ${newWorker.process.pid}')
        })

        cluster.on('error', (err) => log(err))
    })
} else {
    // Sera usado portao 3000 para escutar os pacotes
    // Para melhorar isso, podemos usar debug e amazenar como loh
    const server = app.listen(3000, () => log('Servidor inicializado'))

    // Se o servidor dar erro por algum motivo, mostrara o erro sem problema nenhum. Provavelmente
    server.on('error',(err)=> log(err))
}
// Se tiver no linux, pode achar os processos no ps aux | grep node

// Vai ate pasta que foi chamada. Uma forma de ficar mais organizado e controlar o codigo, fazendo ate modificacoes. Pode usar no app.use para erros e diversos
app.use(controller.erro)

//const err = new Error('Algo aconteceu')
//err.status = 501
//err vai ser quando tiver ambiente de desenvolvimento. Nao sera bom deixar publico pois mostrar os arquivos e codigo a mostra. Nao sera bom por seguranca

// Setando cors no express
app.use(cors())

//Para criar rotas em arquivi externo, usamos router, exportando e importando aqui. Ai decidimos
app.use('/',routes)

// Onde ficara os arquivos estaticos publicos
app.use(express.static('./public'))

//Para utilizar json. Pois, se nao fazer isso, vai vim, texto puro sem ser dict para modificar ou extrair. Para ta configurado para api rest
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Aqui sera quando alguem acessa uma rota em vez de nao dar para fazer get ou sla, sera retornado algo como o err

// Podera personalizar como quiser esse middleware

// Quando alguem requisitar get na rota / sera enviado um ola com send
app.get('/',(req,res,next) => {
    // req sera o que cliente enviou para servidor, res sera a resposta e next repasse para proximo middleware na cadeia. Caso precise manipular req e terminar de responder uma requisicao
    res.send('Ola')
    // O err podemos usar next(err) para retratar ele.
})


 
