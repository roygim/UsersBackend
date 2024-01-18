const bcrypt = require('bcrypt');
const userdbPool = require('../database/mysql/userdb')

module.exports = (router) => {
    router.post("/register/signup", async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;

        try {
            // const [records] = await userdbPool.query("SELECT * FROM users")
            
            const hashedPassword = await bcrypt.hash(password, 12)
            
            // const newUser = { firstname: firstname, lastname: lastname, email: email, password: hashedPassword };
            // const sql_query = "INSERT INTO users SET ?";
            // const result = await userdbPool.query(sql_query, newUser)
            // console.log(result)


            const sql_query = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
            const [row] = await userdbPool.execute(sql_query, [firstname, lastname, email, hashedPassword]);
            console.log('New user ID ' + row.insertId);

            res.send(`${row.insertId}`);
        } catch (err) {
            next(err);
        }
    });
};
