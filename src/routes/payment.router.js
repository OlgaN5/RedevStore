const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const YOUR_DOMAIN = 'http://localhost:3000/'
router.get('/add-customer', (req, res, next) => {
    res.render('addCustomer')
})
router.get('/add-card', (req, res, next) => {
    res.render('addCard')
})
router.get('/add-charge', (req, res, next) => {
    res.render('charge')
})
// router.get('/success', (req, res, next) => {
//     res.render('ok')
// })
// router.get('/success', (req, res, next) => {
//     res.render('ok')
// })

router.post('/create-customer', async (req, res) => {
    const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email
    })
    res.send(customer)
})

router.post('/create-card', async (req, res) => {
    const {
        customerId,
        cardNumber,
        cardExpYear,
        cardExpMonth,
        cardCVC,
        cardName
    } = req.body
    const cardToken = stripe.tokens.create({
        card: {
            name: 'cardName',
            number: '4242424242424242',
            exp_year: 2030,
            exp_month: 12,
            cvc: '999'
        }
    })
    const card = await stripe.customers.createSource(customerId, {
        source: `${cardToken.id}`
    })

    res.send({
        cardId: card.id
    })
})

router.post('/create-charge', async (req, res) => {
    const charge = await stripe.charges.create({
        receipt_email: '@@@',
        amount: req.body.amount,
        currency: req.bodu.currency,
        card: req.body.cardId,
        customer: req.body.customerId
    })
    res.send(charge)
})

module.exports = router