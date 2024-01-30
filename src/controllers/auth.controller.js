const bcrypt = require('bcrypt')
const userService = require('../services/user.service')
class AuthComtroller {
    async signup(req, res, next) {
        const {
            email,
            login,
            password,
            confirmPassword
        } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'confirmPassword not equal to password'
            })
        }
        const user = await userService.findUser({
            email
        })
        if (user) {
            return res.status(400).json({
                error: 'user exists'
            })
        }
        const hashedPass = await bcrypt.hash(password, 3)
        const newUser = await userService.createUser({
            email,
            password: hashedPass,
            login,
        })
        req.login({
            username: newUser.login,
            password
        }, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })

    }

}
module.exports = new AuthComtroller()