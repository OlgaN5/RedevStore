const userService = require('../services/user.service')
class UserController {
    async editUser(req, res) {
        try {
            console.log(req.params.id, req.session.passport.user)
            const userId = req.params.id || req.session.passport.user.id
            const result = await userService.editUser(userId, req.body)
            return res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = new UserController()