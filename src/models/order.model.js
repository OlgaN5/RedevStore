const db = require('../config/database.config')
const Sequelize = require('sequelize')
const User = require('./user.model')
const Product = require('./product.model')
const Status = require('./status.model')
module.exports = db.define('order', {
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
    count:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    deliverStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: Status,
            key: 'id'
        }
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