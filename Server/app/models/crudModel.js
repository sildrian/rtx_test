'use strict'

import client from '../../db.js';

const functions = {
    get: async () => {
        try {
            let data_ = await client.query(
                `select api from apis;`
            )
            return data_.rows[0].api;
        } catch (error) {
            console.error(error.stack);
            return [];
        }
    },
    update: async (value) => {
        try {
            let datenowused = (new Date().getMonth() + 1) + '-' + new Date().getDate() + '-' +  new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
            let data_ = await client.query(
                `select * from apis;`
            )
            let datadb = data_.rows;
            if(datadb.length != 0){
                await client.query(
                    `UPDATE "apis"
                    SET "api" = $1  
                    WHERE "id" = $2`, [value,datadb[0].id]); // sends queries
            }else{
                await client.query(
                    `INSERT INTO "apis"
                    ("api","createdAt","updatedAt") Values  
                    ($1,$2,$3)`, [value,datenowused,datenowused]); // sends queries
            }
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        }
    }
}

export default functions;