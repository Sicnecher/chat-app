import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config()

async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  return connection;
}

const db = connectToDatabase()
export default db