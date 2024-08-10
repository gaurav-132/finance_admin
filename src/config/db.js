import Knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
import { __dirname, resolve } from './pathUtils.js';

dotenv.config({ path: path.resolve(__dirname, './.env') });

const dbConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',  // Ensure this is correctly specified
    directory: './src/data/migrations'  // Ensure this path is correct
  }
};


const knex = Knex(dbConfig);

export default knex;
