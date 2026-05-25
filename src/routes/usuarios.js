var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarPerfil/:idUsuario", function (req, res) {
    usuarioController.buscarPerfil(req, res);
});

router.put("/atualizar/:idUsuario", function (req, res) {
    usuarioController.atualizar(req, res);
});

router.get("/estatisticas/kpis/:idUsuario", function (req, res) {
    usuarioController.buscarKpisEstatisticas(req, res);
});

router.get("/estatisticas/generos/:idUsuario", function (req, res) {
    usuarioController.buscarGraficoGeneros(req, res);
});

router.get("/estatisticas/diretores/:idUsuario", function (req, res) {
    usuarioController.buscarGraficoDiretores(req, res);
});
module.exports = router;