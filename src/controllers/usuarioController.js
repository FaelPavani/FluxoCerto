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
            
      





module.exports = {
    autenticar,
    cadastrar,
    cadastrarOperador
}

