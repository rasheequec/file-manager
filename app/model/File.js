const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    owner: {
        type: String
    }
})

fileSchema.statics.getFileList = function (tokenData) {
    const File = this
    if (tokenData.userRole == 'user') {
        return File.find({ userId: tokenData._id })
            .then(function (data) {
                const result = {
                    data,
                    isAdmin: false
                }
                return Promise.resolve(result)
            })
            .catch(function (err) {
                return Promise.reject(err)
            })
    }
    else {
        return File.find({})
            .then(function (data) {
                const result = {
                    data,
                    isAdmin: true
                }
                return Promise.resolve(result)
            })
            .catch(function (err) {
                return Promise.reject(err)
            })
    }
}

const File = mongoose.model('File', fileSchema)


module.exports = {
    File
}