var database = require("../database/config");

function registrarInteracao(idUsuario, idFilme, tipo) {
    let updateQuery = "";

    if (tipo === 'visualizacao') {
        // Se ligar o view, desliga o watchlist
        updateQuery = `visualizacao = NOT visualizacao, watchlist = IF(visualizacao = 1, 0, watchlist)`;
    } else if (tipo === 'watchlist') {
        // Se ligar o watchlist, desliga o view
        updateQuery = `watchlist = NOT watchlist, visualizacao = IF(watchlist = 1, 0, visualizacao)`;
    } else {
        // Curtida permanece independente
        updateQuery = `curtida = NOT curtida`;
    }

    var instrucao = `
        INSERT INTO interacao (fkUsuario, fkFilme, ${tipo}, data_log) 
        VALUES (${idUsuario}, ${idFilme}, 1, NOW()) 
        ON DUPLICATE KEY UPDATE ${updateQuery};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarStatusInteracao(idUsuario, idFilme) {
    var instrucao = `
        SELECT curtida, visualizacao, watchlist 
        FROM interacao 
        WHERE fkUsuario = ${idUsuario} AND fkFilme = ${idFilme};
    `;
    return database.executar(instrucao);
}

module.exports = {
    registrarInteracao,
    buscarStatusInteracao
};