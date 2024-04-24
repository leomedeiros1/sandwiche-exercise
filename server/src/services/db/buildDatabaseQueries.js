const { execQuery } = require(".");

module.exports = {
    createDatabaseTables: async () => {
        try{
            const resultLinks = await createTableLinks();
            if (resultLinks.success) {
                console.log(`Table 'links' verified successfully`);
            } else {
                throw new Error(`Error creating table links: ${resultLinks.message}`);
            }

            const resultAccesses = await createTableAccesses();
            if (resultAccesses.success) {
                console.log(`Table 'accesses' verified successfully`);
            } else {
                throw new Error(`Error creating table links: ${resultAccesses.message}`);
            }

            console.log('All tables verified successfully');
        } catch (error) {
            console.error('Error creating tables:', error);
        }
    },

}

async function createTableLinks() {
    const CREATE_LINKS_TABLE_SQL = `
        CREATE TABLE IF NOT EXISTS links 
        (
            link_id SERIAL PRIMARY KEY,
            link_name TEXT
        );
    `
    return execQuery(CREATE_LINKS_TABLE_SQL)
}

async function createTableAccesses() {
    const CREATE_ACCESSES_TABLE_SQL = `
        CREATE TABLE IF NOT EXISTS accesses 
        (
            access_id SERIAL PRIMARY KEY,
            access_datetime TIMESTAMP,
            access_link_fk INT REFERENCES links (link_id)
        );
    `
    /*
        access_os_fk 
        access_browser_fk 
    */
    return execQuery(CREATE_ACCESSES_TABLE_SQL)
}


/*
populate_db(start_date=new Date().setDate(new Date().getDate() - 30), end_date=new Date()){
    while(start_date < end_date){
        // insert
        start_date.setDate(start_date.getDate()+1)
    }
}
*/