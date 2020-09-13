const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 

const URI = "mongodb+srv://admin:admin@uploadcluster.6k3yq.mongodb.net/<dbname>?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => {
        console.log('connected to db');
    }).catch((err) => {
        console.log(err);
    });
}


module.exports = {
    connectDB
}