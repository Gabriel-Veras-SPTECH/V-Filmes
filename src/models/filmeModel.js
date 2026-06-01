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

function buscarComentarios(idFilme) {
    var instrucaoSql = `
        SELECT 
            m.idPost,
            m.mensagem,
            m.data_postagem,
            u.nome AS nome_usuario,
            u.foto AS foto_usuario
        FROM mural m
        JOIN usuario u ON m.fkUsuario = u.id
        WHERE m.fkFilme = ${idFilme}
        ORDER BY m.data_postagem DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicarComentario(idUsuario, idFilme, mensagem) {
    var instrucaoSql = `
        INSERT INTO mural (fkUsuario, fkFilme, mensagem) 
        VALUES (${idUsuario}, ${idFilme}, '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPorId,
    pesquisar,
    buscarComentarios,
    publicarComentario
};