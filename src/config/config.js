const {
    User
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
    await db.sync({
        force: true
    }).then(async () => {
        User.create({
            login: 'Admin',
            email: 'admin@gmail.com',
            password: await bcrypt.hash('password', 3),
            role: 'admin'
        })
    })
    app.use('/static', express.static(path.join(__dirname, '..', 'static')))
    app.use(express.urlencoded({ extended: true }))
    await passportConfig(app)
    app.use(express.json())
    app.set('view engine', 'ejs')
}