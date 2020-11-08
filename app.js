const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys.js")

var bodyParser = require('body-parser')


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())

app.use(express.json())

const User = require('./models/user')

const PORT = 3000;

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

mongoose.connection.on('connected',() => {
    console.log("mongoose çalışıyor")
})

mongoose.connection.on('error',(err) => {
    console.log("mongoose çalışmıyor",err)
})

app.post('/',(req,res) => {
    
    console.log(req.body.name)
})



app.listen(PORT,() => {
    console.log("Server running on ", PORT)
})