var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}','${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPerfil(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL para buscarPerfil, ID: ", idUsuario);
    var instrucaoSql = `
        SELECT 
            u.id,
            u.nome,
            u.foto,
            u.bio,
            (SELECT COUNT(*) FROM interacao WHERE fkUsuario = u.id AND visualizacao = 1) as total_filmes,
            (SELECT COUNT(*) FROM interacao WHERE fkUsuario = u.id AND curtida = 1) as total_curtidas,
            (SELECT COUNT(*) FROM interacao WHERE fkUsuario = u.id AND watchlist = 1) as total_watchlist
        FROM usuario u 
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, nome, foto, bio, senha) {
    console.log("ACESSEI O USUARIO MODEL para atualizar: ", idUsuario);
    
    var instrucaoSql = `
        UPDATE usuario SET 
            nome = '${nome}',
            bio = '${bio}'
            ${foto != null ? `, foto = '${foto}'` : ''}
            ${senha != null ? `, senha = '${senha}'` : ''}
        WHERE id = ${idUsuario};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpisEstatisticas(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL para buscarKpisEstatisticas, ID: ", idUsuario);
    var instrucaoSql = `
        SELECT 
            IFNULL(SUM(f.duracao_minutos), 0) AS tempo_total,
            IFNULL((SELECT f2.genero FROM interacao i2 JOIN filme f2 ON i2.fkFilme = f2.idFilme WHERE i2.fkUsuario = ${idUsuario} AND i2.visualizacao = 1 GROUP BY f2.genero ORDER BY COUNT(*) DESC LIMIT 1), 'Nenhum') AS genero_favorito,
            IFNULL((SELECT FLOOR(f3.ano / 10) * 10 FROM interacao i3 JOIN filme f3 ON i3.fkFilme = f3.idFilme WHERE i3.fkUsuario = ${idUsuario} AND i3.visualizacao = 1 GROUP BY FLOOR(f3.ano / 10) * 10 ORDER BY COUNT(*) DESC LIMIT 1), 'Nenhum') AS decada_favorita,
            IFNULL((SELECT f4.pais FROM interacao i4 JOIN filme f4 ON i4.fkFilme = f4.idFilme WHERE i4.fkUsuario = ${idUsuario} AND i4.visualizacao = 1 GROUP BY f4.pais ORDER BY COUNT(*) DESC LIMIT 1), 'Nenhum') AS pais_favorito
        FROM interacao i
        JOIN filme f ON i.fkFilme = f.idFilme
        WHERE i.fkUsuario = ${idUsuario} AND i.visualizacao = 1;
    `;
    return database.executar(instrucaoSql);
}

function buscarGraficoDiretores(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL para buscarGraficoDiretores, ID: ", idUsuario);
    var instrucaoSql = `
        SELECT 
            f.diretor, 
            COUNT(*) AS qtd 
        FROM interacao i 
        JOIN filme f ON i.fkFilme = f.idFilme 
        WHERE i.fkUsuario = ${idUsuario} AND i.visualizacao = 1 
        GROUP BY f.diretor 
        ORDER BY qtd DESC 
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

function buscarGraficoGeneros(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL para buscarGraficoGeneros, ID: ", idUsuario);
    var instrucaoSql = `
        SELECT 
            f.genero, 
            COUNT(*) AS qtd 
        FROM interacao i 
        JOIN filme f ON i.fkFilme = f.idFilme 
        WHERE i.fkUsuario = ${idUsuario} AND i.visualizacao = 1 
        GROUP BY f.genero;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPerfil,
    atualizar,
    buscarKpisEstatisticas,
    buscarGraficoGeneros,
    buscarGraficoDiretores
};