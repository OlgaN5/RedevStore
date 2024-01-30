const db = require('../config/database.config')
const Sequelize = require('sequelize')
module.exports = db.define('category', {
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
        allowNull: true,
        unique: false
    },

})