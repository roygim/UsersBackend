const bcrypt = require('bcrypt');
const userdbPool = require('../database/userdb')

module.exports.getAll = async () => {
    try {
        const sql_query = `SELECT * FROM users`;
        const [row] = await userdbPool.query(sql_query);

        return row;
    } catch (err) {
        throw err
    }
}

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

        if (row && row.length > 0) {
            return row[0];
        }

        return null
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports.updateUser = async (userId, user) => {
    try {
        const sql_query = 'UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?';
        const [row] = await userdbPool.execute(sql_query, [user.firstname, user.lastname, user.email, userId]);
        
        if (row.affectedRows > 0) {
            return true
        }
        
        return false;
    } catch (err) {
        throw err
    }
}

module.exports.deleteUser = async (userId) => {
    try {
        const sql_query = 'DELETE FROM users WHERE id = ?';
        const [row] = await userdbPool.execute(sql_query, [userId]);

        if (row.affectedRows > 0) {
            return true
        }
        
        return false;
    } catch (err) {
        throw err
    }
}