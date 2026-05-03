var database = require("../database/config");

function buscarPorId(idFilme) {
    var instrucaoSql = `
        SELECT titulo, ano, diretor, elenco, descricao, link_poster, link_banner FROM filme WHERE idFilme = ${idFilme};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPorId
};