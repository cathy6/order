
const mysql = require('mysql');
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'order'
};

const connPool = mysql.createPool(dbConfig);

module.exports = connPool;
