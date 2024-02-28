const orderService = require('../services/order.service')
const productService = require('../services/product.service')
const {
    v4
} = require('uuid')
class OrderController {
    async getOrder(req, res) {
        // const userId = req.params.id || req.session.passport.user.id
        const {
            role,
            id
        } = req.session.passport.user
        const conditions = {
            id: req.params.id
        }
        if (role === 'user') {
            conditions.userId = id
        }
        const result = await orderService.findOrder(conditions)
        return res.send(result)
    }
    async getOrders(req, res) {
        const userId = req.params.id || req.session.passport.user.id
        const conditions = {
            userId: +userId
        }
        const result = await orderService.findOrders(conditions)
        return res.send(result)
    }
    async createOrder(req, res) {
        const userId = req.params.id || req.session.passport.user.id
        const data = {
            ...req.body,
            userId,
            number: v4()
        }
        const product = await productService.findProduct({
            id: req.body.productId
        })
        if (product.count < req.body.count) {
            return res.status(400).send('not enough product');
        }
        console.log(data)
        const result = await orderService.createOrder(data)
        return res.send(result)
    }
    async editOrder(req, res) {
        const {
            role,
            id: userId
        } = req.session.passport.user
        // const userId = req.params.id || id
        const conditions = {
            id: req.params.id
        }
        if (role === 'user') {
            conditions.userId = userId
        }
        const result = await orderService.editOrder(req.body, conditions)
        return res.send(result)
    }
    async deleteOrder(req, res) {
        const {
            role,
            id: userId
        } = req.session.passport.user
        // const userId = req.params.id || req.session.passport.user.id
        const conditions = {
            id: req.params.id,
            // userId
        }
        if (role === 'user') {
            conditions.userId = userId
        }
        const result = await orderService.deleteOrder(conditions)
        return res.send({
            deleted: result
        })
    }
}

module.exports = new OrderController()