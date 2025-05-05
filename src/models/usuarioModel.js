var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, username, email FROM users WHERE email = '${email}' AND senha = '${senha}'; 

    `; // atualizar os dados da busca e o nome das tabelas do banco 
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarOperador(nome, sobrenome, cpf, dataNasc, telefone, email, cargo, linha, senha, emailLogado) {
    return new Promise((resolve, reject) => {
        console.log(
            "ACESSEI O USUARIO MODEL para cadastrarOperador com:", 
            nome, sobrenome, cpf, dataNasc, telefone, email, cargo, linha, senha,
            "\n>> email do usuário logado:", emailLogado
        );

        // 1) Busca o id e o fk_empresa do usuário que está logado
        const selectResponsavel = `
            SELECT id, fk_empresa 
            FROM users 
            WHERE email = '${emailLogado}'
            LIMIT 1;
        `;
        console.log("Executando SELECT para buscar id e fk_empresa do responsável:\n", selectResponsavel);

        database.executar(selectResponsavel)
            .then(resultadoSelect => {
                if (!resultadoSelect || resultadoSelect.length === 0) {
                    throw new Error("Usuário logado não encontrado!");
                }

                const idResponsavel     = resultadoSelect[0].id;
                const fkEmpresaLogado   = resultadoSelect[0].fk_empresa;
                console.log("ID do responsável:", idResponsavel);
                console.log("fk_empresa do responsável:", fkEmpresaLogado);

                // 2) Insere o novo operador, atribuindo fk_responsavel e fk_empresa
                const instrucaoSql = `
                    INSERT INTO users 
                        (username, cpf, dataNasc, email, cargo, linha, senha, fk_empresa, fk_responsavel) 
                    VALUES 
                        (
                            '${nome}',  
                            '${cpf}', 
                            '${dataNasc}',  
                            '${email}', 
                            'analista', 
                            '${linha}', 
                            '${senha}', 
                            ${fkEmpresaLogado},
                            ${idResponsavel}
                        );
                `;
                console.log("Executando INSERT do operador:\n", instrucaoSql);
                return database.executar(instrucaoSql);
            })
            .then(resultadoInsert => {
                console.log("Operador cadastrado com sucesso:", resultadoInsert);
                resolve(resultadoInsert);
            })
            .catch(erro => {
                console.error("Erro em cadastrarOperador:", erro);
                reject(erro);
            });
    });
}

function listarUsuarios(req, res) {
    const emailLogado = req.body.emailLogado; // Recebe o email logado
    const instrucaoSql = `
        SELECT nome, cpf, cargo, linha_atuacao AS linha, 
               DATE_FORMAT(data_inicio, '%d/%m/%Y') AS dataInicio
        FROM usuarios
        WHERE fk_responsavel = (SELECT id FROM users WHERE email = '${emailLogado}' LIMIT 1);
    `;
    database.executar(instrucaoSql)
        .then(resultado => {
            if (resultado && resultado.length > 0) {
                res.json(resultado);  // Retorna os dados como JSON
            } else {
                res.json([]);  // Caso não haja usuários, retorna um array vazio
            }
        })
        .catch(erro => {
            console.error("Erro ao listar usuários:", erro);
            res.status(500).json({ error: "Erro ao listar usuários" });
        });
}





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
        // Query SQL para cadastrar o usuário, incluindo a subquery para obter o último id da tabela empresa
        const instrucaoSql = `
            INSERT INTO users (username, email, cargo, senha, cpf, fk_empresa, linha)
            VALUES (
                '${nomeUsuario}', 
                '${email}', 
                'gestor', 
                '${senha}', 
                '${cpf}', 
                (SELECT id FROM empresa ORDER BY id DESC LIMIT 1), -- Subquery para pegar o último id da tabela empresa,
                'all'
            );
        `;
        console.log("Executando a instrução SQL para usuário: \n" + instrucaoSql);

        // Executa a query e resolve ou rejeita a promessa com base no resultado
        database.executar(instrucaoSql)
            .then(resultado => {
                console.log("Usuário cadastrado com sucesso!");

                // Agora que o usuário foi inserido, obtemos o id do usuário recém-criado
                const idUsuarioCriado = resultado.insertId; // Assumindo que o banco de dados retorna o id do usuário inserido

                // Query SQL para atualizar fk_responsavel com o id do próprio usuário
                const instrucaoUpdateSql = `
                    UPDATE users 
                    SET fk_responsavel = ${idUsuarioCriado} 
                    WHERE id = ${idUsuarioCriado};
                `;
                console.log("Executando a instrução SQL para atualizar fk_responsavel: \n" + instrucaoUpdateSql);

                // Atualiza o campo fk_responsavel com o id do próprio usuário
                database.executar(instrucaoUpdateSql)
                    .then(() => {
                        console.log("fk_responsavel do usuário atualizado com sucesso!");
                        resolve(resultado); // Resolve a promessa com o resultado da inserção
                    })
                    .catch(erro => {
                        console.log("Erro ao atualizar fk_responsavel: ", erro);
                        reject(erro); // Rejeita a promessa com o erro
                    });
            })
            .catch(erro => {
                console.log("Erro ao cadastrar usuário: ", erro);
                reject(erro); // Rejeita a promessa com o erro
            });
    });
}

 







module.exports = {
    autenticar,
    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarOperador
};