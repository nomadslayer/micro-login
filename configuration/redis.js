require('dotenv').config();

const redis = require('redis');

const rdClient = redis.createClient({
    host: process.env.RD_HOST,
    port: process.env.RD_PORT,
    password: process.env.RD_PASSWORD
});

module.exports = rdClient;
