const Sequelize = require('sequelize')
const db = require('../config/database.config')

module.exports = db.define('image', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    }
})