const db = require('../config/database.config')
const Sequelize = require('sequelize')
const Category = require('./category.model')
const Product = require('./product.model')
module.exports = db.define('categoryProduct', {
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
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
})