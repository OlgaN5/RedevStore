const categoryService = require('../services/category.service')

class CategoryController {
    async getCategory(req, res) {
        const category = await categoryService.findCategory({
            id: req.params.id
        })
        res.send(category)
    }
    async createCategory(req, res) {
        console.log(req.body)
        const result = await categoryService.createCategory(req.body)
        res.send(result)
    }
    async editCategory(req, res) {
        console.log(req.body)
        const result = await categoryService.editCategory(req.body, req.params.id)
        res.send(result)
    }
    async deleteCategory(req, res) {
        console.log(req.body)
        const result = await categoryService.deleteCategory(req.params.id)
        res.send({
            countDeleted: result
        })
    }
}

module.exports = new CategoryController()