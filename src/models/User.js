const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userName :{
        type : String,
        required : true,
        minLength : 4
    },
    password :{
        type : String,
        required : true,
        minLength :4
    },
    phoneNumber: {
        type : Number,
        minLength : 10,
        maxLength : 10
    }
})

let User = mongoose.model('User',userSchema)

module.exports = User