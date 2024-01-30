const statusService = require('../services/status.service')
class StatusController {
    async createStatus(req, res) {
        try {
            const result = await statusService.createStatus(req.body)
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }

    }
    async editStatus(req, res) {
        try {
            const result = await statusService.editStatus(req.body, {
                id: req.params.id
            })
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }

    }
    async deleteStatus(req, res) {
        try {
            const result = await statusService.deleteStatus({
                id: req.params.id
            })
            res.send({
                countDeleted: result
            })
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = new StatusController()