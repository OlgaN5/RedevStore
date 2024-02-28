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
    await app.use('/static', express.static(path.join(__dirname, '..', 'static')))
    await app.use(express.urlencoded({
        extended: true
    }))
    await passportConfig(app)

    // await app.use(express.raw())
    await app.use(express.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    }))
    await app.set('view engine', 'ejs')
}