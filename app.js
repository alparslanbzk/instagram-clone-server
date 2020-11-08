const express = require("express")
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys.js")

const PORT = 3000;

app.use(express.json())

app.use(require("./routes/auth"))



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






app.listen(PORT,() => {
    console.log("Server running on ", PORT)
})