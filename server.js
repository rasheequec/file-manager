const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require('./config/db');
const { usersRouter } = require('./app/controller/usersController')
const { filesRouter } = require('./app/controller/filesController')
const path = require('path')
const port = process.env.PORT || 8080; 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'))
app.use(express.json());
connectDB()
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 
app.use(cors())
app.use('/', usersRouter)
app.use('/files', filesRouter)


app.listen(port, () => {
    console.log('listening on port', port);
})