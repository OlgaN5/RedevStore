const dbAccess = require('../database.lib/dbAccess')
const userService = require('./user.service')
const {
    Profile
} = require('../models/assotiations')

class ProfileService {
    async findProfile(userId) {
        const conditions = {
            userId
        }
        return await dbAccess.readOne(Profile, conditions)
    }
    async createProfile(userId, data) {
        const conditions = {
            id: userId
        }
        const user = await userService.findUser(conditions)
        const {
            firstName,
            lastName
        } = user.dataValues
        const profile = {
            userId,
            firstName: data.firstName || firstName,
            lastName: data.lastName || lastName,
            address: data.address || null,
            phoneNumber: data.phoneNumber || null
        }
        return await dbAccess.create(Profile, profile)
    }
    async editProfile(dataToUpdate, conditions) {
        return await dbAccess.update(Profile, dataToUpdate, conditions)
    }
}

module.exports = new ProfileService()