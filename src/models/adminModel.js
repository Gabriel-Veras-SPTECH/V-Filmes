var database = require("../database/config");

function obterKpisGlobais() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM usuario) AS total_usuarios,
            (SELECT COUNT(*) FROM filme) AS total_filmes,
            (SELECT COUNT(*) FROM interacao WHERE visualizacao = 1) AS total_visualizacoes,
            (SELECT COUNT(*) FROM interacao WHERE curtida = 1) AS total_curtidas;
    `;
    console.log("Executando a query de KPIs Globais:\n", instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterGenerosGlobais() {
    var instrucaoSql = `
        SELECT f.genero, COUNT(i.fkFilme) AS qtd 
        FROM filme f
        JOIN interacao i ON f.idFilme = i.fkFilme
        WHERE i.visualizacao = 1
        GROUP BY f.genero
        ORDER BY qtd DESC
        LIMIT 5;
    `;
    console.log("Executando a query de Gêneros Globais:\n", instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterFilmesMaisCurtidos() {
    var instrucaoSql = `
        SELECT f.titulo, COUNT(i.fkFilme) AS curtidas
        FROM filme f
        JOIN interacao i ON f.idFilme = i.fkFilme
        WHERE i.curtida = 1
        GROUP BY f.idFilme, f.titulo
        ORDER BY curtidas DESC
        LIMIT 5;
    `;
    console.log("Executando a query de Filmes mais curtidos:\n", instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarFilme(titulo, ano, diretor, elenco, descricao, linkPoster, linkBanner, genero, pais, duracao) {
    var instrucaoSql = `
        INSERT INTO filme (titulo, ano, diretor, elenco, descricao, link_poster, link_banner, genero, pais, duracao_minutos) 
        VALUES ('${titulo}', ${ano}, '${diretor}', '${elenco}', '${descricao}', '${linkPoster}', '${linkBanner}', '${genero}', '${pais}', ${duracao});
    `;
    console.log("Executando a query de inserção de filme:\n", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obterKpisGlobais,
    obterGenerosGlobais,
    obterFilmesMaisCurtidos,
    cadastrarFilme
};