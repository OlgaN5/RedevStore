const User = require('./user.model')
const Image = require('./image.model')
const Product = require('./product.model')
const Status = require('./status.model')
const Order = require('./order.model')
const CategoryProduct = require('./categoryProduct.model')
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

Category.belongsToMany(Product, {
    through: 'categoryProducts'
})
Product.belongsToMany(Category, {
    through: 'categoryProducts'
})

Product.hasMany(Order, {
    foreignKey: 'productId'
})
Order.belongsTo(Product, {
    foreignKey: 'productId'
})

Product.hasMany(Image, {
    foreignKey: 'productId'
})
Image.belongsTo(Product, {
    foreignKey: 'productId'
})

Status.hasMany(Order, {
    foreignKey: 'statusId'
})
Order.belongsTo(Status, {
    foreignKey: 'statusId'
})

module.exports = {
    CategoryProduct,
    Product,
    Status,
    Order,
    User,
    Cart,
    Category,
    Profile,
    Image
}