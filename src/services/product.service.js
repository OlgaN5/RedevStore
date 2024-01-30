const dbAccess = require('../database.lib/dbAccess')
const {
    Product
} = require('../models/assotiations')
class ProductService {
    async createProduct(data) {
        return await dbAccess.create(Product, data)
    }
    async editProduct(dataToUpdate, conditions) {
        return await dbAccess.update(Product, dataToUpdate, conditions)
    }
    async findProduct(conditions) {
        return await dbAccess.readOne(Product, conditions)
    }
    async deleteProduct(conditions) {
        return await dbAccess.delete(Product, conditions)
    }
}

module.exports = new ProductService()