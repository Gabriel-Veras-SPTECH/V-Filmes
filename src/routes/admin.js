var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

router.get("/kpis", function (req, res) {
    adminController.buscarKpisGlobais(req, res);
});

router.get("/grafico-generos", function (req, res) {
    adminController.buscarGenerosGlobais(req, res);
});

router.get("/grafico-filmes", function (req, res) {
    adminController.buscarFilmesMaisCurtidos(req, res);
});

router.post("/cadastrar", function (req, res) {
    adminController.cadastrar(req, res);
});

module.exports = router;