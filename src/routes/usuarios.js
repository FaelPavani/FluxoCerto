var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js


router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarChamado", function (req, res) {
    usuarioController.cadastrarChamado(req, res);
})

router.post("/cadastrarOperador", function (req, res) {
    usuarioController.cadastrarOperador(req, res);
})
router.post("/dadosCadastroOperador", function (req, res) {
    usuarioController.cadastrarOperador(req, res);
})
router.post("/listar", function (req, res) {
    usuarioController.Listar(req, res);
})
router.post("/editare", function (req, res) {
    usuarioController.editare(req, res);
})
router.post("/atualizarUsuario", function (req, res) {
    usuarioController.atualizarUsuario(req, res);
})
router.delete("/deletarUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
})
router.post("/selfEdit", function (req, res) {
    usuarioController.selfEdit(req, res);
})
router.post("/atualizarSelf", function (req, res) {
    usuarioController.atualizarSelf(req, res);
})

module.exports = router;