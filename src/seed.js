const mongoose = require('mongoose')
const SellBuy = require('./models/SellBuy')
const User = require('./models/User')
const ProductCategory = require('./models/ProductCategory')

let SellBuyProducts = [
    {
        productName:"Table",
        costPrice:3000,
    },
    {
        productName:"Mobile",
        costPrice:4500,
        soldPrice:4500,
    },
    {
        productName:"Table",
        costPrice:1200,
        soldPrice:1300,
    },
    {
        productName:"Mobile",
        costPrice:10000,
        soldPrice:13000,
    }
]

let Users = [
    {
        userName:"Harshita",
        password : "Harshita",
        phoneNumber : 1234567890
    }
]

let Category = [
    {
        categoryName:"Furnitutre"
    },
    {
        categoryName:"Electronics"
    }
]
//insert dummy records into DB
async function seedDB(){
    await SellBuy.insertMany(SellBuyProducts)
    console.log("DB seeded successfully");
}

//insert dummy records into DB for users
async function seedDBUsers(){
    await User.insertMany(Users)
    console.log("DB seeded successfully for users");
}

//insert dummy records into DB for productCategory
async function seedDBCategory(){
    await ProductCategory.insertMany(Category)
    console.log("DB seeded successfully for Category");
}
module.exports = {seedDB,seedDBUsers,seedDBCategory}