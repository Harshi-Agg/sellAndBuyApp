const express = require('express')
const app = express()
const port = 8080;
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./src/seed');
const sellProductRoute = require('./src/routes/sellAndBuy');
const userRouter = require('./src/routes/user');
//flash messages
const flash = require('connect-flash');
//sessions
const session = require('express-session')
//authorization and passport
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./src/models/User');

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }
app.use(session(configSession))
app.use(flash()); //since flash is dependent on session, so it will be used after it
app.use(passport.initialize())
app.use(passport.session())
// keep users persistently logged in and logged out
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

//for handling flash msg better
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/src/views'))
app.use(express.static(path.join(__dirname,'/src/public')))
app.use(sellProductRoute)
app.use(userRouter)


// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/SellAndBuy')
.then(()=>{
    console.log("DB Connected!");
})
.catch(()=>{
    console.log('Error connecting to DB');
})

//seed DB data
// seedDB.seedDB()
// seedDB.seedDBUsers()
// seedDB.seedDBCategory()

app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
})