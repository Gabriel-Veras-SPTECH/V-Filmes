var interacaoModel = require("../models/interacaoModel");

function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idFilme = req.body.idFilmeServer;
    var tipo = req.body.tipoServer;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está indefinido!");
    } else if (idFilme == undefined) {
        res.status(400).send("ID do filme está indefinido!");
    } else if (tipo == undefined) {
        res.status(400).send("Tipo de interação está indefinido!");
    } else {
        interacaoModel.registrarInteracao(idUsuario, idFilme, tipo)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
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