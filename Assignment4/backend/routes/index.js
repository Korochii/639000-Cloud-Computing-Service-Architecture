var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

const translate = require('@vitalets/google-translate-api');

/* POST home page. */
router.post('/', function(req, res, next) {
  const data = req.body.data;
  translate(data, { from: 'ja', to: 'en', client: 'gtx'}).then(trans => {
  client.query("INSERT INTO log(id, japinput, engoutput) VALUES (DEFAULT, \$1, \$2)", [data, trans.text], (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data insert successful');
          });
  console.log(data);
  res.send(data);});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  client.query("SELECT * FROM log", (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    processedResults = JSON.stringify(result.rows);
    res.send(processedResults);});
});

module.exports = router;
