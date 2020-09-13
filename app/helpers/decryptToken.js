const jwt = require('jsonwebtoken')

const decryptToken = token => {
    return jwt.verify(token, 'jwt@123', (err, data) => {
        if (err) {
            console.log('decrypt failed', err)
        }
        else {
            return data
        }
    })
}
module.exports = {
    decryptToken
}