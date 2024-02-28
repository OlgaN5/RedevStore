const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const YOUR_DOMAIN = 'http://localhost:3000'
const endpointSecret = "whsec_nOciuikoW50qNchZSDIrtEoJGhTzTInR"
const orderService = require('../services/order.service')
const statusService = require('../services/status.service')
class PaymentController {
    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature']
        let event
        console.log(req.body)
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`)
            return
        }
        let paymentIntent
        console.log('event')
        console.log(event)
        console.log('event.type')

        console.log(event.data.object.id)

        switch (event.type) {
            case 'checkout.session.completed':
                const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                    event.data.object.id, {
                        expand: ['line_items'],
                    }
                );
                const lineItems = sessionWithLineItems.line_items
                const status = await statusService.findStatus({
                    name: 'paid'
                })
                console.log('lineItems')
                console.log(lineItems)
                console.log(status.id)
                console.log(lineItems.data[0].description)
                const resultUpdate = await orderService.editOrder({
                    statusId: status.id
                }, {
                    number: lineItems.data[0].description,
                })

                break
        }

        res.send()
    }
    async createSession(req, res) {
        const {

            currency,
            amount,
            orderNumber
        } = req.body
        const userId = req.session.passport.user.id
        console.log('2')
        console.log(userId)
        const order = await orderService.findOrder({
            number: orderNumber,
            userId
        })
        const statusPaid = await statusService.findStatus({
            name: 'paid'
        })
        if (!order) {
            return res.send('order not found')
        }
        if (order && order.statusId === statusPaid.id) {
            return res.send('paid already')
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency,
                    unit_amount: amount,
                    product_data: {
                        name: orderNumber,
                        metadata: {
                            name: orderNumber,
                        }
                    },
                },
                quantity: 1,
            }, ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/api/payment/success`,
            cancel_url: `${YOUR_DOMAIN}/api/payment/cancel`,
        })
        res.redirect(303, session.url)
    }
}
module.exports = new PaymentController()