const Sequelize = require('sequelize')

const dbAccess = require('../database.lib/dbAccess')
const {
    Product,
    Image,
    Category,
    CategoryProduct
} = require('../models/assotiations')
class ProductService {
    async createProduct(data, categoryId) {
        const category = await dbAccess.readOne(Category, {
            id: categoryId
        })
        const product = await dbAccess.create(Product, data)
        await category.addProduct(product)
        return product
    }
    async editProduct(dataToUpdate, conditions) {
        return await dbAccess.update(Product, dataToUpdate, conditions)
    }
    async findProduct(conditions) {
        const include = [{
                model: Category,
                through: {
                    attributes: []
                },
                attributes: ['name']
            },
            {
                model: Image,
                attributes: ['host','path']
            }
        ]
        const product = await dbAccess.readOne(Product, conditions, include)
        // product.path = process.env.HOST + product.link
        return product
    }
    async findProducts(conditions, conditionsCategory, order) {
        // console.log(priceCondition)
        const products = await Product.findAll({
            where: conditions,
            include: [{
                    model: Category,
                    where: conditionsCategory
                },
                {
                    model: Image
                },

            ],
            order: order
            // order: [
            //     ['price', 'ASC'] // Сортировка по возрастанию по полю "price"
            //     // ['price', 'DESC'] // Сортировка по убыванию по полю "price"
            //   ]
        })
        // const include = [{
        //         model: Category
        //     },
        //     {
        //         model: Image
        //     }
        // ]
        // const products = await dbAccess.readAll(Product, conditions, include)
        return products
    }
    async deleteProduct(conditions) {
        return await dbAccess.delete(Product, conditions)
    }
}

module.exports = new ProductService()