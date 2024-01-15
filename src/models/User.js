const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type : Number,
        minLength : 10,
        maxLength : 10
    }
})
userSchema.plugin(passportLocalMongoose); //giving local mongoose an authority to edit schema, 
//add username and pswd after hashing and adding salt to it.

let User = mongoose.model('User',userSchema)

module.exports = User