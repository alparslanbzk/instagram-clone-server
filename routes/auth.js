const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middleware/requireLogin")

router.get('/protected',requireLogin,(req,res) => {
    res.send("Protected Page")
})

router.get('/',(req,res) => {
    console.log("Home")
    req.send("Home")
})

router.post('/signup',(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
         return res.status(404).json({error:"please fill all fields"})
    }

    bcrypt.hash(password,12)
    .then(hashedpassword => {
        User.findOne({email:email})
        .then(savedUser => {
            if(savedUser){
                return res.status(404).json({error:"user already existing with that email"})           
            }
    
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
    
            user.save().then(
                user => {
                    console.log("deneme")
                    res.json({message:"succesfully"})
                }
            ).catch(err=> {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    
    })

    
     
})

router.post('/signin',(req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({error:"tüm alanları doldurun"})
    }

    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(400).json({error:"email ya da şifre hatalı"})
        }
        
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token:token})
            }
            return res.status(400).json({error:"email ya da şifre hatalı"})
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router