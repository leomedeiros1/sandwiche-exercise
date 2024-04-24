const { execQuery } = require("../services/db");

async function createLink(req, res) {
    try {
        console.log("req.body:::", req.body);
        const { link_name } = req.body;

        const query = 'INSERT INTO links (link_name) VALUES ($1) RETURNING *';
        const values = [link_name];
        // const result = await pool.query(query, values);
        
        const resultQuery = await execQuery(query, values);

        if(resultQuery.success){
            return res.status(201).json({ message: 'Link criado com sucesso', link: resultQuery.result.rows[0] });
        } else {
            console.error('Erro ao inserir link:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao criar link:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

async function getAllLinks(req, res) {
    try {
        const query = 'SELECT * FROM links';
        
        const resultQuery = await execQuery(query, []);

        if(resultQuery.success){
            return res.status(200).json({ links: resultQuery.result.rows });
        } else{
            console.error('Erro ao obter todos os links:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao obter todos os links:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

// Exporte as funções do controller para uso em outros módulos
module.exports = { createLink, getAllLinks };