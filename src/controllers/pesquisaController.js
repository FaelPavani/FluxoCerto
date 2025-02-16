var pesquisaModel = require("../models/pesquisaModel");


function listar(req, res) {
    pesquisaModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os scores: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    pesquisaModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os scores: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    pesquisaModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os scores: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function inserirPontuacao(req, res) {
    var idUsuario = req.body.idUsuario;
    var pontos = req.body.qtdPontos;
    var tempo = req.body.tempoGasto;
    var porcentagemAcertos = req.body.porcentagemAcertos;

    pesquisaModel.listarPorUsuario(idUsuario)
        .then(function (resultadoListagem) {
            if (resultadoListagem.length == 1) {
                return pesquisaModel.editar(idUsuario, pontos, tempo, porcentagemAcertos);
            } else {
                return pesquisaModel.inserirPontuacao(idUsuario, pontos, tempo, porcentagemAcertos);
            }
        })
}


function listar10Melhores(req, res) {
    pesquisaModel.listar10Melhores()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os scores: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    inserirPontuacao,
    listar10Melhores
}