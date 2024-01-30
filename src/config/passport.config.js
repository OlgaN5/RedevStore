const passport = require('passport')
const GoogleStrategy = require('passport-google-oidc')
const LocalStrategy = require('passport-local')
const expressSession = require('express-session')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const userService = require('../services/user.service')
module.exports = async function (app) {
    passport.use(new LocalStrategy({
        usernameField: 'login', 
        passwordField: 'password' 
    }, async function verify(login, password, cb) {
        try {
            console.log(login, password)
            const user = await userService.findUser({
                login: login
            })
            if (!user) {
                return cb(null, false, {
                    message: 'Incorrect usernames'
                })
            }
            const compare = await bcrypt.compare(password, user.password)
            if (!compare) {
                return cb(null, false, {
                    message: 'Incorrect password.'
                })
            }
            cb(null, {
                id: user.id,
                login: login,
                role: user.role
            })
        } catch (err) {
            cb(err)
        }

    }))
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/oauth2/redirect/google',
        scope: ['profile', 'email']
    }, async function verify(issuer, profile, cb) {
        try {
            const user = await userService.findUser({
                googleId: profile.id
            })
            if (user) {
                return cb(null, {
                    id: user.id,
                    email: profile.emails[0].value,
                    role: user.role
                })
            }
            const createdUser = await userService.createUser({
                googleId: profile.id,
                email: profile.emails[0].value
            })
            cb(null, {
                id: createdUser.id,
                email: createdUser.email,
                role: createdUser.role
            })
        } catch (err) {
            cb(err)
        }

    }))

    app.use(expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        // cookie: {
        //     secure: true
        // }
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function (user, done) {
        done(null, user);
    })

    passport.deserializeUser(function (user, done) {
        done(null, user)
    })
}