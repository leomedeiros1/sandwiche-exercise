const { execQuery } = require("../services/db");

async function queryCreateLink(link_name) {
    const query = 'INSERT INTO links (link_name) VALUES ($1) RETURNING *';
    const values = [link_name];
    // const result = await pool.query(query, values);
    
    await execQuery(query, values);
}

async function createLink(req, res) {
    try {
        const { link_name } = req.body;
        console.log("req.body:::", req.body);
        const resultQuery = await queryCreateLink(link_name);

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

async function queryAllLinks(){
    const query = 'SELECT * FROM links';
        
    return await execQuery(query, []);
}

async function getAllLinks(req, res) {
    try {
        const resultQuery = await queryAllLinks()

        if(resultQuery.success){
            return res.status(200).json(resultQuery.result.rows);
        } else{
            console.error('Erro ao obter todos os links:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao obter todos os links:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

async function queryMostAccessedLinks(qtdDays = 7) {
    const query = `
        SELECT 
            l.link_name
            , COUNT(a.access_id) AS accesses_count
        FROM 
            links l
            JOIN accesses a 
                ON l.link_id = a.access_link_fk
        WHERE 
            a.access_date >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY 
            l.link_id, l.link_name
        ORDER BY 
            accesses_count DESC;
    `;

    return await execQuery(query, []);
}

async function getMostAccessedLinks(req, res) {
    try {
        const { qtd_days } = req.body;

        const resultQuery = await queryMostAccessedLinks(qtd_days);

        if(resultQuery.success){
            return res.status(200).json( resultQuery.result.rows );
        } else{
            console.error('Erro ao obter os acessos agrupados:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao obter todos os accesses:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

// Exporte as funções do controller para uso em outros módulos
module.exports = { 
    queryCreateLink,
    queryAllLinks,

    createLink, 
    getAllLinks,
    
    queryMostAccessedLinks,
    getMostAccessedLinks,
};