const {
    Order,
    User,
    Status,
    Product
} = require('../models/assotiations')
const dbAccess = require('../database.lib/dbAccess')

class OrderService {
    async findOrder(conditions) {
        const include = [{
            model: Product
        }, {
            model: User
        }, {
            model: Status
        }]
        return await dbAccess.readOne(Order, conditions, include)
    }
    async findOrders(conditions) {
        console.log(conditions)
        return await dbAccess.readAll(Order, conditions)
    }
    async createOrder(data) {
        return await dbAccess.create(Order, data)
    }
    async editOrder(dataToUpdate, conditions) {
        return await dbAccess.update(Order, dataToUpdate, conditions)
    }
    async deleteOrder(conditions) {
        return dbAccess.delete(Order, conditions)
    }
}

module.exports = new OrderService()