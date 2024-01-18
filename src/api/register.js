const usersService = require('../services/users.service')

module.exports = (router) => {
    router.post("/register/signup", async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;

        try {
            const newUser = { firstname: firstname, lastname: lastname, email: email, password: password }
            const insertId = await usersService.register(newUser)

            if(insertId == -1) {
                res.status(400).send('User already exists');    
            } else {
                res.status(201).send('User created successfully!');
            }            
        } catch (err) {
            res.status(400).send('Error occurred');
        }
    });

    router.post("/register/login", async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const user = await usersService.login(email)

            if(user) {
                res.status(200).send('User found');
            } else {
                res.status(404).send('User not found');
            }            
        } catch (err) {
            res.status(400).send('Error occurred');
        }
    });
};
