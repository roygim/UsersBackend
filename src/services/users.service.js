const bcrypt = require('bcrypt');
const usersRepository = require('../repository/users.repository');
const { ResponseObject } = require('../util/response-object');

module.exports.register = async (newUser) => {
    try {
        const user = await usersRepository.getUserByEmail(newUser.email)
        if (user) {
            return ResponseObject(-1, null, 'User already exists')
        }

        const newId = await usersRepository.addUser(newUser)

        return ResponseObject(0, newId, 'User created successfully!')
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
                console.log('first')
                return ResponseObject(-1, null, 'Invalid password')
            }

            return ResponseObject(0, user, 'User found')
        } else {
            return ResponseObject(-2, null, 'User not found')
        }
    } catch (err) {
        throw err
    }
}