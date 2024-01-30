const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const upload = require('../config/multer.config')
const isAuthenticated = require('../utils/authenticate')

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
router.post('/add', isAuthenticated(['admin', 'moderator']), upload.single('image'), productController.addProduct)
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
router.patch('/edit/:id', isAuthenticated(['admin', 'moderator']), upload.single('image'), productController.editProduct)
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
router.delete('/delete/:id', isAuthenticated(['admin', 'moderator']), productController.deleteProduct)
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
router.delete('/delete/image/:id', isAuthenticated(['admin', 'moderator']), productController.deleteImage)

module.exports = router