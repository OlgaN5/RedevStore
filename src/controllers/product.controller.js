const imageService = require('../services/image.service')
const productService = require('../services/product.service')
// const fs = require('fs')
// const imageControllers = require('./image.controllers')
const imageHelper = require('../image.lib/image.helper')
class ProductController {
    async addProduct(req, res) {
        try {
            console.log(req.body)
            console.log(req.file)
            const filename = req.file?.filename
            if (filename) {
                const image = await imageHelper.createImage(filename)
                req.body.imageId = image.id
            }
            const result = await productService.createProduct(req.body)
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
    async editProduct(req, res) {
        try {
            console.log(req.body)
            console.log(req.file)
            const filename = req.file?.filename
            if (filename) {
                const image = await imageHelper.createImage(filename)
                req.body.imageId = image.id
            }
            const result = await productService.editProduct(req.body, {
                id: req.params.id
            })
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
    async deleteProduct(req, res) {
        try {
            const product = await productService.findProduct({
                id: req.params.id
            })
            await imageService.deleteImage({
                id: product.imageId
            })
            const result = await productService.deleteProduct({
                id: req.params.id
            })
            res.send({
                result: result
            })
        } catch (e) {
            res.send(e.message)
        }
    }
    async deleteImage(req, res, next) {
        try {
            const result = await imageService.deleteImage({
                id: req.params.id
            })
            res.send(result)
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = new ProductController()