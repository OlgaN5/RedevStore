const orderService = require('../services/order.service')
const productService = require('../services/product.service')
class OrderController {
    async getOrder(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
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
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async getOrders(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const userId = req.params.id || req.session.passport.user.id
                const conditions = {
                    userId: +userId
                }
                const result = await orderService.findOrders(conditions)
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async createOrder(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const userId = req.params.id || req.session.passport.user.id
                const data = {
                    ...req.body,
                    userId
                }
                const product = await productService.findProduct({
                    id: req.body.productId
                })
                if (product.count < req.body.count) {
                    return res.status(400).send('not enough product');
                }
                console.log(data)
                const result = await orderService.createOrder(data)
                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async editOrder(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
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

                res.send(result)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async deleteOrder(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
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
                res.send({
                    deleted: result
                })
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = new OrderController()