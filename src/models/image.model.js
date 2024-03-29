const Sequelize = require('sequelize')
const db = require('../config/database.config')
const Product = require('./product.model')
module.exports = db.define('image', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    host: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: Product,
            key: 'id'
        }

    }
})