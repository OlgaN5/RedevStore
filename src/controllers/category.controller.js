const categoryService = require('../services/category.service')

class CategoryController {
    async createCategory(req, res) {
        try {
            console.log(req.body)
            const result = await categoryService.createCategory(req.body)
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
    async editCategory(req, res) {
        try {
            console.log(req.body)
            const result = await categoryService.editCategory(req.body, req.params.id)
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
    async deleteCategory(req, res) {
        try {
            console.log(req.body)
            const result = await categoryService.deleteCategory(req.params.id)
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = new CategoryController()