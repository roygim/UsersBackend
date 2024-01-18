const bcrypt = require('bcrypt');
const usersRepository = require('../repository/users.repository');
const { ResponseObject, responseCode, responseStatus } = require('../util/response-object');

module.exports.register = async (newUser) => {
    try {
        const user = await usersRepository.getUserByEmail(newUser.email)
        if (user) {
            return ResponseObject(responseCode.USER_EXISTS, null, responseStatus.USER_EXISTS)
        }

        const newId = await usersRepository.addUser(newUser)

        return ResponseObject(responseCode.OK, newId, responseStatus.USER_CREATE)
    } catch (err) {
        throw err
    }
}

module.exports.login = async (email, password) => {
    try {
        const user = await usersRepository.getUserByEmail(email)
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return ResponseObject(responseCode.INVALID_PASSWORD, null, responseStatus.INVALID_PASSWORD)
            }

            return ResponseObject(responseCode.OK, user, responseStatus.USER_FOUND)
        } else {
            return ResponseObject(responseCode.USER_NOT_FOUND, null, responseStatus.USER_NOT_FOUND)
        }
    } catch (err) {
        throw err
    }
}