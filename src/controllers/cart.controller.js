const cartService = require('../services/cart.service')
const {
    validationResult
} = require('express-validator')
class CartController {
    async createCart(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const cart = await cartService.createCart({
                    ...req.body,
                    userId: req.session.passport.user.id
                })
                res.send(cart)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async editCart(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const cart = await cartService.editCart(req.body, {
                    id: req.params.id
                })
                res.send(cart)
            } else {
                res.send({
                    error: result.array()
                })
            }
        } catch (e) {
            res.send(e.message)
        }
    }
    async deleteCart(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const result = await cartService.deleteCart({
                    id: req.params.id
                })
                res.send({
                    countDeleted: result
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

module.exports = new CartController()