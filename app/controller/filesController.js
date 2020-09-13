const express = require('express')
const router = express.Router()
const { File } = require('../model/File')
const multer = require('multer');
const { decryptToken } = require('../helpers/decryptToken')
const { authenticateUser } = require('../middleware/authentication')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});
const upload = multer({ storage: storage });



router.post('/upload', authenticateUser, upload.single('myFile'), (req, res) => {
    const body = {}
    const tokenData = decryptToken(req.header('x-auth'))
    console.log(req.file, tokenData._id)
    body.name = req.file.originalname
    body.path = req.file.path
    body.owner = tokenData.name
    body.userId = tokenData._id
    const file = new File(body)
    file.save()
        .then(file => {
            res.send({
                message: "Successfully uploaded"
            })
        })
        .catch(err => {
            res.status('400').send({
                message: err
            })
        })
})

router.post('/list', authenticateUser, (req, res) => {
    const tokenData = decryptToken(req.header('x-auth'))
    File.getFileList(tokenData)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status('400').send({ message: err })
        })
})

router.get('/:path', (req, res) => {
    res.sendfile(`uploads/${req.params.path}`)
})

module.exports = {
    filesRouter: router
}