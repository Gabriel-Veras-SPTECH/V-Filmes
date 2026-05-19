var filmeModel = require("../models/filmeModel");

function buscarPorId(req, res) {
    var idFilme = req.params.idFilme;

    if (idFilme == undefined) {
        res.status(400).send("O ID do filme está indefinido!");
    } else {
        filmeModel.buscarPorId(idFilme)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function interagir(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idFilme = req.body.idFilmeServer;
    var tipo = req.body.tipoServer; // curtida, visualizacao ou watchlist

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else {
        filmeModel.interagir(idUsuario, idFilme, tipo)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarPorId,
    interagir
};