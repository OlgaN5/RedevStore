const {
    validationResult
} = require('express-validator')
module.exports = function (req, res, next) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({
            error: result.array()
        })
    }
    next()
}