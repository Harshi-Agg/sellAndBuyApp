const mongoose = require('mongoose')
const productCategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        minlength:1
    }
})

let ProductCategory = mongoose.model('ProductCategory',productCategorySchema)

module.exports = ProductCategory