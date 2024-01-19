const usersService = require('../services/users.service')
const { responseCode, responseStatus } = require('../util/response-object');
const { authenticationToken } = require('./middleware/authentication.middleware');

module.exports = (router) => {
    router.post("/register", async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;

        try {
            const newUser = { firstname: firstname, lastname: lastname, email: email, password: password }
            const response = await usersService.register(newUser)

            if (response.code == responseCode.USER_EXISTS) {
                res.status(400).send(responseStatus.USER_EXISTS);
            } else {
                res.status(201).send(responseStatus.USER_CREATE);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.post("/login", async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const response = await usersService.login(email, password)

            if (response.code == responseCode.INVALID_PASSWORD) {
                res.status(400).send(responseStatus.INVALID_PASSWORD);
            } else if (response.code == responseCode.USER_NOT_FOUND) {
                res.status(404).send(responseStatus.USER_NOT_FOUND);
            } else {
                res.status(200).send(response);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.put("/users/update", authenticationToken, async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;
            const user = req.user;
            res.send('users, World!');
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });   
};
