module.exports.ResponseObject = (code, data, status) => {
    return { code: code, data: data, status: status }
}

module.exports.responseCode = Object.freeze({
    OK: 0,
    ERROR: -1,
    USER_EXISTS: -2,
    INVALID_PASSWORD: -3,
    USER_NOT_FOUND: -4,
})

module.exports.responseStatus = Object.freeze({
    OK: 'ok',
    ERROR: 'Error occurred',
    USER_EXISTS: 'User already exists',
    USER_CREATE: 'User created successfully!',
    INVALID_PASSWORD: 'Invalid password',
    USER_FOUND: 'User found',
    USER_NOT_FOUND: 'User not found',
    LOGIN_SUCCESS: 'login success',
    LOGOUT_SUCCESS: 'logout success',
    LOAD_USER_SUCCESS: 'load user success',
    UPDATE_SUCCESS: 'update success',
    DELETE_SUCCESS: 'delete success',
})