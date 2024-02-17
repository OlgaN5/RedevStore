const {
    body,
    param,
    query
} = require('express-validator')

const idValidation = param('id').notEmpty().escape()

//status validation

const statusCreateValidation = [
    body('name').notEmpty().trim().escape().isString()
]
const statusEditValidation = [
    body('name').optional().trim().escape().isString(),
    idValidation
]

//cart validation

const cartCreateValidation = [
    body('productId').notEmpty().trim().escape().isInt(),
    body('count').notEmpty().trim().escape().isInt()
]
const cartEditValidation = [
    body('productId').optional().trim().escape().isInt(),
    body('count').optional().trim().escape().isInt(),
    idValidation
]

//category validation

const categoryCreateValidation = [
    body('name').notEmpty().trim().escape().isString(),
    body('describe').notEmpty().trim().escape().isString(),
]

const categoryEditValidation = [
    body('name').optional().trim().escape().isString(),
    body('describe').optional().trim().escape().isString(),
    idValidation
]

//orders validation

const orderCreateUserValidation = [
    body('productId').notEmpty().trim().escape().isInt(),
    body('count').notEmpty().trim().escape().isInt(),
    body('deliverStatus').notEmpty().trim().escape().isString(),
    body('statusId').notEmpty().trim().escape().isInt(),
]
const orderCreateModeratorValidation = [
    body('productId').notEmpty().trim().escape().isInt(),
    body('count').notEmpty().trim().escape().isInt(),
    body('deliverStatus').notEmpty().trim().escape().isString(),
    body('statusId').notEmpty().trim().escape().isInt(),
    idValidation
]
const orderEditValidation = [
    body('productId').optional().trim().escape().isInt(),
    body('count').optional().trim().escape().isInt(),
    body('deliverStatus').optional().trim().escape().isString(),
    body('statusId').optional().trim().escape().isInt(),
    idValidation
]


//product validation

const productGetFilterValidation = [
    query('category').notEmpty().trim().escape().isString(),
    query('price').notEmpty().trim().escape().isString(),
    query('availability').notEmpty().trim().escape().isString(),
    query('sort').notEmpty().trim().escape().isString(),
]


const productCreateValidation = [
    body('name').notEmpty().trim().escape().isString(),
    body('describe').notEmpty().trim().escape().isString(),
    body('price').notEmpty().trim().escape().isInt(),
    body('count').notEmpty().trim().escape().isInt(),
    body('image').optional().isString().matches(/^[A-Za-z0-9+/]+[=]{0,2}$/),
]
const productEditValidation = [
    body('name').optional().trim().escape().isString(),
    body('describe').optional().trim().escape().isString(),
    body('price').optional().trim().escape().isInt(),
    body('count').optional().trim().escape().isInt(),
    body('image').optional().isString().matches(/^[A-Za-z0-9+/]+[=]{0,2}$/),
    idValidation
]

//profile validation

const profileCreateUserValidation = [
    body('firstName').notEmpty().trim().escape().isString(),
    body('lastName').optional().trim().escape().isString(),
    body('address').optional().trim().escape().isString(),
    body('phoneNumber').notEmpty().trim().escape().isString(),
]
const profileEditUserValidation = [
    body('firstName').optional().trim().escape().isString(),
    body('lastName').optional().trim().escape().isString(),
    body('address').optional().trim().escape().isString(),
    body('phoneNumber').optional().trim().escape().isString(),
]
const profileCreateModeratorValidation = [
    body('firstName').notEmpty().trim().escape().isString(),
    body('lastName').optional().trim().escape().isString(),
    body('address').optional().trim().escape().isString(),
    body('phoneNumber').notEmpty().trim().escape().isString(),
    idValidation
]
const profileEditModeratorValidation = [
    body('firstName').optional().trim().escape().isString(),
    body('lastName').optional().trim().escape().isString(),
    body('address').optional().trim().escape().isString(),
    body('phoneNumber').optional().trim().escape().isString(),
    idValidation
]



//user validation
const userEditUserValidation = [
    body('login').optional().trim().escape().isString(),
    body('password').optional().trim().escape().isString(),
    body('email').optional().trim().escape().isString(),
]

const userEditModeratorValidation = [
    body('login').optional().trim().escape().isString(),
    body('password').optional().trim().escape().isString(),
    body('email').optional().trim().escape().isString(),
    idValidation
]


//auth validation

const registerValidation = [
    body('login').notEmpty().trim().escape().isString().isLength({
        min: 3,
        max: 10
    }).withMessage('Login has to be between 3 and 10'),
    body('email').notEmpty().trim().escape().isString().isEmail().withMessage(`It isn't email`),
    body('password').notEmpty().trim().escape().isString().isLength({
        min: 3,
        max: 15
    }).withMessage('Password has to be between 3 and 15'),
    body('confirmPassword').notEmpty().trim().escape().isString().isLength({
        min: 3,
        max: 15
    }).withMessage('Password has to be between 3 and 15'),
]

const loginValidation = [
    body('login').notEmpty().trim().escape().isString(),
    body('password').notEmpty().trim().isString()
]





module.exports = {
    idValidation,
    statusCreateValidation,
    statusEditValidation,
    cartCreateValidation,
    cartEditValidation,
    categoryCreateValidation,
    categoryEditValidation,
    orderCreateUserValidation,
    orderCreateModeratorValidation,
    orderEditValidation,
    productGetFilterValidation,
    productCreateValidation,
    productEditValidation,
    profileCreateUserValidation,
    profileEditUserValidation,
    profileCreateModeratorValidation,
    profileEditModeratorValidation,
    userEditUserValidation,
    userEditModeratorValidation,
    registerValidation,
    loginValidation
}