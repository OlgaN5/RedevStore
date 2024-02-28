const express = require('express')
const paymentController = require('../controllers/payment.controller')
const router = express.Router()
const tryCatchHandler = require('../controllers/tryCatch.handler')
const isAuthenticated = require('../utils/authenticate')
router.get('/', async (req, res, next) => {
    res.render('payment')
})

router.post('/webhook', express.raw({
    type: 'application/json'
}), tryCatchHandler(paymentController.handleWebhook))

router.post('/create-checkout-session', isAuthenticated(['user']), tryCatchHandler(paymentController.createSession))

router.get('/success', async (req, res, next) => {
    res.send('success')
})
router.get('/cancel', (req, res, next) => {
    res.send('cancel')
})




module.exports = router