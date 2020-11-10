const express = require("express")
const { route } = require("./auth")
const router = express.Router()
const mongoose = require("mongoose")
const Post = mongoose.model("Post")
const requireLogin = require("../middleware/requireLogin")

router.post('/createPost',requireLogin,(req,res) => {
    const {title,body} = req.body

    if(!title || !body) {
        return res.status(404).json("Lütfen gerekli alanları doldurunuz")
    }

    console.log(req.user)

    req.user.password = undefined

    console.log(req.user)

    const post = new Post({
        title,
        body,
        postedBy:req.user
    })

    post.save()
    .then(result => {
        res.json({data:result})
    }).catch(err => {
        console.log(err)
    })

    

})

router.get('/allpost',(req,res) => {
    Post.find()
    .populate("postedBy","_id name email")
    .populate("comments.postedBy","_id name text")
    .then(posts => {
        res.json({posts:posts})
    }).catch(err => {
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=> {
    Post.find({postedBy:req.user.id})
    .populate("postedBy","_id name email")
    .then(mypost => {
        res.json({mypost})
    }).catch(err => {
        console.log(err)
    })
})

router.put('/like',requireLogin,(req,res) => {
    console.log(req.user._id)
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    }, {new:true}
    ).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            console.log("succesfully",result)
            res.json(result)
        }
    
    })
})

router.put("/unlike",requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
             res.json(result)
        }
    })
})

router.put("/comment",requireLogin,(req,res) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments","_id name")

    .exec((err,result) =>{
        if(err) {
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post) => {
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                //res.json({message:"succesfully deleted"})
                res.json({result})
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})


module.exports = router