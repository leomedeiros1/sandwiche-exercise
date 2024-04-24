const express = require('express')
const cors = require("cors");
const keys = require("./keys");

const port = 3000

const app = express()
app.use(cors());

// Postgres client setup
const { Pool } = require("pg");
const buildDatabaseQueries = require('./services/db/buildDatabaseQueries');
const pgPool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

// pgPool.on("connect", async (client) => {
//   // client
//   //   .query("CREATE TABLE IF NOT EXISTS test_table (number INT)")
//   //   .catch(err => console.log("PG ERROR", err));
// });

// get the test_table
app.get("/teste", async (req, res) => {
  const new_tst = await pgPool
    .query("INSERT INTO test_table(number) VALUES($1)", [Math.floor(Math.random() * 10)])
    .catch(err => console.log("PG ERROR", err));

  const values = await pgPool.query("SELECT * FROM test_table");
  const result = values.rows.map(row => row.number);
  
  res.send(result);
  // res.send([1,2,3]);
});

app.get('/', (req, res) => {
  res.send('Hello World  !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  buildDatabaseQueries.createDatabaseTables(pgPool).then(() => {
    console.log('Database verified');
  });

})