const User = require('../models/user.model')
const dbAccess = require('../database.lib/dbAccess')
class UserService {
    async createUser(data) {
        return await dbAccess.create(User, data)
    }
    async findUser(conditions) {
        return await dbAccess.readOne(User, conditions)
    }
    async editUser(userId, dataToUpdate) {
        const conditions = {
            id: userId
        }
        return await dbAccess.update(User, dataToUpdate, conditions)
    }
}

module.exports = new UserService()