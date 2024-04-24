module.exports = {
    createDatabaseTables: async (pool) => {
        try{
            const resultLinks = await createTableLinks(pool);
            if (resultLinks.success) {
                console.log('Table links created successfully');
            } else {
                throw new Error(`Error creating table links: ${resultLinks.message}`);
            }

            const resultAccesses = await createTableAccesses(pool);
            if (resultAccesses.success) {
                console.log('Table accesses created successfully');
            } else {
                throw new Error(`Error creating table links: ${resultAccesses.message}`);
            }

            console.log('All tables created successfully');
        } catch (error) {
            console.error('Error creating tables:', error);
        }
    },

}


async function createTableLinks(pool) {
    const CREATE_LINKS_TABLE_SQL = `
        CREATE TABLE IF NOT EXISTS links 
        (
            link_id SERIAL PRIMARY KEY,
            link_name TEXT
        );
    `
    const client = await pool.connect();
    try {
        const result = await client.query(CREATE_LINKS_TABLE_SQL);
        return { success: true, message: 'Table links created successfully' };
    } catch (error) {
        return { success: false, message: 'Error creating table links', error };
    } finally {
        client.release();
    }
}

async function createTableAccesses(pool) {
    const CREATE_ACCESSES_TABLE_SQL = `
        CREATE TABLE IF NOT EXISTS accesses 
        (
            access_id SERIAL PRIMARY KEY,
            access_datetime TIMESTAMP,
            access_link_fk INT REFERENCES links (link_id)
        );
    `
    const client = await pool.connect();
    try {
        const result = await client.query(CREATE_ACCESSES_TABLE_SQL);
        return { success: true, message: 'Table links created successfully' };
    } catch (error) {
        return { success: false, message: 'Error creating table links', error };
    } finally {
        client.release();
    }
}



/*
    access_os_fk 
    access_browser_fk 
*/

/*
populate_db(start_date=new Date().setDate(new Date().getDate() - 30), end_date=new Date()){
    while(start_date < end_date){
        // insert
        start_date.setDate(start_date.getDate()+1)
    }
}
*/