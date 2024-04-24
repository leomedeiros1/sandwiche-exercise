const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require('./routes');
const { execQuery } = require('./services/db');
const buildDatabaseQueries = require('./services/db/buildDatabaseQueries');
const keys = require('./services/keys');
const { populateAccesses } = require('./utils/populateDb');

const linksController = require('./controllers/linksController')
const accessesController = require('./controllers/accessesController')

const port = keys.backendPort || 3000

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);


// pool.on("connect", async (client) => {
// });


app.get('/', (req, res) => {
  res.send('Hello World  !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  buildDatabaseQueries.createDatabaseTables().then(() => {
    console.log('Database verified');
  }).finally(() => {
    console.log("? ", keys.environment);
    if(keys.environment=="development"){
      console.log(`App is on Development environment; Checking for database samples`);
      accessesController.queryAllAccesses().then((value) => {
        if(value.result?.rows?.length < 5){
          console.log(`Database data low volume, trying to populate...`);
          populateAccesses().then(() => {
            console.log(`Database populated`);
          })
        }
      }).finally(() => {
        console.log(`Database date volume checked`);
      })
    }
  });

})