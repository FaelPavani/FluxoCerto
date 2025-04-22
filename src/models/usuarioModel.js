var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}'; 

    `; // atualizar os dados da busca e o nome das tabelas do banco 
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// usuarioModel.cadastrarOperador(nome, sobrenome, cpf, dataNasc, telefone, email, cargo, linha, senha){

//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", 
//             nome, 
//             sobrenome, 
//             cpf, 
//             dataNasc, 
//             telefone, 
//             email, 
//             cargo, 
//             linha, 
//             senha
//     );
    
//     var instrucaoSql = `
//     INSERT INTO usuario (nome, sobrenome, email, senha,fk_empresa) VALUES ('${nomeu}',' ${sobrenome}', '${email}', '${senha}',NULL);
// `;



// }


// Função para cadastrar a empresa
function cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj, nomeEmpresa) {
    return new Promise((resolve, reject) => {
        // Query SQL para cadastrar a empresa
        const instrucaoSql = `
            INSERT INTO empresa (nomeFantasia, razaoSocial, cnpjEmpresa, nomeEmpresa)
            VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}', '${nomeEmpresa}');
        `;
        console.log("Executando a instrução SQL para empresa: \n" + instrucaoSql);

        // Executa a query e resolve ou rejeita a promessa com base no resultado
        database.executar(instrucaoSql)
            .then(resultado => {
                console.log("Empresa cadastrada com sucesso!");
                resolve(resultado); // Resolve a promessa com o resultado da inserção
            })
            .catch(erro => {
                console.log("Erro ao cadastrar empresa: ", erro);
                reject(erro); // Rejeita a promessa com o erro
            });
    });
}

// Função para cadastrar o usuário
function cadastrarUsuario(nomeUsuario, cpf, sobrenome, dataNasc, email, senha) {
    return new Promise((resolve, reject) => {
        // Query SQL para cadastrar o usuário
        const instrucaoSql = `
            INSERT INTO users (username, sobrenome, email, senha, cpf, fk_empresa)
            VALUES ('${nomeUsuario}', '${sobrenome}', '${email}', '${senha}', '${cpf}', NULL);
        `;
        console.log("Executando a instrução SQL para usuário: \n" + instrucaoSql);

        // Executa a query e resolve ou rejeita a promessa com base no resultado
        database.executar(instrucaoSql)
            .then(resultado => {
                console.log("Usuário cadastrado com sucesso!");
                resolve(resultado); // Resolve a promessa com o resultado da inserção
            })
            .catch(erro => {
                console.log("Erro ao cadastrar usuário: ", erro);
                reject(erro); // Rejeita a promessa com o erro
            });
    });
}
 




function cadastrarChamado(idUsuario, nome, email, mensagem){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarChamado():", idUsuario, nome, email, mensagem);

    var instrucaoSql = `
        insert into faleConosco(fkUsuario, nome, email, mensagem) values ('${idUsuario}',' ${nome}', '${email}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    autenticar,
    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarChamado
};