const express = require("express")
const app = express()

const PORT = 3000;

const customMiddleware = (req,res,next) => {
    console.log("Sadece ali gönderebilir")
    next()
}

//app.use(customMiddleware)

app.get('/',(req,res) => {
    console.log("Home Page")
    res.send("Home Page")
})

app.get('/createPost',customMiddleware,(req,res) => {
    res.send("send a post")
})

app.listen(PORT,() => {
    console.log("Server running on ", PORT)
})