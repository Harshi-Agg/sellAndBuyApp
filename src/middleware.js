let {SellBuy,User} = require('./serverValidationSchema')
const ProductCategory = require('../src/models/ProductCategory')
const SellBuyModel = require('../src/models/SellBuy')

let validateSellBuy = async(req,res,next)=>{
    let {productName, costPrice, soldPrice} = req.body
    let {error} = SellBuy.validate({productName, costPrice, soldPrice});
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(' , ')
        // let allCategories = await ProductCategory.find({})
        req.flash('error',`${errMsg}`)
        return res.redirect('/sell') //add return to prevent flow to go further on next()
    }
    next();
}

let validateEditSellBuy = async(req,res,next)=>{
    let itemDetails = await SellBuyModel.findById(req.params.id)
    let { soldPrice} = req.body
    let {error} = SellBuy.validate({productName:itemDetails.productName, costPrice:itemDetails.costPrice,soldPrice});
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(' , ')
        // let allCategories = await ProductCategory.find({})
        req.flash('error',`${errMsg}`)
        return res.redirect(`/sellProduct/${req.params.id}`) 
    }
    next();
}

let validateUser = async(req,res,next)=>{
    let {phoneNumber} = req.body
    let {error} = User.validate({phoneNumber})
    if(error){
        let errMsg = error.details.map((err)=>err.message).join(' , ');
        req.flash('error',`${errMsg}`)
        return res.redirect('/')
    }
    next();
}

const validateUserLoggedIn =  async(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please Login first!')
        return res.redirect('/')
    }
    next()
}

module.exports = {validateSellBuy,validateEditSellBuy,validateUser,validateUserLoggedIn}