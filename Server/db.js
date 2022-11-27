// const { Client } = require('pg')
import pkg from 'pg'
const { Client } = pkg

import config from './config.js';
const { USER, HOST, DB, PASSWORD, PORT } = config.database;

const client = new Client({
    user: USER,
    host: HOST,
    database: DB,
    password: PASSWORD,
    port: PORT,
});   

client.connect();
// module.exports = client;
export default client