const usersService = require('../services/users.service')
const { responseCode, responseStatus, ResponseObject } = require('../util/response-object');
const { authenticationToken } = require('./middleware/authentication.middleware');

module.exports = (router) => {
    router.get("/users", async (req, res) => {
        try {
            const response = await usersService.getAll()

            if (response.code == responseCode.OK) {
                res.status(200).send(response);
            } else {
                res.status(400).send(responseStatus.ERROR);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.post("/register", async (req, res) => {
        const { firstname, lastname, email, password } = req.body;

        try {
            const newUser = { firstname: firstname, lastname: lastname, email: email, password: password }
            const response = await usersService.register(newUser)

            if (response.code == responseCode.USER_EXISTS) {
                res.status(400).send(responseStatus.USER_EXISTS);
            } else {
                res.status(201).send(response);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.post("/login", async (req, res) => {
        const { email, password } = req.body;

        try {
            const response = await usersService.login(email, password)

            if (response.code == responseCode.INVALID_PASSWORD) {
                res.status(400).send(responseStatus.INVALID_PASSWORD);
            } else if (response.code == responseCode.USER_NOT_FOUND) {
                res.status(404).send(responseStatus.USER_NOT_FOUND);
            } else {
                const retVal = ResponseObject(responseCode.OK, { user: response.data.user }, responseStatus.LOGIN_SUCCESS)
                res.cookie('userToken', response.data.accessToken, { httpOnly: true });
                res.status(200).send(retVal);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.delete("/logout", async (req, res) => {
        try {
            res.clearCookie('userToken')
            const retVal = ResponseObject(responseCode.OK, null, responseStatus.LOGOUT_SUCCESS)
            res.status(200).send(retVal)
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });


    router.put("/users/update", authenticationToken, async (req, res) => {
        try {
            const { firstname, lastname, email } = req.body;
            const userId = req.user.id;

            const updateUser = {
                firstname: firstname,
                lastname: lastname,
                email: email
            }

            const response = await usersService.update(userId, updateUser)

            if (response.code == responseCode.OK) {
                res.status(200).send(response);
            } else {
                res.status(400).send(responseStatus.ERROR);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.delete("/users/delete", authenticationToken, async (req, res) => {
        try {
            const userId = req.user.id;

            const response = await usersService.delete(userId)

            if (response.code == responseCode.OK) {
                res.status(200).send(response);
            } else {
                res.status(400).send(responseStatus.ERROR);
            }
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });

    router.post("/loaduser", authenticationToken, async (req, res) => {
        try {
            const id = req.user.id
            const response = await usersService.getUserById(id)
            res.status(200).send(response);
        } catch (err) {
            res.status(400).send(responseStatus.ERROR);
        }
    });
};
