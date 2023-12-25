const mongoose = require('mongoose')
const sellBuySchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        minLength:4
    },
    costPrice:{
        type:Number,
        require:true,
        min:1
    },
    soldPrice:{
        type:Number,
        min:1
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ProductCategory',
        required:true
    }
})

let SellBuy = mongoose.model('SellBuy',sellBuySchema)

module.exports = SellBuy