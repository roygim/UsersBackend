const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRepository = require('../repository/users.repository');
const { ResponseObject, responseCode, responseStatus } = require('../util/response-object');
const { ACCESS_TOKEN_SECRET } = require('../config');

module.exports.getAll = async () => {
    try {
        const users = await usersRepository.getAll()

        return ResponseObject(responseCode.OK, users, responseStatus.OK)
    } catch (err) {
        throw err
    }
}

module.exports.getUserById = async (id) => {
    try {
        const user = await usersRepository.getUserById(id)
        if(user) {
            return ResponseObject(responseCode.OK, user, responseStatus.USER_FOUND)
        } else {
            return ResponseObject(responseCode.ERROR, user, responseStatus.USER_NOT_FOUND)
        }
    } catch (err) {
        throw err
    }
}

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

            delete user.password;
            
            const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)
            
            return ResponseObject(responseCode.OK, { user, accessToken }, responseStatus.LOGIN_SUCCESS)
        } else {
            return ResponseObject(responseCode.USER_NOT_FOUND, null, responseStatus.USER_NOT_FOUND)
        }
    } catch (err) {
        throw err
    }
}

module.exports.update = async (userId, user) => {
    try {
        const isUpdate = await usersRepository.updateUser(userId, user)
        if(isUpdate) {
            user.id = userId;
            return ResponseObject(responseCode.OK, user, responseStatus.UPDATE_SUCCESS)
        } else {
            return ResponseObject(responseCode.ERROR, null, responseStatus.ERROR)
        }
    } catch (err) {
        throw err
    }
}

module.exports.delete = async (userId) => {
    try {
        const isDelete = await usersRepository.deleteUser(userId)
        if(isDelete) {
            return ResponseObject(responseCode.OK, null, responseStatus.DELETE_SUCCESS)
        } else {
            return ResponseObject(responseCode.ERROR, null, responseStatus.ERROR)
        }
    } catch (err) {
        throw err
    }
}