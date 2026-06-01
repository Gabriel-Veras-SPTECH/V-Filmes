var database = require("../database/config");

function buscarPorId(idFilme) {
    var instrucaoSql = `
        SELECT 
            titulo, 
            ano, 
            duracao_minutos, 
            diretor, 
            genero, 
            elenco, 
            descricao, 
            link_poster, 
            link_banner 
        FROM filme 
        WHERE idFilme = ${idFilme};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisar(pesquisa) {
    var instrucaoSql = `
        SELECT 
            idFilme,
            titulo, 
            ano, 
            genero,
            diretor, 
            link_poster 
        FROM filme 
        WHERE titulo LIKE '%${pesquisa}%' OR diretor LIKE '%${pesquisa}%' OR genero LIKE '%${pesquisa}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPorId,
    pesquisar
};