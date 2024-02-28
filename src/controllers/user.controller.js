const userService = require('../services/user.service')
class UserController {
    async editUser(req, res) {
        console.log(req.params.id, req.session.passport.user)
        const userId = req.params.id || req.session.passport.user.id
        const result = await userService.editUser(userId, req.body)
        return res.send(result)
    }
}

module.exports = new UserController()