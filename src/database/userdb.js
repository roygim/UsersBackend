const mysql = require('mysql2/promise')
const { MYSQL_LOCALHOST, MYSQL_USER, MYSQL_PASSWORD } = require('../config');

const mysqlUserDBPool = mysql.createPool({
    host: MYSQL_LOCALHOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'userdb'
})

module.exports = mysqlUserDBPool