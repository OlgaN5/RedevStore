const {
    User,
    Category
} = require('../models/assotiations')
const db = require('./database.config')
const passportConfig = require('./passport.config')
const swaggerConfig = require('./swaggerConfig')
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')

module.exports = async function (app) {
    await db.authenticate()
    swaggerConfig.initSwaggerDoc(app)
    // await db.sync({
    //     force: true
    // })
    app.use('/static', express.static(path.join(__dirname, '..', 'static')))
    app.use(express.urlencoded({
        extended: true
    }))
    await passportConfig(app)
    app.use(express.json())
    app.set('view engine', 'ejs')
}