const cartService = require('../services/cart.service')
const validationHandler = require('../utils/validationHandler')
class CartController {
    async createCart(req, res) {
        const cart = await cartService.createCart({
            ...req.body,
            userId: req.session.passport.user.id
        })
        res.send(cart)
    }
    async editCart(req, res) {
        const cart = await cartService.editCart(req.body, {
            id: req.params.id
        })
        res.send(cart)
    }
    async deleteCart(req, res) {
        const result = await cartService.deleteCart({
            id: req.params.id
        })
        res.send({
            countDeleted: result
        })
    }
}

module.exports = new CartController()