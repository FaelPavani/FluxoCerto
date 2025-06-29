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
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            // atualizar valores da busca 
                            id: resultadoAutenticar[0].id,
                            email: resultadoAutenticar[0].email,
                            username: resultadoAutenticar[0].username,
                            senha: resultadoAutenticar[0].senha,
                            cargo: resultadoAutenticar[0].cargo
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
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
    var nomeFantasia = req.body.nomeFantasiaServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cnpj = req.body.cnpjServer;
    var nomeUsuario = req.body.nomeUsuarioServer
    var razaoSocial = req.body.razaoSocialServer
    var nomeEmpresa = req.body.nomeEmpresaServer
    var cpf = req.body.cpfServer
    var dataNasc = req.body.cpfServer

    // Faça as validações dos valores

    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    }else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    }else if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dataNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    }   else if(nomeUsuario == undefined){
            res.status(400).send("Seu nome de usuario está undefined!");
        }
        else if(cnpj == undefined){

            res.status(400).send("seu cnpj está undefined!");
        }
        else if(razaoSocial == undefined){
            res.status(400).send("sua razão Social está undefined!");
        } 
 
     else {


        usuarioModel.cadastrarEmpresa(nomeEmpresa, nomeFantasia, razaoSocial, cnpj)
        .then(function (resultadoEmpresa) {
            console.log("Empresa cadastrada:", resultadoEmpresa);
    
            // Agora, você pode chamar a função para cadastrar o usuário.
            return usuarioModel.cadastrarUsuario(nomeUsuario, cpf, sobrenome, dataNasc, email, senha);
        })
        .then(function (resultadoUsuario) {
            console.log("Usuário cadastrado:", resultadoUsuario);
    
            // Depois de ambos os cadastros, envia a resposta para o cliente
            res.json({ usuario: resultadoUsuario });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage); // Resposta de erro única
        });
    
    }
}

function Listar(req,res){
var emailLogado = req.body.emailLogadoserver;

    if (emailLogado == undefined) {
        res.status(400).send("Seu email está undefined!");
    }
     else {

        usuarioModel.listar(emailLogado)
    .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length > 0) {
            // Retorna todos os usuários encontrados
            res.json(
                resultadoAutenticar.map(usuario => ({
                   cpf: usuario.cpf,
                    username: usuario.username,
                    linha: usuario.linha,
                    cargo: usuario.cargo,
                    dataEntrada: usuario.dataEntrada,
                    id: usuario.id
                }))
            );
        } else {
            res.status(404).send("Nenhum usuário encontrado com esse critério.");
        }
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });



     }
    }
// nome cargo cpf linha data de inicio 

function editare(req, res) {
    var ideditar = req.body.idUsuario;

    if (ideditar == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {
        usuarioModel.editare(ideditar) // <- Aqui passa o id do usuário
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length > 0) {
                    // Retorna o primeiro usuário encontrado
                    const usuario = resultadoAutenticar[0];
                    res.json({
                        cpf: usuario.cpf,
                        username: usuario.username,
                        linha: usuario.linha,
                        cargo: usuario.cargo,
                        dataEntrada: usuario.dataEntrada,
                        senha: usuario.senha
                    });
                } else {
                    res.status(404).send("Nenhum usuário encontrado com esse critério.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function atualizarUsuario(req, res) {
    const { id, username, cpf, senha, cargo, linha } = req.body;

    // Validação básica
    if (!id || !username || !cpf || !senha || !cargo || !linha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    usuarioModel.atualizarUsuario(id, username, cpf, senha, cargo, linha)
        .then(resultado => {
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao atualizar usuário:", erro);
            res.status(500).json({ erro: "Erro ao atualizar usuário." });
        });
}



function deletarUsuario(req, res) {
    const idDelete = req.body.idDelete;

    if (!idDelete) {
        return res.status(400).send("ID do usuário não foi fornecido.");
    }
usuarioModel.deletarUsuario(idDelete)
        .then(resultado => {
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao atualizar usuário:", erro);
            res.status(500).json({ erro: "Erro ao atualizar usuário." });
        });
}


function selfEdit(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erro: "Email não informado." });
    }

    usuarioModel.selfEdit(email)
        .then(resultado => {
            if (resultado.length > 0) {
                const { username, senha, cpf } = resultado[0];
                res.json({ username, senha, cpf });
            } else {
                res.status(404).json({ erro: "Usuário não encontrado." });
            }
        })
        .catch(erro => {
            console.error("Erro no controller:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}



const atualizarSelf = async (req, res) => {
    const { username, senha, cpf, email } = req.body;

    if (!username || !senha || !cpf || !email) {
        return res.status(400).json({ erro: "Dados incompletos para atualização." });
    }

    try {
        const resultado = await usuarioModel.atualizarSelf(username, senha, cpf, email);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
        } else {
            res.status(404).json({ erro: "Usuário não encontrado ou dados iguais." });
        }
    } catch (erro) {
        console.error("Erro ao atualizar self:", erro);
        res.status(500).json({ erro: "Erro interno ao atualizar usuário." });
    }
};









function cadastrarOperador(req, res) {

    // Agora, você pode usar o emailLogado para o processo de cadastro
    var nome = req.body.serverNome;
    var sobrenome = req.body.serverSobrenome;
    var cpf = req.body.serverCpf;
    var dataNasc = req.body.serverDataNasc;
    var telefone = req.body.serverTelefone;
    var email = req.body.serverEmail;  // Este é o email que o usuário forneceu
    var cargo = req.body.serverCargo;
    var linha = req.body.serverLinha;
    var senha = req.body.serverSenha;
    var emailLogado = req.body.serverEmailLogado;


    // Verifica se todos os campos necessários estão presentes
    if (!nome || !sobrenome || !cpf || !dataNasc || !telefone || !email || !cargo || !linha || !senha) {
        return res.status(400).send("Todos os campos devem ser preenchidos!");
    }

    // Aqui, o emailLogado (da sessão) é passado para a função de cadastro
    usuarioModel.cadastrarOperador(nome, sobrenome, cpf, dataNasc, telefone, email, cargo, linha, senha, emailLogado)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json({ error: erro.sqlMessage });
        });
}
    
    
            
            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            
   async function graficoPizzaPorAno(req, res) {
    const { anoEstacao } = req.body;  // ALTERADO para req.body
    console.log("[CONTROLLER] Recebido anoEstacao:", anoEstacao);

    if (!anoEstacao) {
        console.warn("[CONTROLLER] Parâmetro 'anoEstacao' não foi informado.");
        return res.status(400).json({ error: "Ano é obrigatório" });
    }

    try {
        const resultado = await usuarioModel.graficoPizzaPorAno(anoEstacao);
        console.log("[CONTROLLER] Resultado da consulta no model:", resultado);

        const linhas = ['Azul', 'Vermelha', 'Verde'];
        const respostaFinal = linhas.map(linhaDesejada => {
            const item = resultado.find(r => r.linha === linhaDesejada);
            console.log(`[CONTROLLER] Linha ${linhaDesejada}:`, item ? Number(item.total_fluxo) : 0);
            return item ? Number(item.total_fluxo) : 0;
        });

        console.log("[CONTROLLER] Resposta final que será enviada:", respostaFinal);
        res.json(respostaFinal);
    } catch (erro) {
        console.error("[CONTROLLER] Erro ao buscar fluxo por linha:", erro);
        res.status(500).json({ error: "Erro interno ao buscar fluxo por linha" });
    }
}




async function estacaoPorAno(req, res) {
    const { anoEstacao, estacaoEspecifica } = req.body;

    console.log("[CONTROLLER] anoEstacao:", anoEstacao);
    console.log("[CONTROLLER] estacaoEspecifica:", estacaoEspecifica);

    if (!anoEstacao || !estacaoEspecifica) {
        return res.status(400).json({ error: "Parâmetros 'anoEstacao' e 'estacaoEspecifica' são obrigatórios." });
    }

    try {
        const rows = await usuarioModel.estacaoPorAno(anoEstacao, estacaoEspecifica);

        const mesesFixos = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const resultado = Array(12).fill(0);

        rows.forEach(row => {
            const index = mesesFixos.findIndex(m => m.toLowerCase() === row.mes.toLowerCase());
            if (index !== -1) {
                resultado[index] = parseFloat(row.fluxo);
            }
        });

        console.log("[CONTROLLER] Resultado final:", resultado);

        res.json(resultado);
    } catch (error) {
        console.error("[CONTROLLER] Erro ao buscar dados:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
}

async function carregarChartCentral(req, res) {
    const { ano } = req.body;
    console.log("[CONTROLLER] Recebido ano:", ano);

    if (!ano) {
        console.warn("[CONTROLLER] Ano não informado.");
        return res.status(400).json({ error: "Ano é obrigatório" });
    }

    try {
        const resultado = await usuarioModel.carregarChartCentral(ano);
        console.log("[CONTROLLER] Resultado do model:", resultado);

        // Criar arrays com 12 posições (meses) inicializadas com zero
        const azul = Array(12).fill(0);
        const vermelha = Array(12).fill(0);
        const verde = Array(12).fill(0);

        resultado.forEach(({ linha, mes_numero, fluxoTotal }) => {
            const index = mes_numero - 1; // mês em índice do array (0-11)
            if (linha.toLowerCase() === 'azul') azul[index] = fluxoTotal;
            else if (linha.toLowerCase() === 'vermelha') vermelha[index] = fluxoTotal;
            else if (linha.toLowerCase() === 'verde') verde[index] = fluxoTotal;
        });

        console.log("[CONTROLLER] Arrays de fluxo por linha e mês:", { azul, vermelha, verde });

        res.json({ azul, vermelha, verde });
    } catch (erro) {
        console.error("[CONTROLLER] Erro no controller:", erro);
        res.status(500).json({ error: "Erro interno ao buscar dados" });
    }
}


function fluxoEstacoesLinhaAzul(req, res) {
    const { ano } = req.body;
    console.log("[CONTROLLER] Ano recebido:", ano);

    usuarioModel.fluxoEstacoesLinhaAzul(ano)
        .then(resultado => {
            console.log("[CONTROLLER] Resultado da query:", resultado);
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("[CONTROLLER] Erro ao buscar dados:", erro);
            res.status(500).json({ erro: "Erro ao buscar fluxo anual das estações da Linha Azul" });
        });
}


function fluxoEstacoesLinhaVermelha(req, res) {
    const { ano } = req.body;
    console.log("[CONTROLLER] Ano recebido:", ano);

    usuarioModel.fluxoEstacoesLinhaVermelha(ano)
        .then(resultado => {
            console.log("[CONTROLLER] Resultado da query:", resultado);
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("[CONTROLLER] Erro ao buscar dados:", erro);
            res.status(500).json({ erro: "Erro ao buscar fluxo anual das estações da Linha Vermelha" });
        });
}
function fluxoEstacoesLinhaVerde(req, res) {
    const { ano } = req.body;
    console.log("[CONTROLLER] Ano recebido:", ano);

    usuarioModel.fluxoEstacoesLinhaVerde(ano)
        .then(resultado => {
            console.log("[CONTROLLER] Resultado da query:", resultado);
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("[CONTROLLER] Erro ao buscar dados:", erro);
            res.status(500).json({ erro: "Erro ao buscar fluxo anual das estações da Linha Verde" });
        });
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarOperador,
    Listar,
    editare,
    atualizarUsuario,
    deletarUsuario,
    selfEdit,
    atualizarSelf,
    estacaoPorAno,
    graficoPizzaPorAno,
    carregarChartCentral,
    fluxoEstacoesLinhaAzul,
    fluxoEstacoesLinhaVerde,
    fluxoEstacoesLinhaVermelha
}


