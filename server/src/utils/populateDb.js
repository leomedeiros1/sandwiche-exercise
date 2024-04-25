
const linksController = require('../controllers/linksController')
const accessesController = require('../controllers/accessesController')

module.exports = {
    populateLinks,
    populateAccesses
}

async function populateLinks (qtd=8) {
    console.log("Populating Links");
    for(let i=0; i<qtd; i++){
        await linksController.queryCreateLink(`generated_link_${i}`);
    }
}

async function populateAccesses (
    startDate=null, 
    endDate=null, 
    links=[]
) {
    // Se não for fornecida uma data inicial, defina-a como 30 dias antes de hoje
    if (!startDate) {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
    }

    // Se não for fornecida uma data final, defina-a como hoje
    if (!endDate) {
        endDate = new Date();
    }
    
    console.log("Populating Acesses", startDate, endDate);
    let tmpDate = new Date(startDate);
    if(links.length==0){
        links = (await linksController.queryAllLinks()).result.rows.map((e) => e.link_id);
        if(links.length==0){
            await populateLinks();
            links = (await linksController.queryAllLinks()).result.rows.map((e) => e.link_id);
        }
    }

    console.log("Links to populate Accesses:", links)
    while(tmpDate <= endDate){
        let random_amount = Math.floor(Math.random() * 30)
        for(let i=0; i<random_amount; i++){
            let random_link = links[Math.floor(Math.random() * links.length)]
            accessesController.queryCreateAccess(random_link, new Date(tmpDate));
           
        }

        tmpDate.setDate(tmpDate.getDate()+1)
    }
}