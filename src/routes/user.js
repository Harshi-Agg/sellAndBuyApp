const express = require('express')
const userRouter = express.Router();
userRouter.use(express.urlencoded({extended:true}))
const User = require('../models/User')

userRouter.get('/',(req,res)=>{
    res.render('home')
})

//user login
userRouter.post('/loginUser',async (req,res)=>{
    let loginInputs = req.body
    let userLoggedIn = await User.find({userName:loginInputs.userName,password:loginInputs.password})
    if(userLoggedIn.length != 0){
        res.render('dashboard',{userLoggedIn:userLoggedIn[0]})
    }else{
        res.redirect('/')
    }
})

//user creation
userRouter.post('/addUser', async (req,res)=>{
    let newUser = req.body
    console.log(newUser);
    await User.create(req.body)
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        res.send(err)
    })
})



module.exports = userRouter