var database = require("../database/config");

function listar() {
    console.log("ACESSEI O Modelo Resultado\n");

    var instrucaoSql = `
        SELECT 
            r.idQuiz, 
            r.pontos AS Pontuacao,
            u.nome AS Nome
        FROM 
            Resultado AS r
        JOIN 
            usuario AS u
        ON 
            r.fkUsuario = u.id
        ORDER BY 
            r.pontos DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O Modelo Resultado - listarPorUsuario()\n");

    var instrucaoSql = `
     SELECT 
            pontos, fkUsuario, tempo, porcentagemAcertos 
        FROM 
            Resultado 
        JOIN Usuario
        ON resultado.fkUsuario = usuario.id
        WHERE 
            fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirPontuacao(idUsuario, pontos, tempoGasto, porcentagemAcertos) {
    var instrucaoSql = `
        INSERT INTO Resultado (fkUsuario, pontos, tempo, porcentagemAcertos) 
        VALUES (${idUsuario}, ${pontos}, ${tempoGasto}, ${porcentagemAcertos});
    `;
    return database.executar(instrucaoSql);
}


function editar(idUsuario, pontos, tempoGasto, porcentagemAcertos) {
    console.log("ACESSEI O Modelo Resultado - editar()\n");

    var instrucaoSql = `
        UPDATE Resultado 
        SET 
            pontos = ${pontos}, 
            tempo = ${tempoGasto}, 
            porcentagemAcertos = ${porcentagemAcertos}
        WHERE 
            fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar10Melhores() {
var instrucaoSql = `
    select nome, pontos from resultado
        join usuario
        on fkusuario = id
        order by pontos desc
        limit 10;
`;

console.log("Executando a instrução SQL: \n" + instrucaoSql);

return database.executar(instrucaoSql);

}

module.exports = {
    listar,
    listarPorUsuario,
    inserirPontuacao,
    editar,
    listar10Melhores
};
