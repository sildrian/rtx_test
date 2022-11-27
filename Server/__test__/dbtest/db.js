const { Client } = require('pg')

const config =  require('../configtest/config.js');
const { USER, HOST, DB, PASSWORD, PORT } = config.database;

const client = new Client({
    user: USER,
    host: HOST,
    database: DB,
    password: PASSWORD,
    port: PORT,
});   

client.connect();
module.exports = client;