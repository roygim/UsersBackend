const usersRepository = require('../repository/users.repository')

module.exports.register = async (newUser) => {
    try {
        const user = await usersRepository.getUserByEmail(newUser.email)
        if(user) {
            return -1
        }

        return await usersRepository.addUser(newUser)
    } catch (err) {
        throw err
    }
}

module.exports.login = async (email, password) => {
    try {
        const user = await usersRepository.getUserByEmail(email)
        if(user) {
            console.log(user.lastname)
            return user
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}