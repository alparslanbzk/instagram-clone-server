const express = require('express')
const router = express.Router()


router.get('/',(req,res) => {
    console.log("Home")
    req.send("Home")
})

router.post('/signin',(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
         return res.json({error:"please fill all fields"})
    }

     res.json({message:"succesfully signin"})
})

module.exports = router