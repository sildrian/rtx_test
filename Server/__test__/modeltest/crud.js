'use strict'

const client = require ('../dbtest/db.js');

const functions = {
    get: async () => {
        try {
            let data_ = await client.query(
                `select api from data_api;`
            )
            return data_.rows[0].api;
        } catch (error) {
            console.error(error.stack);
            return [];
        }
    },
    update: async (value) => {
        try {
            await client.query(
                `UPDATE "data_api"
                SET "api" = $1  
                WHERE "id" = 1`, [value]); // sends queries
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        }
    }
}

module.exports = functions;