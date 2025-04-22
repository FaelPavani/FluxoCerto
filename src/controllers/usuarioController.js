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
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
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
            res.json({ empresa: resultadoEmpresa, usuario: resultadoUsuario });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage); // Resposta de erro única
        });
    
    }
}


// // function concluirCadastroOperador{
// //         // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
// //         var nome = req.body.serverNomeInput;
// //         var sobrenome = req.body.serverSobrenomeInput;
// //         var cpf = req.body.serverCpfInput;
// //         var dataNasc = req.body.serverInputDataNasc;
// //         var telefone = req.body.serverTelefoneInput;
// //         var email = req.body.serverEmailInput;
// //         var cargo = req.body.serverCargoSelect;
// //         var linha = req.body.serverLinhaSelect;
// //         var senha = req.body.serverSenhaInput;
// //         var confirmSenha = req.body.serverConfirmSenhaInput;
        
    
    
    
    
    
    
// //         // Faça as validações dos valores
    
    
    
    
// //         if (nome == undefined) {
// //             res.status(400).send("O nome está undefined!");
// //         } else if (sobrenome == undefined) {
// //             res.status(400).send("O sobrenome está undefined!");
// //         } else if (cpf == undefined) {
// //             res.status(400).send("O CPF está undefined!");
// //         } else if (dataNasc == undefined) {
// //             res.status(400).send("A data de nascimento está undefined!");
// //         } else if (telefone == undefined) {
// //             res.status(400).send("O telefone está undefined!");
// //         } else if (email == undefined) {
// //             res.status(400).send("O email está undefined!");
// //         } else if (cargo == undefined) {
// //             res.status(400).send("O cargo está undefined!");
// //         } else if (linha == undefined) {
// //             res.status(400).send("A linha está undefined!");
// //         } else if (senha == undefined) {
// //             res.status(400).send("A senha está undefined!");
// //         } 
        
     
// //          else {
    
    
    
// //                 usuarioModel.cadastrarOperador(nome, sobrenome, cpf, dataNasc, telefone, email, cargo, linha, senha)
// //             .then(
// //                 function (resultado) {
// //                     res.json(resultado);
// //                 }
// //             ).catch(
// //                 function (erro) {
// //                     console.log(erro);
// //                     console.log(
// //                         "\nHouve um erro ao realizar o cadastro! Erro: ",
// //                         erro.sqlMessage
// //                     );
// //                     res.status(500).json(erro.sqlMessage);
// //                 }
// //             );
    
    
    
    
    
            
//             // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            
//       



function cadastrarChamado(req, res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var mensagem = req.body.mensagemServer;

    var idUsuario = req.body.idUsuarioServer
    
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarChamado(idUsuario, nome, email, mensagem)
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

module.exports = {
    autenticar,
    cadastrar,
    cadastrarChamado
}

