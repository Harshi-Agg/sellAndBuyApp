const Joi = require('joi')

const SellBuy = Joi.object({
    productName: Joi.string()
        .required()
        .trim()
        .min(4),
    costPrice: Joi.number()
        .min(1)
        .required(),
    soldPrice : Joi.number()
        .min(1)
})

const User = Joi.object({
    phoneNumber: Joi.number()
        
})

module.exports = {SellBuy,User}