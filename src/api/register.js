const usersService = require('../services/users.service')

module.exports = (router) => {
    router.post("/register/signup", async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;

        try {
            const newUser = { firstname: firstname, lastname: lastname, email: email, password: password }
            const response = await usersService.register(newUser)

            if(response.code == -1) {
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
            const response = await usersService.login(email, password)

            if(response.code == -1) {
                res.status(400).send('Invalid password');
            } else if (response.code == -2) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send('User found');
            }
        } catch (err) {
            res.status(400).send('Error occurred');
        }
    });
};
