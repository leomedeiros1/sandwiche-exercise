const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require('./routes');
const { execQuery } = require('./services/db');
const buildDatabaseQueries = require('./services/db/buildDatabaseQueries');
const keys = require('./services/keys');

const port = keys.backendPort || 3000

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);


// pool.on("connect", async (client) => {
//   console.log("On.connect")
//   // client
//   //   .query("CREATE TABLE IF NOT EXISTS test_table (number INT)")
//   //   .catch(err => console.log("PG ERROR", err));
// });

// get the test_table
app.get("/teste", async (req, res) => {
  const new_tst = await execQuery("INSERT INTO test_table(number) VALUES($1)", [Math.floor(Math.random() * 10)])
    .catch(err => console.log("PG ERROR", err));

  const values = (await execQuery("SELECT * FROM test_table")).result;
  const result = values.rows.map(row => row.number);
  
  res.send(result);
  // res.send([1,2,3]);
});

app.get('/', (req, res) => {
  res.send('Hello World  !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  buildDatabaseQueries.createDatabaseTables().then(() => {
    console.log('Database verified');
  });

})