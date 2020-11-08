const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")


router.get('/',(req,res) => {
    console.log("Home")
    req.send("Home")
})

router.post('/signin',(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
         return res.status(422).json({error:"please fill all fields"})
    }

    bcrypt.hash(password,12)
    .then(hashedpassword => {
        User.findOne({email:email})
        .then(savedUser => {
            if(savedUser){
                return res.status(422).json({error:"user already existing with that email"})           
            }
    
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
    
            user.save().then(
                user => {
                    res.json({message:"succesfully"})
                }
            ).catch(err=> {
                return res.status(422).json({error:err})
            })
        }).catch(err => {
            return res.status(422).json({error:err})
        })
    
    })

    
     
})

module.exports = router