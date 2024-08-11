import Knex from 'knex';
import knexConfig from '../../knexfile.js';
// import knexConfig from '../knexfile.js';

const environment = process.env.NODE_ENV || 'development'; 
const config = knexConfig[environment];

const knex = Knex(config);

export default knex;