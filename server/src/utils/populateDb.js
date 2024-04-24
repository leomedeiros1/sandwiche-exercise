
const linksController = require('../controllers/linksController')
const accessesController = require('../controllers/accessesController')

module.exports = {
    populateLinks,
    populateAccesses
}

async function populateLinks (qtd=8) {
    console.log("Populating Links");
    for(let i=0; i<qtd; i++){
        linksController.queryCreateLink(`generated_link_${i}`);
    }
}

async function populateAccesses (
    start_date=new Date().setDate(new Date().getDate() - 1), 
    end_date=new Date(), 
    links=[]
) {
    console.log("Populating Acesses");
    let _date = new Date(start_date);
    if(links.length==0){
        links = (await linksController.queryAllLinks()).result.rows.map((e) => e.link_id);
        // await populateLinks();
        // links = (await linksController.queryAllLinks()).result.rows;
    }
    while(_date < end_date){
        // insert
        console.log("links", links)
        let random_amount = Math.floor(Math.random() * 30)
        for(let i=0; i<random_amount; i++){
            let random_link = links[Math.floor(Math.random() * links.length)]
            accessesController.queryCreateAccess(random_link, _date);
           
        }

        _date.setDate(_date.getDate()+1)
    }
}