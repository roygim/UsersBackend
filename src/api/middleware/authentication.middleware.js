const jwt = require('jsonwebtoken');

module.exports.authenticationToken = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return res.sendStatus(401)
    
    if (req.cookies && req.cookies.userToken) {
        const token = req.cookies.userToken;

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    } else {
        return res.sendStatus(401)
    }
}