const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authentication')
const { User } = require('../model/User')

router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            res.send({
                message: "You have successfully signup"
            })
        })
        .catch(err => {
            res.status('400').send({
                message: err
            })
        })
})

router.post('/login', (req, res) => {
    const body = req.body
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            res.send({ message: "You have login successfully", token })
        })
        .catch(err => {
            res.status('400').send({ message: err })
        })

})

router.delete('/logout', authenticateUser, (req, res) => {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(err => {
            res.send(err)
        })
})




module.exports = {
    usersRouter: router
}