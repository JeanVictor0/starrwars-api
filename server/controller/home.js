// Para o codigo ficar mais limpo, usaremos controladores. Variaveis que terao o codigo e chamados para ser executa

const error = (req,res,next) => {
    // Para utilizacao de CORS
    res.header('Acess-Control-Allow-Origin','Origin,X-Requested-With,Content-type,Accept')
    var err = new Error()
    err.status = 404
    //next(404)
    // Ira aparecer error: not found e caminho do arquivo 15:14
    // Podemos fazer de outra forma para nao vazar informacoes do script
    if ( err.status !== 404) {
        console.log(err.stack)
        // Aqui so enviarei a mensagem e sera via json
        res.status(err.status || 500).json({err:err.message})
    }
    // Pode ser que apareca pedido do favicon, se nao tiver podemos fazer
    if (req.url === '/favicon.ico'){

        // Setamos o head como imagem
        res.writeHead(200,{'Content-type':'image/x-icon'})
        // Em vez de dar 404 ou error, sera enviado string vazia e sem imagem
        res.end('')
    }
}

module.exports = { error }