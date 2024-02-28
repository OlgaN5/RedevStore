const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const {
  registerValidation,
  loginValidation
} = require('../utils/validations')
const validationHandler = require('../utils/validationHandler')
const tryCatchHandler = require('../controllers/tryCatch.handler')

router.get('/', async function (req, res, next) {
  // console.log()
  const sessionID = req.sessionID
  res.send(sessionID)
})
router.get('/signup', (req, res, next) => {
  res.render('signup')
})
router.post('/signup', registerValidation, validationHandler, tryCatchHandler(authController.signup))
/**
 * @swagger 
 * /api/auth/login:
 *   get:
 *     tags: 
 *       - Auth
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login/password', loginValidation, validationHandler, passport.authenticate('local', {
  successReturnToOrRedirect: '/api/auth/',
  failureRedirect: '/api/auth/login',
  failureMessage: true
}))

router.get('/login/federated/google', passport.authenticate('google'))
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/api/auth/',
  failureRedirect: '/api/auth/login'
}))
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
})
module.exports = router