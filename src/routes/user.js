const express = require('express')
const userRouter = express.Router();
userRouter.use(express.urlencoded({extended:true}))
const User = require('../models/User')
const passport = require('passport')
const {validateUser,validateUserLoggedIn} = require('../middleware')

userRouter.get('/', (req,res)=>{
    res.render('home')
})

//user login
userRouter.post('/loginUser', 
    passport.authenticate('local', { failureRedirect: '/', failureMessage: true }), 
    validateUser,
    async function(req, res) {
        try{
            // let loginInputs = req.body
            // let userLoggedIn = await User.find({userName:loginInputs.username,password:loginInputs.password})
            res.redirect('/dashboard')
        }catch(e){
            req.flash('error',`${e}`)
            res.redirect('/')
        }
})

userRouter.get('/dashboard', validateUserLoggedIn, (req,res)=>{
    try{
        req.flash('success' , `Welcome ${req.user.username}`);
        res.render('dashboard',{userLoggedIn:req.user,success:req.flash('success')});
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/')
    }
})

//user creation
userRouter.post('/addUser', validateUser, async (req,res)=>{
    try{
        let {username, password,phoneNumber} = req.body
        let newUser = new User({username, phoneNumber})
        let registerUser = await User.register(newUser,password)
        req.flash('success','Registered Successfully! Login to start.')
        res.redirect('/')
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/')
    }
})

userRouter.get('/logout', function(req, res){
    try{
        req.logout(function(err) {
            if (err) { req.flash('error','try again') }
            res.redirect('/');
        });
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/')
    }
});

module.exports = userRouter