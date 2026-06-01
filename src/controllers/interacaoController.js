var interacaoModel = require("../models/interacaoModel");

function registrar(req, res) {
    // captura os dados que vieram do front-end
    var idUsuario = req.body.idUsuarioServer;
    var idFilme = req.body.idFilmeServer;
    var tipo = req.body.tipoServer;

    // valida se veio todos os dados
    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está indefinido!");
    } else if (idFilme == undefined) {
        res.status(400).send("ID do filme está indefinido!");
    } else if (tipo == undefined) {
        res.status(400).send("Tipo de interação está indefinido!");
    } else {
        // se estiver tudo certo chama o model para falar com o banco de dados
        interacaoModel.registrarInteracao(idUsuario, idFilme, tipo)
            // .then() para quando o banco terminar de rodar a query
            .then(function (resultado) {
                // responde para o front-end enviando o resultado do banco em formato json (status 200)
                res.json(resultado);
            }).catch(function (erro) {
                // mostra o erro no terminal
                console.log(erro);
                // responde para o navegador com status500 (erro interno no servidor) e manda a mensagem que o mysqul gerou
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarStatus(req, res) {
    var idUsuario = req.params.idUsuario;
    var idFilme = req.params.idFilme;

    interacaoModel.buscarStatusInteracao(idUsuario, idFilme)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhuma interação encontrada");
            }
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    buscarStatus
};