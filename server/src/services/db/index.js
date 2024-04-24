const { Pool } = require('pg');
const keys = require("../keys");

// Postgres pool setup
const pool = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

async function execQuery(strQuery, queryArgs=[]){
    const client = await pool.connect();
    try {
        const result = await client.query(strQuery, queryArgs);
        return { success: true, result: result, message: 'Query executed successfully' };
    } catch (error) {
        return { success: false, message: 'Error during query execution', error };
    } finally {
        client.release();
    }
}

module.exports = { 
    // pool, 
    execQuery 
};