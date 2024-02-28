module.exports = function (method) {
    return async (req, res) => {
        try {
            return await method(req, res)
        } catch (e) {
            res.send(e.message)
        }
    }
}