const db = require('../config/database.config')
const Sequelize = require('sequelize')
const Category = require('./category.model')
const Image = require('./image.model')
module.exports = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    describe: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    // categoryId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     unique: false,
    //     references: {
    //         model: Category,
    //         key: 'id'
    //     }
    // },
    // imageId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     unique: false,
    //     references: {
    //         model: Image,
    //         key: 'id'
    //     }
    // },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },

})

