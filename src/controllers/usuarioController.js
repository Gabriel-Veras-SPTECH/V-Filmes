var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length == 1) {
                    // Login com sucesso! Enviando apenas os dados do usuário
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarPerfil(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        usuarioModel.buscarPerfil(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(204).send("Nenhum usuário encontrado para o perfil.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o perfil! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function atualizar(req, res) {
    var idUsuario = req.params.idUsuario;
    var nome = req.body.nomeServer;
    var foto = req.body.fotoServer;
    var bio = req.body.bioServer;
    var senha = req.body.senhaServer;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está indefinido!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else {
        usuarioModel.atualizar(idUsuario, nome, foto, bio, senha)
            .then(function (resultado) {
                res.status(200).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar o perfil! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarKpisEstatisticas(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.buscarKpisEstatisticas(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum dado encontrado.");
            }
        }).catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarGraficoGeneros(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.buscarGraficoGeneros(idUsuario)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                // retorna um vetor vazio caso o usuário não tenha nenhuma interação cadastrada ainda
                res.status(200).json([]); 
            }
        }).catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarGraficoDiretores(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.buscarGraficoDiretores(idUsuario)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                // retorna um vetor vazio caso o usuário não tenha nenhuma interação cadastrada ainda
                res.status(200).json([]);
            }
        }).catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarGraficoDiretores(req, res) {
    var idUsuario = req.params.idUsuario;
    usuarioModel.buscarGraficoDiretores(idUsuario)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                // retorna um vetor vazio caso o usuário não tenha nenhuma interação cadastrada ainda
                res.status(200).json([]);
            }
        }).catch(function (erro) {
            console.error(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function diario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        usuarioModel.diario(idUsuario)
            .then(function (resultado) {
                if (resultado && resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    // retorna um vetor vazio caso o usuário não tenha nenhuma interação cadastrada ainda
                    res.status(200).json([]); 
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o diário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPerfil,
    atualizar,
    buscarKpisEstatisticas,
    buscarGraficoGeneros,
    buscarGraficoDiretores,
    diario
}