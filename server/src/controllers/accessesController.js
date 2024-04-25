const { execQuery } = require("../services/db");


async function queryCreateAccess(link_id, access_date) {
    const values = [link_id];

    let sqlFields = `access_link_fk`;
    let sqlValues = `$1`;
    if(access_date){
        sqlFields += `, access_date`;
        sqlValues += `, $2`;
        values.push(access_date);
    }

    const query = `INSERT INTO accesses (${sqlFields}) VALUES (${sqlValues}) RETURNING *`;
    
    // const result = await pool.query(query, values);
    
    return await execQuery(query, values);
}

async function createAccess(req, res) {
    try {
        console.log("req.body:::", req.body);
        const { link_id, access_date } = req.body;

        const resultQuery = await queryCreateAccess(link_id, access_date);

        if(resultQuery.success){
            return res.status(201).json({ message: 'Access inserido com sucesso', access: resultQuery.result.rows[0] });
        } else {
            console.error('Erro ao inserir access:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao criar access:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

async function queryAllAccesses(){
    const query = `
        SELECT 
            acc.access_id
            , acc.access_date
            , links.link_name
        FROM 
            accesses acc
            LEFT OUTER JOIN links
                ON acc.access_link_fk = links.link_id
    `;
    return await execQuery(query, []);
}

async function getAllAccesses(req, res) {
    try {
        const resultQuery = await queryAllAccesses()

        if(resultQuery.success){
            return res.status(200).json( resultQuery.result.rows );
        } else{
            console.error('Erro ao obter todos os accesses:', resultQuery.message);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    } catch (error) {
        console.error('Erro ao obter todos os accesses:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

// Exporte as funções do controller para uso em outros módulos
module.exports = { 
    queryCreateAccess,
    createAccess, 
    queryAllAccesses,
    getAllAccesses,
};