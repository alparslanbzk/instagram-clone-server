const express = require("express")
const app = express()


const PORT = 3000;

app.get('/',(req,res) => {
    console.log("Home Page")
    res.send("Home Page")
})

app.get('/about',(req,res) => {
    res.json({"merhaba":"deneme"})
})

app.listen(PORT,() => {
    console.log("Server running on ", PORT)
})