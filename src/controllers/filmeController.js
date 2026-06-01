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

function pesquisar(req, res) {
    var pesquisa = req.params.pesquisa; 

    if (pesquisa == undefined || pesquisa.trim() == "") {
        res.status(400).send("O termo de pesquisa está indefinido!");
    } else {
        filmeModel.pesquisar(pesquisa)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).json([]); 
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarComentarios(req, res) {
    var idFilme = req.params.idFilme;

    if (idFilme == undefined) {
        console.log("ID do filme está undefined!");
        return res.status(400).send("ID do filme está undefined!");
    }

    filmeModel.buscarComentarios(idFilme)
        .then(function (resultado) {
            // se o banco retornar registros
            if (resultado.length > 0) {
                console.log("Comentários encontrados: ", resultado);
                return res.status(200).json(resultado); // o return aqui impede que o código continue
            } else {
                // se o banco responder com sucesso, mas estiver vazio
                console.log("Nenhum comentário encontrado para este filme.");
                return res.status(204).send("Nenhum comentário encontrado!"); // usa 204 (No Content) e para aqui
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar os comentários! Erro: ", erro.sqlMessage);
            return res.status(500).json(erro.sqlMessage);
        });
}

function publicarComentario(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idFilme = req.body.idFilmeServer;
    var mensagem = req.body.mensagemServer;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else if (idFilme == undefined) {
        res.status(400).send("ID do filme está undefined!");
    } else if (mensagem == undefined || mensagem.trim() == "") {
        res.status(400).send("A mensagem está vazia!");
    } else {
        filmeModel.publicarComentario(idUsuario, idFilme, mensagem)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


module.exports = {
    buscarPorId,
    interagir,
    pesquisar,
    buscarComentarios,
    publicarComentario
};