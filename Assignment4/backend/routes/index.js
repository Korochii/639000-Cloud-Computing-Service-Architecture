var express = require('express');
var router = express.Router();
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '192.168.57.12',
    database: 'log',
    password: 'password',
    port: 5432,
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
