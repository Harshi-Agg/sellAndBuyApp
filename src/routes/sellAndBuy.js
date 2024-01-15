const express = require('express')
const SellBuy = require('../models/SellBuy')
const router = express.Router()
router.use(express.urlencoded({extended:true}))
var methodOverride = require('method-override')
const ProductCategory = require('../models/ProductCategory')
const { validateSellBuy,validateEditSellBuy,validateUserLoggedIn} = require('../middleware')

// override with the X-HTTP-Method-Override header in the request
router.use(methodOverride('_method'))

//filters
router.get('/sellProduct',validateUserLoggedIn, async (req,res)=>{
    let productData;
    let queryParams = Object.keys(req.query)
    if(queryParams.length == 1){
        switch(queryParams[0]){
            case 'product': productData = await SellBuy.find({productName:req.query.product})
                break;
            case 'sortBy' : {
                if(req.query.sortBy == 'lowerCostPrice')
                    productData = await SellBuy.find().sort({costPrice:1})
                else if(req.query.sortBy == 'higherCostPrice')
                    productData = await SellBuy.find().sort({costPrice:-1})
                else if(req.query.sortBy == 'lowerSoldPrice')
                    productData = await SellBuy.find().sort({soldPrice:1})
                else if(req.query.sortBy == 'higherSoldPrice')
                    productData = await SellBuy.find().sort({soldPrice:-1})
            }
            break;
        }
        
    }else{
        productData = await SellBuy.find({})
    }
    
    res.status(200).render('index',{productData})
})

//go to add product page
router.get('/sell',validateUserLoggedIn, async (req,res)=>{
    try{
        let allCategories = await ProductCategory.find({})
        res.render('sell',{allCategories})
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/sellProduct')
    }
})

//go to edit page
router.get('/sellProduct/:id',validateUserLoggedIn,async (req,res)=>{
    try{
        let {id} = req.params
        let allCategories = await ProductCategory.find({})
        let productFound = await SellBuy.findById(id)
        res.render('edit',{productFound,allCategories})
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/sellProduct')
    }
})

//add product
router.post('/sellProduct',validateUserLoggedIn,validateSellBuy, async (req,res)=>{
    try{
        await SellBuy.create(req.body)
        req.flash('success','Product Added Successfully!')
        res.redirect('/sellProduct')
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/sell')
    }
})

//update edit detatils
router.patch('/sellProduct/:id',validateUserLoggedIn, validateEditSellBuy, async (req,res)=>{
    try{
        let {id} = req.params
        await SellBuy.findByIdAndUpdate(id,req.body)
        req.flash('success','Product Updated Successfully!')
        res.status(201).redirect('/sellProduct')
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/sell')
    }
})

//delete product
router.delete('/sellProduct/:id',validateUserLoggedIn, async (req,res)=>{
    try{
        let {id} = req.params
        await SellBuy.findByIdAndDelete(id)
        req.flash('success','Product Deleted Successfully!')
        res.redirect('/sellProduct')
    }catch(e){
        req.flash('error',`${e}`)
        res.redirect('/sell')
    }
})

//search filter
router.post('/searchByName',validateUserLoggedIn, (req,res)=>{
    let inputData = req.body.searchProduct
    res.redirect(`/sellProduct?product=${inputData}`)
})
module.exports = router