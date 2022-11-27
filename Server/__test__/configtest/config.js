const dotenv = require("dotenv")
dotenv.config()

const client = {
  service: {
    port: 3000
  },
  source: {
    url: "https://hiring.zumata.xyz/job01"
  },
  database: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_DATABASE,
    PORT: process.env.DB_PORT,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}

module.exports = client;