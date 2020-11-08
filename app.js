const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys.js")


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

// app.get('/',(req,res) => {
//     Post.save(req.body)
// })



app.listen(PORT,() => {
    console.log("Server running on ", PORT)
})