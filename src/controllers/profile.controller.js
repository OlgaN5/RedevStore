const profileService = require('../services/profile.service')
class ProfileController {
    async createProfile(req, res) {
        const userId = req.params.id || req.session.passport.user.id
        const data = req.body

        const profile = await profileService.findProfile(userId)
        console.log(profile)
        if (profile) return res.send({
            message: 'profile exists already'
        })

        const createdProfile = await profileService.createProfile(userId, data)
        return res.send(createdProfile)
    }
    async editProfile(req, res) {
        console.log(req.params.id, req.session.passport.user)
        const userId = req.params.id || req.session.passport.user.id
        const result = await profileService.editProfile(req.body, {
            userId
        })
        return res.send(result)
    }
}

module.exports = new ProfileController()