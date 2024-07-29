// db.js
import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const createDatabaseConnection = () => {
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  })
}

const DB = createDatabaseConnection()

export default DB
