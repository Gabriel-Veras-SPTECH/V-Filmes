var express = require("express");
var router = express.Router();
var interacaoController = require("../controllers/interacaoController");

router.post("/registrar", function (req, res) {
    interacaoController.registrar(req, res);
});

router.get("/status/:idUsuario/:idFilme", function (req, res) {
    interacaoController.buscarStatus(req, res);
});

module.exports = router;