const db = require('../config/database.config')
const Sequelize = require('sequelize')
const User = require('./user.model')
const Product = require('./product.model')
module.exports = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    count: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: User,
            key: 'id'
        }
    },
})