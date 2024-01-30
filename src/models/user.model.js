const db = require('../config/database.config')
const Sequelize = require('sequelize')
module.exports = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        defaultValue: 'user'
    }
})