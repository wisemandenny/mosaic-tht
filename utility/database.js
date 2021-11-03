const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, // make a .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mosaic-api',
    port: process.env.DB_PORT
});

module.exports = {
    query: pool.query,
    execute: pool.execute,
    run: async (query) => {
        const conn = await pool.getConnection();
        try {
            const result = await conn.execute(query);
            console.log(result);
            await conn.destroy();
            return result;
        } catch (e) {
            console.error(query);
            await conn.destroy();
            throw e;
        }
    },
    // init: async () => {
    //     const conn = await pool.getConnection();
    //     console.log(conn);
    //     await conn.query({
    //         sql: 'CREATE DATABASE `mosaic-api`;'
    //     })
    // }
}