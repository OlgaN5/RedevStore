const User = require('./user.model')
const Image = require('./image.model')
const Product = require('./product.model')
const Status = require('./status.model')
const Order = require('./order.model')

const Cart = require('./cart.model')

const Category = require('./category.model')
const Profile = require('./profile.model')




User.hasOne(Profile, {
    foreignKey: 'userId'
})
Profile.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Cart, {
    foreignKey: 'userId'
})
Cart.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(Order, {
    foreignKey: 'userId'
})
Order.belongsTo(User, {
    foreignKey: 'userId'
})

Category.hasOne(Product, {
    foreignKey: 'categoryId'
})
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
})

Product.hasMany(Order, {
    foreignKey: 'productId'
})
Order.belongsTo(Product, {
    foreignKey: 'productId'
})

Image.hasMany(Product, {
    foreignKey: 'imageId'
})
Product.belongsTo(Image, {
    foreignKey: 'imageId'
})

Status.hasMany(Order, {
    foreignKey: 'statusId'
})
Order.belongsTo(Status, {
    foreignKey: 'statusId'
})

module.exports = {
    Product,
    Status,
    Order,
    User,
    Cart,
    Category,
    Profile,
    Image
}