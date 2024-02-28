const imageService = require('../services/image.service')
const productService = require('../services/product.service')
const Sequelize = require('sequelize')
const imageHelper = require('../image.lib/image.helper')


class ProductController {
    async getProduct(req, res) {
        const product = await productService.findProduct({
            id: req.params.id
        })
        res.send(product)
    }
    async getProducts(req, res) {
        const {
            category,
            price, //from~10;to~20
            availability,
            sort //price~DESC price~ASC createdAt~DESC createdAt~ASC
        } = req.query
        const conditions = {}
        const conditionsCategory = {}
        const order = []
        if (sort) {
            const sortParam = sort.split('~')
            order.push([sortParam[0], sortParam[1]])
        }
        let priceCondition
        if (price) {
            priceCondition = price.split(';').reduce((acc, item, index, ) => {
                const itemArr = item.split('~')
                acc[itemArr[0]] = +itemArr[1]
                return acc
            }, {})
            console.log(priceCondition)
            // const price = {
            //     from: 1,
            //     to: 2
            // }
            conditions.price = {
                [Sequelize.Op.gte]: priceCondition.from,
                [Sequelize.Op.lt]: priceCondition.to
            }
        }
        console.log(order)
        console.log(conditions)
        if (category) conditionsCategory.id = category
        switch (availability) {
            case '1':
                conditions.count = {
                    [Sequelize.Op.ne]: 0
                }
                break
            case '2':
                conditions.count = {
                    [Sequelize.Op.eq]: 0
                }
                break
        }
        if (availability === 1) conditions.count = {
            [Sequelize.Op.ne]: 0
        }
        const result = await productService.findProducts(conditions, conditionsCategory)
        res.send(result)
    }
    async addProduct(req, res) {
        console.log(req.body)
        console.log(req.file)
        const {
            name,
            describe,
            price,
            count,
            categoryId
        } = req.body
        const filename = req.file?.filename
        const productData = {
            name,
            describe,
            price,
            count
        }
        const product = await productService.createProduct(productData, categoryId)
        const productId = product.id
        if (filename) {
            const image = await imageHelper.createImage(filename, productId)
            // productData.imageId = image.id
        }

        res.send(product)
    }
    async editProduct(req, res) {
        console.log(req.body)
        console.log(req.file)
        const filename = req.file?.filename
        if (filename) {
            const image = await imageHelper.createImage(filename, req.params.id)
            // req.body.imageId = image.id
        }
        const result = await productService.editProduct(req.body, {
            id: req.params.id
        })
        res.send(result)
    }
    async deleteProduct(req, res) {
        const productId = req.params.id
        console.log(productId)
        await imageService.deleteImage({ //deleteImages?????????????????????/
            productId
        })
        console.log(productId)
        const result = await productService.deleteProduct({
            id: productId
        })
        res.send({
            result: result
        })
    }
    async deleteImage(req, res) {
        const result = await imageService.deleteImage({
            id: req.params.id
        })
        res.send(result)
    }
}

module.exports = new ProductController()