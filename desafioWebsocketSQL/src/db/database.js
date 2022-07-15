const knex = require('knex');
const path = require('path');

const configMysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'coderEcommerce'
    },
    pool: { min: 0, max: 7},
}

const configSqLite3 = {
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, '../db/chats/chats.sqlite')},
    useNullAsDefault: true
}

const connectionMysql = knex(configMysql);
const connectionSQLite = knex(configSqLite3);

module.exports = { connectionMysql, connectionSQLite};