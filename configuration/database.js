require('dotenv').config();
const knex = require('knex');

const pg = knex({
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_USERPASSWORD,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
        ssl: {
            rejectUnauthorized: false
          }
    },
});

module.exports = pg;
