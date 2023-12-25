const express = require('express')
const app = express()
const port = 8080;
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./src/seed');
const sellProductRoute = require('./src/routes/sellAndBuy');
const userRouter = require('./src/routes/user');


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/src/views'))
app.use(express.static(path.join(__dirname,'/src/public')))


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

app.use(sellProductRoute)
app.use(userRouter)


app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
})