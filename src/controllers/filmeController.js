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

module.exports = {
    buscarPorId
};