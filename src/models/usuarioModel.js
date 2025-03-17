var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}'; 

    `; // atualizar os dados da busca e o nome das tabelas do banco 
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(nomeu, sobrenome, email, senha,)  // atualizar os valores de entrada para o cadastro e ver como fazer 2 querys para cadastrar a empresa  
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeu, sobrenome, email,senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha,fk_empresa) VALUES ('${nomeu}',' ${sobrenome}', '${email}', '${senha}',NULL);
    `;
        // INSERT INTO empresa (nomeFantasia, razaoSocial,cnpj) Values ('${nomef},${razaoSocial},${cnpj}');

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}
 function cadastrarEmpresa(nomef,cnpj,razaoSocial){



    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomef, cnpj, razaoSocial);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
         INSERT INTO empresa (nomeFantasia, razaoSocial,cnpj) Values ('${nomef}','${razaoSocial}','${cnpj}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);





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