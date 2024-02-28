const statusService = require('../services/status.service')
class StatusController {
    async createStatus(req, res) {
        const result = await statusService.createStatus(req.body)
        res.send(result)
    }
    async editStatus(req, res) {
        const result = await statusService.editStatus(req.body, {
            id: req.params.id
        })
        res.send(result)
    }
    async deleteStatus(req, res) {
        const result = await statusService.deleteStatus({
            id: req.params.id
        })
        res.send({
            countDeleted: result
        })
    }
}

module.exports = new StatusController()