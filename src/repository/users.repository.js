const bcrypt = require('bcrypt');
const userdbPool = require('../database/userdb')

module.exports.addUser = async (newUser) => {
    try {
        const hashedPassword = await bcrypt.hash(newUser.password, 12)

        const sql_query = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
        const [row] = await userdbPool.execute(sql_query, [newUser.firstname, newUser.lastname, newUser.email, hashedPassword]);

        return row.insertId;
    } catch (err) {
        throw err
    }
}

module.exports.getUserByEmail = async (email) => {
    try {
        const [row] = await userdbPool.query('SELECT * FROM users WHERE email = ?', [email])

        console.log(row)
        if(row && row.length > 0) {
            return row[0];
        }

        return null
    } catch (err) {
        console.log(err)
        throw err
    }
}