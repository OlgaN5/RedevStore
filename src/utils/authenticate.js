module.exports = function (roles) {
    return async function (req, res, next) {
        try {
            console.log(req.session.passport)
            if(!req.session.passport) {
                return res.status(401).json({
                    message: 'no authorization'
                })
            }
            const user = req.session.passport.user
            console.log(user)
            console.log(req.session.passport.user)
            if (req.isAuthenticated()) {
                if (user && roles.includes(user.role)) next()
                else return res.sendStatus(403)
            } else {
                return res.status(401).json({
                    message: 'no authenticate'
                })
            }
        } catch (e) {
            console.log(e.message)
            next(e)
        }

    }
}