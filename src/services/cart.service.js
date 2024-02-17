const {
    Cart
} = require('../models/assotiations')
const dbAccess = require('../database.lib/dbAccess')
class CartService {
    async createCart(data) {
        const cart = await dbAccess.create(Cart, data)
        return cart
    }
    async editCart(dataToUpdate, conditions) {
        const result = await dbAccess.update(Cart, dataToUpdate, conditions)
        return result
    }
    async deleteCart(conditions) {
        const result = await dbAccess.delete(Cart, conditions)
        return result
    }
}
module.exports = new CartService()