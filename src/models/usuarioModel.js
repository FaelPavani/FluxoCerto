var database = require("../database/config");
const { editar } = require("./avisoModel");

function autenticar(email, senha,) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT  cargo, id, username, email FROM users WHERE email = '${email}' AND senha = '${senha}'; 

    `; // atualizar os dados da busca e o nome das tabelas do banco 
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(emaillogado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", emaillogado)
    var instrucaoSql = `
       SELECT id,username, cargo, cpf, linha, dataEntrada
FROM users
WHERE fk_responsavel = (
    SELECT id FROM users WHERE email = '${emaillogado}'
);

    `; // atualizar os dados da busca e o nome das tabelas do banco 
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function editare(ideditar) {
    console.log("ACESSEI O USUARIO MODEL");
    console.log(`\n\t>> Se aqui der erro de 'Error: connect ECONNREFUSED', verifique suas credenciais de acesso ao banco e se o servidor do BD está rodando corretamente.`);
    
    var instrucaoSql = `
        SELECT id, username, cargo, cpf, linha, senha
        FROM users
        WHERE id = ${ideditar};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function graficoPizzaPorAno(ano) {
    console.log("[MODEL] Acessando graficoPizzaPorAno com ano:", ano);

    const query = `
        SELECT linha, SUM(fluxoTotal) AS total_fluxo
        FROM entradaPorLinha
        WHERE YEAR(dataColeta) = '${ano}' AND linha IN ('Verde', 'Azul', 'Vermelha')
        GROUP BY linha
    `;

    console.log("[MODEL] Query SQL a ser executada:", query);

    return database.executar(query)
        .then(result => {
            console.log("[MODEL] Resultado da query:", result);
            return result;
        })
        .catch(error => {
            console.error("[MODEL] Erro ao executar query:", error);
            throw error;
        });
}








function estacaoPorAno(anoEstacao, estacaoEspecifica) {
    console.log("[MODEL] anoEstacao:", anoEstacao);
    console.log("[MODEL] estacaoEspecifica:", estacaoEspecifica);

    const instrucaoSql = `
        SELECT mes, fluxo
        FROM demandaPorEstacao
        WHERE ano = '${anoEstacao}' AND estacao = '${estacaoEspecifica}'
    `;

    console.log("[MODEL] Executando SQL com parâmetros");
    return database.executar(instrucaoSql, [anoEstacao, estacaoEspecifica]);
}



function selfEdit(email) {
    const instrucaoSql = `
        SELECT username, senha, cpf FROM users WHERE email = '${email}';
    `;
    return database.executar(instrucaoSql);
}

function atualizarUsuario(id, username, cpf, senha, cargo, linha) {
    const instrucao = `
        UPDATE users
        SET username = '${username}',
            cpf = '${cpf}',
            senha = '${senha}',
            cargo = '${cargo}',
            linha = '${linha}'
        WHERE id = ${id};
    `;
    console.log("Executando instrução SQL:", instrucao);
    return database.executar(instrucao);
}


function atualizarSelf(username, senha, cpf, email) {
    const instrucao = `
        UPDATE users
        SET username = ${username}, senha = ${senha}, cpf = ${cpf}
        WHERE email = ${email};
    `;

    return db.execute(instrucao);
}

function deletarUsuario(idDelete) {
    const instrucaoSql = `DELETE FROM users WHERE id = ${idDelete};`;

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

 
function carregarChartCentral(ano) {
    console.log("[MODEL] Consultando dados para o ano:", ano);

    const query = `
        SELECT 
            linha, 
            MONTH(dataColeta) AS mes_numero, 
            SUM(fluxoTotal) AS fluxoTotal
        FROM entradaPorLinha
        WHERE YEAR(dataColeta) = ${ano}
          AND linha IN ('Azul', 'Vermelha', 'Verde')
        GROUP BY linha, mes_numero
        ORDER BY linha, mes_numero;
    `;

    console.log("[MODEL] Query a ser executada:", query);

    return database.executar(query, [ano])
        .then(result => {
            console.log("[MODEL] Resultado da query:", result);
            return result;
        })
        .catch(error => {
            console.error("[MODEL] Erro ao executar query:", error);
            throw error;
        });
}



function fluxoEstacoesLinhaAzul(ano) {
    console.log("[MODEL] Consultando fluxo anual das estações da Linha Azul para o ano:", ano);

    const query = `
        SELECT 
            estacao,
            SUM(fluxo) AS fluxo_anual
        FROM demandaPorEstacao
        WHERE linha = 'Azul' AND YEAR(${ano}) 
        GROUP BY estacao
        ORDER BY estacao;
    `;

    console.log("[MODEL] Executando query:", query);

    return database.executar(query, [ano])
        .then(resultado => {
            console.log("[MODEL] Resultado da query:", resultado);
            return resultado;
        })
        .catch(erro => {
            console.error("[MODEL] Erro ao executar query:", erro);
            throw erro;
        });
}

function fluxoEstacoesLinhaVermelha(ano) {
    console.log("[MODEL] Consultando fluxo anual das estações da Linha Vermelha para o ano:", ano);

    const query = `
        SELECT 
            estacao,
            SUM(fluxo) AS fluxo_anual
        FROM demandaPorEstacao
        WHERE linha = 'Vermelha' AND YEAR(dataColeta) = ?
        GROUP BY estacao
        ORDER BY estacao;
    `;

    console.log("[MODEL] Executando query:", query);

    return database.executar(query, [ano])
        .then(resultado => {
            console.log("[MODEL] Resultado da query:", resultado);
            return resultado;
        })
        .catch(erro => {
            console.error("[MODEL] Erro ao executar query:", erro);
            throw erro;
        });
}
function fluxoEstacoesLinhaVerde(ano) {
    console.log("[MODEL] Consultando fluxo anual das estações da Linha Verde para o ano:", ano);

    const query = `
        SELECT 
            estacao,
            SUM(fluxo) AS fluxo_anual
        FROM demandaPorEstacao
        WHERE linha = 'Verde' AND YEAR(dataColeta) = ?
        GROUP BY estacao
        ORDER BY estacao;
    `;

    console.log("[MODEL] Executando query:", query);

    return database.executar(query, [ano])
        .then(resultado => {
            console.log("[MODEL] Resultado da query:", resultado);
            return resultado;
        })
        .catch(erro => {
            console.error("[MODEL] Erro ao executar query:", erro);
            throw erro;
        });
}

module.exports = {
    autenticar,
    cadastrarUsuario,
    cadastrarEmpresa,
    cadastrarOperador,
    listar,
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
};