import dotenv from "dotenv"
dotenv.config()

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
}
