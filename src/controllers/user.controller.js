const userService = require('../services/user.service')
const profileService = require('../services/profile.service')
class UserController {
    async editUser(req, res) {
        console.log(req.params.id,req.session.passport.user)
        const userId = req.params.id||req.session.passport.user.id
        const result = await userService.editUser(userId, req.body)
        return res.send(result)
    }
    async createProfile(req, res) {
        const userId = req.session.passport.user
        const data = req.body
        const profile = profileService.findProfile(req.session.passport.user)
        if (profile) return res.send({
            message: 'profile exists already'
        })

        const createdProfile = profileService.createProfile(userId, data)
        return res.send(createdProfile)
    }
    async editProfile(req, res) {
        console.log(req.params.id,req.session.passport.user)
        const userId = req.params.id||req.session.passport.user.id
        const result = profileService.editProfile(userId, req.body)
        return res.send(result)
    }
}

module.exports = new UserController()