const {
    Status
} = require('../models/assotiations')
const dbAccess = require('../database.lib/dbAccess')
class StatusService {
    async findStatus(conditions) {
        const status = await dbAccess.readOne(Status, conditions)
        return status
    }
    async createStatus(data) {
        const status = await dbAccess.create(Status, data)
        return status
    }
    async editStatus(dataToUpdate, conditions) {
        const result = await dbAccess.update(Status, dataToUpdate, conditions)
        return result
    }
    async deleteStatus(conditions) {
        const result = await dbAccess.delete(Status, conditions)
        return result
    }
}
module.exports = new StatusService()