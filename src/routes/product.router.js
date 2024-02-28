const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const upload = require('../config/multer.config')
const isAuthenticated = require('../utils/authenticate')
const {
    idValidation,
    productGetFilterValidation,
    productCreateValidation,
    productEditValidation
} = require('../utils/validations')
const validationHandler = require('../utils/validationHandler')
const tryCatchHandler = require('../controllers/tryCatch.handler')


/**
 * @swagger 
 * /api/product/{id}:
 *   get:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.get('/:id', isAuthenticated(['user', 'admin', 'moderator']), idValidation, validationHandler, tryCatchHandler(productController.getProduct))
/**
 * @swagger 
 * /api/product/:
 *   get:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         default: 1
 *       - name: price
 *         in: query
 *         required: false
 *         default: from~10;to~20
 *       - name: availability
 *         in: query
 *         required: false
 *         default: 1
 *       - name: sort
 *         in: query
 *         required: false
 *         default: createdAt~DESC
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.get('/', isAuthenticated(['admin', 'moderator']), productGetFilterValidation, validationHandler, tryCatchHandler(productController.getProducts)) // query category/price/availability/sort    категории, цене и наличию на складе.сортировки 
/**
 * @swagger 
 * /api/product/add:
 *   post:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             required: 
 *               - name
 *               - describe
 *               - categoryId
 *               - price
 *               - count
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: name
 *               describe:
 *                 type: string
 *                 default: lastName
 *               categoryId:
 *                 type: string
 *                 default: 1
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *                 default: 5
 *               count:
 *                 type: number
 *                 default: 4
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.post('/add', isAuthenticated(['admin', 'moderator']), productCreateValidation, validationHandler, upload.single('image'), tryCatchHandler(productController.addProduct))
/**
 * @swagger 
 * /api/product/edit/{id}:
 *   patch:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: token
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: name
 *               describe:
 *                 type: string
 *                 default: lastName
 *               categoryId:
 *                 type: string
 *                 default: address
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *                 default: 5,00
 *               count:
 *                 type: number
 *                 default: 4
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.patch('/edit/:id', isAuthenticated(['admin', 'moderator']), productEditValidation, validationHandler, upload.single('image'), tryCatchHandler(productController.editProduct))
/**
 * @swagger 
 * /api/product/delete/{id}:
 *   delete:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.delete('/delete/:id', isAuthenticated(['admin', 'moderator']), idValidation, validationHandler, tryCatchHandler(productController.deleteProduct))
/**
 * @swagger 
 * /api/product/delete/image/{id}:
 *   delete:
 *     tags: 
 *       - Product
 *     summary: use to edit user
 *     description: takes data to uptate, changes user in db
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses: 
 *       '200':
 *         descrition: query has saved succesfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: integer
 *                   default: token added
 */
router.delete('/delete/image/:id', isAuthenticated(['admin', 'moderator']), idValidation, validationHandler, tryCatchHandler(productController.deleteImage))

module.exports = router