var database = require("../database/config");

async function registrarInteracao(idUsuario, idFilme, tipo) {

    // verifica se a interação já existe
    var statusAtual = await buscarStatusInteracao(idUsuario, idFilme);
    // statusAtual deve vir algo como isso: [ { curtida: 0, visualizacao: 0, watchlist: 1 } ] ou isso [];

    let instrucao = "";

    if (statusAtual.length === 0) {
        // Se vier [] inserimos como primeira inserção
        let v = 0;
        let w = 0;
        let c = 0;

        if (tipo === 'visualizacao') {
            v = 1;
        } else if (tipo === 'watchlist') {
            w = 1;
        } else if (tipo === 'curtida') {
            c = 1;
        }

        instrucao = `
            INSERT INTO interacao (fkUsuario, fkFilme, visualizacao, watchlist, curtida, data_log) 
            VALUES (${idUsuario}, ${idFilme}, ${v}, ${w}, ${c}, NOW());
        `;

    } else {
        // Se já tiver interacao registrada, validamos
        let registro = statusAtual[0]; // pegamos o primeiro e único objeto
        let updateQuery = "";

        if (tipo === 'visualizacao') {
            // se ligar o view desliga o watchlist
            let novoView;
            if (registro.visualizacao) {
                novoView = 0;
            } else {
                novoView = 1;
            }

            let novoWatchlist;
            if (novoView === 1) {
                novoWatchlist = 0;
            } else {
                novoWatchlist = registro.watchlist;
            }

            updateQuery = `visualizacao = ${novoView}, watchlist = ${novoWatchlist}`;

        } else if (tipo === 'watchlist') {
            // se ligar o watchlist desliga o view
            let novoWatchlist;
            if (registro.watchlist) {
                novoWatchlist = 0;
            } else {
                novoWatchlist = 1;
            }

            let novoView;
            if (novoWatchlist === 1) {
                novoView = 0;
            } else {
                novoView = registro.visualizacao;
            }

            updateQuery = `watchlist = ${novoWatchlist}, visualizacao = ${novoView}`;

        } else {
            // curtida apenas inverte
            let novaCurtida;
            if (registro.curtida) {
                novaCurtida = 0;
            } else {
                novaCurtida = 1;
            }

            updateQuery = `curtida = ${novaCurtida}`;
            
        }

        instrucao = `
            UPDATE interacao 
            SET ${updateQuery}, data_log = NOW()
            WHERE fkUsuario = ${idUsuario} AND fkFilme = ${idFilme};
        `;
    }
    
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