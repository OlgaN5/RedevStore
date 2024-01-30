const db = require('../config/database.config')
const Sequelize = require('sequelize')
const User = require('./user.model')
module.exports = db.define('profile', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'id'
        }
    },

});