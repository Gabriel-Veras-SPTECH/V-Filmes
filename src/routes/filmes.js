var express = require("express");
var router = express.Router();
var filmeController = require("../controllers/filmeController");

router.get("/buscar/:idFilme", function (req, res) {
    filmeController.buscarPorId(req, res);
});

router.get("/pesquisar/:pesquisa", function (req, res) {
    filmeController.pesquisar(req, res);
});

router.get("/comentarios/:idFilme", function (req, res) {
    filmeController.buscarComentarios(req, res);
});

router.post("/comentar", function (req, res) {
    filmeController.publicarComentario(req, res);
});

module.exports = router;