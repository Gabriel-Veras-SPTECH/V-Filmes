var adminModel = require("../models/adminModel");

function buscarKpisGlobais(req, res) {
    adminModel.obterKpisGlobais()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // Retorna o primeiro objeto mapeado
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarGenerosGlobais(req, res) {
    adminModel.obterGenerosGlobais()
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFilmesMaisCurtidos(req, res) {
    adminModel.obterFilmesMaisCurtidos()
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    var titulo = req.body.tituloServer;
    var ano = req.body.anoServer;
    var diretor = req.body.diretorServer;
    var elenco = req.body.elencoServer;
    var descricao = req.body.descricaoServer;
    var linkPoster = req.body.linkPosterServer;
    var linkBanner = req.body.linkBannerServer;
    var genero = req.body.generoServer;
    var pais = req.body.paisServer;
    var duracao = req.body.duracaoServer;

    if (titulo == undefined || ano == undefined || genero == undefined) {
        res.status(400).send("Os campos obrigatórios não foram preenchidos!");
    } else {
        adminModel.cadastrarFilme(titulo, ano, diretor, elenco, descricao, linkPoster, linkBanner, genero, pais, duracao)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarKpisGlobais,
    buscarGenerosGlobais,
    buscarFilmesMaisCurtidos,
    cadastrar
};