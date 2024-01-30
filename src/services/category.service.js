const dbAccess = require('../database.lib/dbAccess')
const {
    Category
} = require('../models/assotiations')
class CategoryService {
    async createCategory(data) {
        return await dbAccess.create(Category, data)
    }
    async editCategory(dataToUpdate, id) {
        const conditions = {
            id
        }
        return await dbAccess.update(Category, dataToUpdate, conditions)
    }
    async deleteCategory(id) {
        const conditions = {
            id
        }
        return await dbAccess.delete(Category, conditions)
    }
}

module.exports = new CategoryService()